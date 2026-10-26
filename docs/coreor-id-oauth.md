# Coreor.net OAuth configuration

Coreor.net uses Coreor ID as the browser authorization surface and api.coreor.net as the OAuth token service.

## Production endpoints

- Authorization UI: `https://id.coreor.net/oauth/authorize`
- Token endpoint: `https://api.coreor.net/oauth2/token`
- Authorization check: `https://api.coreor.net/oauth2/check-authorization`
- Callback: `https://coreor.net/oauth/callback`

## Required Vercel environment variables

```env
COREOR_ID_BASE=https://id.coreor.net
COREOR_API_BASE=https://api.coreor.net
COREOR_OAUTH_CLIENT_ID=coreor
COREOR_OAUTH_CLIENT_SECRET=<server-side-secret>
COREOR_OAUTH_REDIRECT_URI=https://coreor.net/oauth/callback
COREOR_OAUTH_SCOPE=profile email
```

`COREOR_OAUTH_CLIENT_SECRET` is server-only. Do not expose it through a `NEXT_PUBLIC_` variable.

`account.coreor.net` is legacy and must not be used by new authentication flows.
