-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Kittens table
create table kittens (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  gender text check (gender in ('male','female')) not null,
  age_weeks integer not null,
  color text not null,
  pattern text,
  price_usd integer not null,
  status text check (status in ('available','reserved','sold')) default 'available',
  description text,
  image_url text,
  gallery_images text[] default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- Gallery table (manually uploaded photos)
create table gallery (
  id uuid default uuid_generate_v4() primary key,
  title text,
  description text,
  image_url text not null,
  category text default 'general',
  created_at timestamptz default now()
);

-- Reviews table
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  reviewer_name text not null,
  reviewer_country text not null,
  reviewer_email text,
  rating integer check (rating between 1 and 5) not null,
  review_text text not null,
  kitten_name text,
  is_approved boolean default false,
  admin_reply text,
  created_at timestamptz default now()
);

-- Inquiries table
create table inquiries (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  whatsapp text,
  country text not null,
  interest text not null,
  kitten_name text,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Facebook posts table (manual upload for now)
create table facebook_posts (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  image_url text,
  post_url text,
  likes integer default 0,
  posted_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Admin profile table
create table admin_profile (
  id uuid default uuid_generate_v4() primary key,
  full_name text default 'Maine Coon Royale',
  tagline text default 'Premium Home-Bred Maine Coon Kittens',
  bio text default 'We are a family-run cattery based in the USA, raising exceptional Maine Coon kittens with love and dedication.',
  location text default 'USA',
  phone text,
  email text,
  whatsapp text,
  facebook_url text,
  instagram_url text,
  avatar_url text,
  years_breeding integer default 1,
  kittens_placed integer default 0,
  certifications text[] default '{}',
  updated_at timestamptz default now()
);

-- Insert default profile
insert into admin_profile (id) values (uuid_generate_v4());

-- RLS Policies
alter table kittens enable row level security;
alter table gallery enable row level security;
alter table reviews enable row level security;
alter table inquiries enable row level security;
alter table facebook_posts enable row level security;
alter table admin_profile enable row level security;

-- Public can read kittens, gallery, approved reviews, facebook posts, profile
create policy "Public read kittens" on kittens for select using (true);
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read approved reviews" on reviews for select using (is_approved = true);
create policy "Public read facebook posts" on facebook_posts for select using (true);
create policy "Public read profile" on admin_profile for select using (true);

-- Public can insert reviews and inquiries
create policy "Public insert reviews" on reviews for insert with check (true);
create policy "Public insert inquiries" on inquiries for insert with check (true);

-- Authenticated admin can do everything
create policy "Admin all kittens" on kittens for all using (auth.role() = 'authenticated');
create policy "Admin all gallery" on gallery for all using (auth.role() = 'authenticated');
create policy "Admin all reviews" on reviews for all using (auth.role() = 'authenticated');
create policy "Admin all inquiries" on inquiries for all using (auth.role() = 'authenticated');
create policy "Admin all facebook" on facebook_posts for all using (auth.role() = 'authenticated');
create policy "Admin all profile" on admin_profile for all using (auth.role() = 'authenticated');
