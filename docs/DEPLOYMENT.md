# Share the Code on GitHub and Publish the Website

## Current state

The source is prepared for a GitHub repository and a Next.js hosting provider. A source folder or ZIP is not itself a public deployment. Only a returned repository URL and a verified live deployment URL establish that publishing succeeded.

## GitHub repository

Use `gnosis-learning-platform` as the proposed repository name. The requested audience is public so other people can inspect the project. Upload the **contents** of the prepared `GNOSIS` folder as the repository root; `package.json` and `vercel.json` should be at that root. Do not upload the outer workspace, dependency folders, build folders, local history, or secret environment files.

The repository includes:

- A readable README with product overview, screenshots, setup and honest service limitations.
- [Code explanation](CODE-EXPLAINED.md), folder responsibilities and request flow.
- [Demo script](DEMO.md), original lesson material, database migration and tests.
- GitHub Actions validation for dependency installation, unit tests, production build and local HTTP integration.

The workflow is prepared locally. It has not run on GitHub until the repository is uploaded and a run is visible there.

## Live website on Vercel

The project uses Next.js API handlers for scoring, AI and protected content. GitHub Pages serves static sites, so use a Next.js server host for the full application. See [GitHub Pages capabilities](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

1. Connect the owner's GitHub and Vercel accounts.
2. Import `gnosis-learning-platform` from GitHub into Vercel. Use the existing account's appropriate project scope; do not buy a paid service.
3. Framework: **Next.js**. Root directory: **repository root** if the contents were uploaded as instructed. If the whole folder was uploaded, select **GNOSIS** instead.
4. Node.js: **24.x**. Use the committed `vercel.json`: install `npx --yes pnpm@11.25.0 install --frozen-lockfile`, build `npm run build`. This selects the tested package manager explicitly. Keep Vercel's automatic Next.js output configuration.
5. For a credential-free public demo, leave all Supabase and AI environment variables unset. Do not copy placeholder strings from `.env.example` into production values.
6. If enabling cloud/AI, fill actual values privately in Vercel's environment-variable settings, run the Supabase migration and seed, and configure Supabase's allowed site/redirect URLs for the real domain. Service role and AI keys remain server-only.
7. Deploy, then open the returned production URL in an unsigned/guest context. Confirm visitors can access the intended public demo under the project's deployment-protection settings.
8. Verify `/`, `/dashboard`, `/learn/ohms-law`, PDF loading, server quiz scoring, preferences, themes and guest persistence. Confirm unauthorized `/api/admin` requests still return 401.

Expected outcome: one GitHub URL for source/explanation and one HTTPS site URL for visitors. Do not use a localhost URL as the public link.

## Important operational limits

- The current rate limiter is process-local; add a shared limiter before enabling a paid AI key on a scaled public application.
- Guest progress belongs to each visitor's browser; it is not a shared demonstration account.
- The video is user-supplied. Its actual transcript mapping remains unverified and the app labels concepts topic-based.
- Cloud/AI/admin successful operations still require real service verification. Local tests do not prove third-party deployments.

Official import instructions: [Vercel Git integration](https://vercel.com/docs/git).
