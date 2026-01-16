# Testing Instructions

## Prerequisities
- Ensure Docker/MySQL is running (implied by running API).
- Ensure Environment Variables are set (`GEMINI_API_KEY`, `CHROMEDRIVER_ABSOLUTE_PATH`, `DATABASE_PASSWORD`).

## 1. Backend (Java Scanner)
The scanner reads from `domains.txt`, visits websites, captures Cookies/LocalStorage, and uses Gemini to analyze via API.

**Step 1: Configure Domains**
Edit `domains.txt` in the root directory. Add the URLs you want to scan (one per line).
```text
https://www.stackoverflow.com
https://www.elmundo.es
```

**Step 2: Run the Scanner**
```bash
# In the root project directory
./gradlew :app:run
```
*Wait for the process to complete. You should see logs about "Cookies captured", "Local Storage items captured", and "DB insert rows affected".*

## 2. API (Node.js)
The API serves the scan results from the database to the frontend.

**Step 1: Start the Server**
(If not already running)
```bash
cd node
export DATABASE_PASSWORD=password
npm start
```
*Server should be running at `http://localhost:3000`.*

**Step 2: Verify Health**
Visit: [http://localhost:3000/api/health](http://localhost:3000/api/health) -> Should return `{"status":"ok"}`.

## 3. Frontend (React)
The Dashboard visualizes the results.

**Step 1: Start the Frontend**
(If not already running)
```bash
cd frontend
npm run dev
```
*Frontend will be available at `http://localhost:5173`.*

**Step 2: View Results**
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Enter the **same URL** you scanned (e.g., `https://www.stackoverflow.com`).
3. Click "Start Audit".
4. **Verify**:
   - **Compliance Score**: Should appear with a color-coded gauge.
   - **Cookie Analysis**: Table listing cookies.
   - **Local Storage Analysis**: **[NEW]** Table listing local storage keys/values.
   - **GDPR Checklist**: Detailed breakdown of policy compliance.

## Troubleshooting
- **No Results Found**: Ensure the URL matches exactly (protocol/www) or that the Java scanner successfully inserted the record (check scanner logs for `DB insert rows affected: 1`).
- **Database Error**: Check `node/.env` or `DATABASE_PASSWORD` matches your MySQL setup.
