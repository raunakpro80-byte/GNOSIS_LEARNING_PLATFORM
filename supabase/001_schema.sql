begin;
create table if not exists public.profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '', role text not null default 'student' check (role in ('student','admin'))
);
alter table public.profiles enable row level security;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
 select exists(select 1 from public.profiles where user_id = auth.uid() and role = 'admin');
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
create policy profile_read on public.profiles for select to authenticated using (user_id = auth.uid() or public.is_admin());
-- Role assignment is a trusted SQL operation only. No self-service INSERT/UPDATE grants.
create table if not exists public.subjects (name text primary key);
create table if not exists public.chapters (subject text references public.subjects(name), name text, primary key(subject,name));
create table if not exists public.lessons (
 id text primary key, subject text not null, chapter text not null,
 status text not null default 'Draft' check(status in ('Draft','Processing','Review','Published')),
 payload jsonb not null, updated_at timestamptz not null default now(),
 foreign key(subject,chapter) references public.chapters(subject,name),
 check (payload->>'id' = id), check(payload->>'status' = status)
);
-- The lesson payload is the canonical reviewed content aggregate. It contains
-- transcript segments, document/page excerpts, cards, and verified answer keys.
-- Students never read this table directly; the server strips answer keys.
create table if not exists public.learning_state (
 user_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null, updated_at timestamptz not null default now()
);
-- The student-owned aggregate contains preferences, notes, bookmarks, progress,
-- quiz attempts. Quiz scores are learning aids, not exam/certification records.
-- Chat history is in-memory for the current panel, not persisted.
alter table public.subjects enable row level security;
alter table public.chapters enable row level security;
alter table public.lessons enable row level security;
alter table public.learning_state enable row level security;
create policy subject_admin on public.subjects for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy chapter_admin on public.chapters for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy lesson_admin on public.lessons for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy own_learning on public.learning_state for all to authenticated using(user_id = auth.uid()) with check(user_id = auth.uid());
revoke all on public.profiles,public.subjects,public.chapters,public.lessons,public.learning_state from anon,authenticated;
grant select on public.profiles to authenticated;
grant select,insert,update,delete on public.subjects,public.chapters,public.lessons,public.learning_state to authenticated;
grant all on public.profiles,public.subjects,public.chapters,public.lessons,public.learning_state to service_role;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('lesson-documents','lesson-documents',false,10000000,array['application/pdf']) on conflict(id) do nothing;
create policy admin_documents on storage.objects for all to authenticated using(bucket_id='lesson-documents' and public.is_admin()) with check(bucket_id='lesson-documents' and public.is_admin());
commit;
