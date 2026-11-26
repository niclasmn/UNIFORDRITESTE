# Deployment guide

## Google AI Studio / Google Cloud Run

This is a server-rendered TanStack Start application, not a plain static Vite site.
The production build must use Nitro's Node.js server preset. The repository's
`package.json` now provides:

- `npm run build` — creates the production server and browser assets in `.output/`.
- `npm start` — runs `.output/server/index.mjs`.

Nitro's Node.js server reads the `PORT` environment variable supplied by Cloud Run.
Do not point Cloud Run at `.output/public` as though the application were a
static-only website; the root page and application routes are rendered by the server.

For local verification:

```bash
npm install
npm run build
npm start
```

Open `http://localhost:3000` (or the port printed by Nitro). To test the
standalone demonstration document, open `/standalone/index.html`.

## One-file demonstration

A self-contained HTML export is already included at
`public/standalone/index.html`. It bundles its own HTML, CSS and JavaScript,
and is intentionally separate from the React/TanStack source application.
It is useful as a portable demonstration or reference file; it is not the
canonical source for future development.

## If a published URL still returns 404

Compare the Cloud Run service's canonical `run.app` URL with the
`*.ai.studio` URL. If `run.app` works but the AI Studio URL does not, check
the AI Studio publication/domain association rather than changing application
routes. If both return 404, inspect Cloud Run request logs and verify that the
request path is `/` and that the latest revision is receiving traffic.

## Demo-data limitations

The current profile switcher is a demonstration, not authentication.
Workflow changes are stored in the visitor's browser via local storage.
Do not enter real student records or treat the local demo as an official
application, institutional database, or authentication system.
