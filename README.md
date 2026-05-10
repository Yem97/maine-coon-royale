# Maine Coon Royale — Complete Setup & Hosting Guide

## What's Built
- Beautiful luxury dark-gold website for Maine Coon kitten breeders
- Admin dashboard (login-protected) to manage everything from phone
- Kittens listing with photos, status, pricing
- Gallery (manually uploaded photos)
- Facebook post updates section
- Customer reviews with approval + reply system
- WhatsApp + Facebook Messenger live chat widget
- Inquiry/contact form with email notifications
- About/profile section she edits from admin panel
- Free hosting on Vercel + Supabase

---

## STEP 1 — Create Your GitHub Repository

1. Go to **github.com** and sign in
2. Click **New repository** (top right "+")
3. Name it: `maine-coon-royale`
4. Set to **Public**
5. Click **Create repository**
6. Upload all files from this zip into the repo

---

## STEP 2 — Set Up Supabase (Free Database)

1. Go to **supabase.com** → Sign up free
2. Click **New Project** → give it a name → set a password → click Create
3. Wait ~2 minutes for setup
4. Click **SQL Editor** in the left sidebar
5. Copy the entire contents of `supabase/schema.sql`
6. Paste it into the SQL editor → click **Run**
7. You should see "Success" — your tables are created

### Create Admin Login:
1. Click **Authentication** in the left sidebar
2. Click **Users** → **Add User** → **Create New User**
3. Enter email + password (this is what your client uses to log in)
4. Click **Create User**

### Create Storage Buckets:
1. Click **Storage** in left sidebar
2. Create 3 buckets — click **New bucket** for each:
   - `kitten-images` → toggle **Public** ON → Create
   - `gallery-images` → toggle **Public** ON → Create
3. For each bucket click **Policies** → **New policy** → **For full customization**
   - Policy name: `allow all`
   - Leave all operations checked (SELECT, INSERT, UPDATE, DELETE)
   - Leave `bucket_id = 'bucket-name'` as is
   - Click **Save policy**

### Get Your Keys:
1. Click **Settings** (gear icon) → **API Keys**
2. Click **Legacy anon, service_role API keys** tab
3. Copy:
   - **anon public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click **Reveal** on service_role → copy → this is `SUPABASE_SERVICE_ROLE_KEY`
4. Click **General** in settings → copy **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`

---

## STEP 3 — Set Up Resend (Free Emails)

1. Go to **resend.com** → Sign up free (3,000 emails/month)
2. Click **API Keys** → **Create API Key**
3. Name it `maine-coon-royale` → Create
4. Copy the key immediately (only shown once) → this is `RESEND_API_KEY`

---

## STEP 4 — Deploy on Vercel (Free Hosting)

1. Go to **vercel.com** → Sign up with GitHub
2. Click **Add New → Project**
3. Find your `maine-coon-royale` repo → click **Import**
4. Click **Environment Variables** and add ALL of these:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | https://yourproject.supabase.co |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJ... (anon key) |
| `SUPABASE_SERVICE_ROLE_KEY` | eyJ... (service role key) |
| `RESEND_API_KEY` | re_... |
| `ADMIN_EMAIL` | your-client@gmail.com |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | 15551234567 (numbers only) |
| `NEXT_PUBLIC_FACEBOOK_URL` | https://facebook.com/herpage |
| `NEXT_PUBLIC_SITE_URL` | https://maine-coon-royale.vercel.app |

5. Click **Deploy** → wait 2-3 minutes
6. Your site is live!

---

## STEP 5 — First Login

1. Go to `your-site.vercel.app/login`
2. Enter the email + password you created in Supabase
3. You are now in the admin dashboard

---

## Daily Admin Tasks (Simple as Facebook)

| Task | How |
|---|---|
| Add a new kitten | Admin → Kittens → Add Kitten |
| Mark kitten as sold | Admin → Kittens → Edit → change status to Adopted |
| See client messages | Admin → Inquiries |
| Reply to a client | Click email or WhatsApp icon next to inquiry |
| Approve a review | Admin → Reviews → click Approve |
| Reply to a review | Admin → Reviews → click Reply |
| Add gallery photo | Admin → Gallery → Add Photo |
| Post a Facebook update | Admin → Facebook Posts → Add Post |
| Update bio/photo | Admin → My Profile → edit anything → Save |

---

## Getting a Custom Domain (Optional)

1. Buy a domain at **namecheap.com** (~$12/year) e.g. `maincoonroyale.com`
2. In Vercel → your project → **Settings → Domains**
3. Click **Add Domain** → type your domain → follow instructions
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables to your domain
5. Redeploy

---

## Support

Built with: Next.js 14 · Supabase · Tailwind CSS · Vercel · Resend
