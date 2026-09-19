# Shahjahanpur Dental

A small, mobile-first dental clinic website built with React, Vite, Tailwind CSS, Google Sheets, and Google Apps Script.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Put the deployed Apps Script `/exec` URL in `.env.local`. The current frontend also keeps the previously configured deployment URL as a fallback so the existing setup continues to work.

## Google Sheets and Apps Script setup

1. Create a Google Sheet. The script automatically creates an `Appointments` tab with these columns:
   `Created At | Name | Phone | Service | Date | Time | Message`.
2. In the sheet, open **Extensions → Apps Script**.
3. Replace the editor contents with `apps-script/Code.gs`. In project settings, use the `Asia/Dhaka` time zone. The included `appsscript.json` shows the expected manifest.
4. For a script bound to the appointment sheet, no spreadsheet ID is needed. For a standalone script, add a Script Property named `SPREADSHEET_ID` containing the sheet ID.
5. Choose **Deploy → New deployment → Web app**. Run as yourself and allow access to **Anyone** so patients do not need a Google account.
6. Copy the deployment `/exec` URL into `.env.local`:

   ```text
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   ```

7. Restart Vite after changing environment variables. When `Code.gs` changes, create a new Apps Script deployment version.

## API behavior

- `GET ?action=slots&date=YYYY-MM-DD&callback=...` returns the available slots. JSONP is used for reliable browser access to Apps Script web apps.
- `POST` accepts JSON appointment data and returns JSON success or error information.
- The server validates every field, the 7-day date window, service, slot, and Bangladeshi phone format.
- A script lock covers the final availability check and sheet insertion, preventing two simultaneous requests from booking the same date and time.
- Text written to user-controlled cells is protected against spreadsheet-formula injection.

## SMS integration (later)

Call the SMS gateway only inside Apps Script after `SpreadsheetApp.flush()`. Store the gateway URL, API key, sender ID, and dentist number in Apps Script **Script Properties** and read them with `PropertiesService.getScriptProperties()`. Never put those credentials in React or in a `VITE_` environment variable, because Vite exposes those values to the browser.

Before launch, replace the placeholder phone, address, and email in `src/pages/Contact.jsx` with the clinic's real details.

## Checks

```bash
npm run lint
npm run build
```
