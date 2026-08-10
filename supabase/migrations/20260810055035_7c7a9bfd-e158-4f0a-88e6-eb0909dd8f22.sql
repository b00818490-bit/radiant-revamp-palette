-- Newsletter subscriber emails must never be readable through the Data API.
-- Sign-up (insert) stays open; every other privilege is explicitly revoked so
-- the deny is enforced by grants as well as by the absence of a SELECT policy.
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES ON public.newsletter_subscribers FROM anon;
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES ON public.newsletter_subscribers FROM authenticated;

GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT INSERT ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;