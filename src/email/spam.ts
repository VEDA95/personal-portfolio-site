import { AkismetClient } from 'akismet-api';

const client: AkismetClient = new AkismetClient({
    blog: import.meta.env.AKISMET_BLOG_URL,
    key: import.meta.env.AKISMET_API_KEY
});

async function verifyCheck(): Promise<void> {
    try {
        const isValid: boolean = await client.verifyKey()

        if (isValid) {
            console.log('Valid key!');
        }else {
            console.log('Invalid key!');
        }
      } catch (err: any) {
        console.error('Could not reach Akismet:', err.message);
      }
}

verifyCheck();

export default client;