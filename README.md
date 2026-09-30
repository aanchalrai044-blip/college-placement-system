# College Placement System — MVP

Ye ek MERN stack app hai jisme teen cheezein handle hoti hain:
1. **Internships** — FY/SY/TY students ki internship details
2. **Placements** — TY students ke placement records
3. **Openings** — college mein aayi companies ke job openings

## Pehle ye install kar (one-time setup)

1. **Node.js** install kar (agar pehle se nahi hai): https://nodejs.org (LTS version le)
2. **MongoDB Community Server** install kar aur chala de: https://www.mongodb.com/try/download/community
   - (Ya phir MongoDB Atlas ka free cloud database bhi use kar sakti hai — https://www.mongodb.com/cloud/atlas — usme connection string milegi jo `.env` mein daalni hogi)

## Step 1 — Backend chalu kar

1. Terminal khol, `backend` folder ke andar jaa:
   ```
   cd college-placement-mvp/backend
   ```
2. Dependencies install kar:
   ```
   npm install
   ```
3. `.env.example` file ka naam badal ke `.env` kar de, aur MongoDB ka URI check kar le (agar local MongoDB hai toh default value hi chalegi).
4. Server chalu kar:
   ```
   npm start
   ```
   Terminal mein "MongoDB connected" aur "Server running on port 5000" dikhna chahiye.

## Step 2 — Frontend chalu kar

1. Ek **naya** terminal khol (backend wala chalta rehne de), `frontend` folder mein jaa:
   ```
   cd college-placement-mvp/frontend
   ```
2. Dependencies install kar:
   ```
   npm install
   ```
3. App chalu kar:
   ```
   npm run dev
   ```
4. Terminal mein jo link milega (usually `http://localhost:3000`), use browser mein khol de.

## Bas, app ready hai!

- Home page pe **Openings** dikhenge (companies jo college aayi)
- Top nav se **Internships** aur **Placements** pages pe jaa sakti hai
- Har page pe form hai naya entry add karne ke liye, aur list mein Delete button bhi hai

## Agar kuch error aaye

- "MongoDB connection error" → MongoDB chalu nahi hai, ya `.env` mein URI galat hai
- Frontend mein data nahi dikh raha → check kar backend terminal chalu hai aur port 5000 pe hi hai
