-- Apply after 001_schema.sql in the EXISTING Supabase project. No public grants.
begin;
create table public.mock_attempts (
  id uuid primary key,
  version bigint not null default 0 check (version >= 0),
  payload jsonb not null check (payload->>'id' = id::text),
  created_at timestamptz not null default now()
);
create table public.mock_question_reviews (
  question_id text primary key,
  content_hash text not null check (content_hash ~ '^[a-f0-9]{64}$'),
  decision text not null check (decision in ('approved','rejected','draft')),
  version bigint not null check (version > 0),
  reviewer_id uuid not null,
  reviewed_at timestamptz not null default now(),
  notes text not null,
  checklist jsonb not null
);
create table public.mock_review_audit (
  id bigint generated always as identity primary key,
  question_id text not null,
  content_hash text not null,
  decision text not null,
  version bigint not null,
  reviewer_id uuid not null,
  reviewed_at timestamptz not null default now(),
  notes text not null,
  checklist jsonb not null,
  unique(question_id,version)
);
alter table public.mock_attempts enable row level security;
alter table public.mock_question_reviews enable row level security;
alter table public.mock_review_audit enable row level security;
revoke all on public.mock_attempts, public.mock_question_reviews, public.mock_review_audit from public, anon, authenticated;
grant select,insert,update on public.mock_attempts to service_role;
grant select on public.mock_question_reviews, public.mock_review_audit to service_role;
-- Atomic review + append-only audit; called only after server verifies owner identity.
create function public.record_mock_review(p_question_id text, p_content_hash text, p_decision text,
  p_expected_version bigint, p_reviewer_id uuid, p_notes text, p_checklist jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare v_version bigint;
begin
  if p_content_hash !~ '^[a-f0-9]{64}$' or p_decision not in ('approved','rejected','draft')
    or length(trim(p_notes)) < 10 or length(p_notes) > 4000 or p_expected_version < 0 then
    raise exception 'Invalid review';
  end if;
  if p_decision = 'approved' and not (p_checklist @> '{"academicReviewed":true,"answer":true,"solution":true,"units":true,"difficulty":true,"uniqueness":true,"wording":true}'::jsonb) then
    raise exception 'Independent academic review required';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(p_question_id,0));
  select version into v_version from public.mock_question_reviews where question_id=p_question_id;
  if coalesce(v_version,0) <> p_expected_version then raise exception 'Review changed' using errcode='40001'; end if;
  v_version := coalesce(v_version,0)+1;
  insert into public.mock_question_reviews(question_id,content_hash,decision,version,reviewer_id,notes,checklist)
    values(p_question_id,p_content_hash,p_decision,v_version,p_reviewer_id,p_notes,p_checklist)
    on conflict(question_id) do update set content_hash=excluded.content_hash, decision=excluded.decision,
      version=excluded.version,reviewer_id=excluded.reviewer_id,reviewed_at=now(),notes=excluded.notes,checklist=excluded.checklist;
  insert into public.mock_review_audit(question_id,content_hash,decision,version,reviewer_id,notes,checklist)
    values(p_question_id,p_content_hash,p_decision,v_version,p_reviewer_id,p_notes,p_checklist);
end;
$$;
revoke all on function public.record_mock_review(text,text,text,bigint,uuid,text,jsonb) from public, anon, authenticated;
grant execute on function public.record_mock_review(text,text,text,bigint,uuid,text,jsonb) to service_role;
commit;
