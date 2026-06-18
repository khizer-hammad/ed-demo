ED PLUS DEMO — PUT IT LIVE ON VERCEL WITH A GEMINI KEY

FOLDER LAYOUT (already set up for you)
  index.html          <- the demo page (calls /api/chat)
  api/chat.js         <- the secret middleman (reads GEMINI_API_KEY)

EASIEST WAY (drag & drop, no GitHub needed)
1) Install once:  npm i -g vercel
2) In this folder run:  vercel
   - log in when asked, accept the defaults.
3) Add your key:  vercel env add GEMINI_API_KEY
   - paste your NEW Gemini key, choose "Production" (and Preview/Development if asked).
4) Redeploy with the key live:  vercel --prod
5) Open the URL it prints and test.

OR VIA THE WEBSITE (GitHub)
1) Put this folder in a GitHub repo, import it at vercel.com/new.
2) Project -> Settings -> Environment Variables -> add
   Key: GEMINI_API_KEY   Value: your new key  -> Save.
3) Redeploy (Deployments -> ... -> Redeploy).

NOTES
- Key goes ONLY in Vercel env vars, never in the code or the HTML.
- Get a free Gemini key at aistudio.google.com -> Get API key.
- If replies come back empty, change the MODEL line in api/chat.js and redeploy.
