# CORS Debugging Guide

## Step 1: Test Backend Health
First, let's verify the backend is working:
```bash
curl https://att-manageo-backend.vercel.app/api/health
```

## Step 2: Test CORS Preflight
Test the OPTIONS request manually:
```bash
curl -X OPTIONS https://att-manageo-backend.vercel.app/api/auth/login \
  -H "Origin: https://att-manageo.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

## Step 3: Test Actual Login
Test the login endpoint directly:
```bash
curl -X POST https://att-manageo-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Origin: https://att-manageo.vercel.app" \
  -d '{"email":"admin@att-forms.com","password":"admin123"}' \
  -v
```

## Step 4: Check Vercel Logs
```bash
vercel logs att-manageo-backend
```

## Alternative Solutions

### Option 1: Use Vercel's Built-in CORS
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://att-manageo.vercel.app" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }
      ]
    }
  ]
}
```

### Option 2: Proxy Through Frontend
Configure Angular to proxy API calls during build.

### Option 3: Use Different Domains
Deploy both on same domain with different paths.

## Current Status
- Backend: https://att-manageo-backend.vercel.app
- Frontend: https://att-manageo.vercel.app
- Issue: CORS preflight failing

## Next Steps
1. Test each step above
2. Check Vercel function logs
3. Try alternative solutions if needed