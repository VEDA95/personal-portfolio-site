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

const validationModel = z.object({
    firstName: z.string().nonempty().trim(),
    lastName: z.string().nonempty().trim(),
    email: z.string().email().trim(),
    company: z.string().trim().optional(),
    message: z.string().nonempty().trim(),
    budget: z.enum(['$500 - $1,000', '$1,000 - $2,000', '$2,000 - $5,000', '$5,000 - $10,000', '$10,000+']),
    services: z.enum(['web-development', 'web-design', 'sys-administration', 'network-administration', 'something-else']).array().min(1)
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
    const templatePath: string = resolve('../../email/mjml/dist');

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
                text: await renderFile(resolve(templatePath, './receiver.ejs'), {
                    ipAddress: clientAddress,
                    userAgent: request.headers.has('user-agent') ? request.headers.get('user-agent') as string : 'n/a',
                    date: now.toDateString(),
                    firstName: sanitizedFirstName,
                    lastName: sanitizedLastName,
                    email: sanitizedEmail,
                    company: sanitizedCompany != null ? sanitizedCompany : 'n/a',
                    budget: validatedData.data.budget,
                    services: validatedData.data.services
                })
            }),
            await mailClient.sendMail({
                from: import.meta.env.GMAIL_USER_NAME,
                to: sanitizedEmail,
                subject: 'Your email to stefanscorner.com has been received!',
                text: await renderFile(resolve(templatePath, './sender.ejs'))
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