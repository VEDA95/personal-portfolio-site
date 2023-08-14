import { z } from 'zod';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import akisClient from '../../email/spam';
import mailClient from '../../email/client';
import { renderFile } from 'ejs';
import { resolve } from 'path';
import type { APIContext } from 'astro';
import type { SafeParseReturnType } from 'zod';
import type { DOMPurifyI } from 'dompurify';
import type { DOMWindow } from 'jsdom';
import type { Comment } from 'akismet-api';

function customBudgetErrorMap(issue: z.ZodIssueOptionalMessage, ctx: z.ErrorMapCtx): {message: string} {
    if(issue.code === z.ZodIssueCode.invalid_enum_value) return {
        message: 'You must provide one of the budgets provided when sending a message...'
    };

    return { message: ctx.defaultError };
}

const validationModel = z.object({
    firstName: z.string({required_error: 'You must provide your first name...'}).nonempty('You must provide your first name...').trim(),
    lastName: z.string({required_error: 'You must provide your last name...'}).nonempty('You must provide your last name...').trim(),
    email: z.string().email('A valid email address is required...').trim(),
    company: z.string().nonempty('You must provide a company name that is not empty...').trim().nullish(),
    message: z.string({required_error: 'Please write a message to send!'}).nonempty('You must write a message that is not empty...').trim(),
    budget: z.enum(['$500 - $1,000', '$1,000 - $2,000', '$2,000 - $5,000', '$5,000 - $10,000', '$10,000+'], {errorMap: customBudgetErrorMap}),
    services: z.enum(['web-development', 'web-design', 'sys-administration', 'network-administration', 'something-else'], {required_error: 'Please select a valid service when sending message...'}).array().min(1, 'Please select at least one service when sending message...')
}).strict();

type validationType = z.infer<typeof validationModel>;

export async function post({ request, clientAddress }: APIContext): Promise<Response> {
    const data: any = await request.json();
    const validatedData: SafeParseReturnType<validationType, validationType> = validationModel.safeParse(data);

    if(!validatedData.success) return new Response(
        JSON.stringify({
            code: 400,
            type: 'validation',
            errors: validatedData.error.issues
        }),
        {status: 400}
    );

    const window: DOMWindow = new JSDOM(' ').window;
    const DOMPurify: DOMPurifyI = createDOMPurify(window);
    const sanitizedFirstName: string = DOMPurify.sanitize(validatedData.data.firstName);
    const sanitizedLastName: string = DOMPurify.sanitize(validatedData.data.lastName);
    const sanitizedEmail: string = DOMPurify.sanitize(validatedData.data.email);
    const sanitizedCompany: string | null = validatedData.data.company != null ? DOMPurify.sanitize(validatedData.data.company) : null;
    const sanitizedMessage: string = DOMPurify.sanitize(validatedData.data.message);
    const now: Date = new Date();
    const templatePath: string = resolve('./public/email_templates');

    try {
        const akisComment: Comment = {
            ip: clientAddress,
            user_agent: request.headers.has('user-agent') ? request.headers.get('user-agent') as string : '',
            name: `${sanitizedFirstName} ${sanitizedLastName}`,
            email: sanitizedEmail,
            content: sanitizedMessage,
            date: now.toString(),
            isTest: !import.meta.env.PROD
        };
        const isSpam: boolean = await akisClient.checkSpam(akisComment);

        if(isSpam) {
            akisClient.submitSpam(akisComment);

            return new Response(
                JSON.stringify({
                    code: 400,
                    type: 'validation',
                    error: 'Your message has been flagged as Spam.'
                }),
                {status: 400}
            );
        }

        const [email1, email2] = await Promise.allSettled([
            await mailClient.sendMail({
                from: sanitizedEmail,
                to: import.meta.env.GMAIL_USER_NAME,
                subject: 'A new email has been received from stefanscorner.com!',
                html: await renderFile(resolve(templatePath, './receiver.ejs'), {
                    ipAddress: clientAddress,
                    userAgent: request.headers.has('user-agent') ? request.headers.get('user-agent') as string : 'n/a',
                    date: now.toDateString(),
                    firstName: sanitizedFirstName,
                    lastName: sanitizedLastName,
                    email: sanitizedEmail,
                    company: sanitizedCompany != null ? sanitizedCompany : 'n/a',
                    message: sanitizedMessage,
                    budget: validatedData.data.budget,
                    services: validatedData.data.services
                })
            }),
            await mailClient.sendMail({
                from: import.meta.env.GMAIL_USER_NAME,
                to: sanitizedEmail,
                subject: 'Your email to stefanscorner.com has been received!',
                html: await renderFile(resolve(templatePath, './sender.ejs'))
            })
        ]);

        if(email1.status === 'rejected' || email2.status === 'rejected') return new Response(
            JSON.stringify({
                code: 500,
                type: 'email_sending_error',
                error: 'There was an error sending out emails from the contact form...'
            }),
            {status: 500}
        );

    } catch(err: any) {
        return new Response(
            JSON.stringify({
                code: 500,
                type: 'server_error',
                error: err.message != null ? err.message : err
            }),
            {status: 500}
        );
    }

    return new Response(
        JSON.stringify({
            code: 200,
            type: 'success',
            message: 'Your email has been sent successfully!'
        }),
        {status: 200}
    );
}