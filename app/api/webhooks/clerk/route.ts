import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
// import { connectDB } from '@/lib/db';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;
  
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await req.json();
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response(`Unauthorized ${err}`, { status: 401 });
  }

  await connectToDatabase();

  switch (evt.type) {
    case 'user.created':
      const { id, email_addresses, first_name, last_name, username } = evt.data;
      
      await User.create({
        clerkUserId: id,
        email: email_addresses[0].email_address,
        username,
        firstName: first_name,
        lastName: last_name
      });
      break;
  }

  return new Response('OK', { status: 200 });
}