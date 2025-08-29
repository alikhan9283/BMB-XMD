const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUUyaTFORWh1b0o4M0lKQ2FaZGg3SnhzYjJFZWZ0MUwvMjdsZzk4a3Exbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3lUOGFET01ZcU8yZ2syRUFwVE1JNjBRZFpYQ3ljUVBweWVLTnhZRHQzZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySU9VNjlCM21qK09tbVNYdUdMOSs3MDdkNlErRnlKTW5YSmR4Um04S1ZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5cm9hcDFJUGs2YUc5TU5ZSFdzaGo3S09QV2RiRFQ0NUNmUWQrM1o4a1RrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZFR3BoeGE1OFh3YUdRL3RlOTBYZ01wK29MNHhkWDVmTllLUWF0d0x6SDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpUejJ1dXdyZk1VZmV1bVp5S0xkV0ZuS1ByRzB3eGQwM1JmTkdBUW9hRFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0JPQTJQUTBNOUd3ZUx3WHFkM2M4TWtiZEZPNXd3Z1htTURERTB0VVJubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMitkbkszbUxwRU5qN2dGTUNqaEdTZG5jdTRSbUJjTVAzZGp6d2hlNXgwWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRIaVpzb2pwOGEvUTdiT0h4U3lXeEtweWY5akdMNmN0aC9wMnNXTEt1WDgvZ1dhSXVNcXV5VzdRa0NBWnN1MVhaTVpqMHQ4ZmpjbVl4dkNnRXlEYmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYsImFkdlNlY3JldEtleSI6IjczMkFpc3EzS0FEZnR0UVJIaVVXcFErVVpkeUltK1RxZWhnUkdVdkV0TVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMzAwNzk1MDg5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE1Q0E2QUVEQjQwOUVDRjczRjM0QkE3QkMzRDFBMTkxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTY0NTM3Mzl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzMwMDc5NTA4OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEQkVDQkExQkIyRDdCMjBCOEQxNTlCNjBBRTM0RDZEOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU2NDUzNzM5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMzMDA3OTUwODlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzJGOEFCMTk0RDQwQjgxRjBDQTI4QUY5OUJFODFFMEYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NjQ1Mzc0MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUzdaNVpLQU4iLCJtZSI6eyJpZCI6IjkyMzMwMDc5NTA4OToxM0BzLndoYXRzYXBwLm5ldCIsImxpZCI6Ijc1MjI2ODIyMDA0OTYzOjEzQGxpZCIsIm5hbWUiOiJBbGkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tlRXIvSUhFTnUyeGNVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImJyOHA2WDZSb2FTS3Vvbzk1VUJibHJZV2FDL0FwTUoyektMMlRET1RDalE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlYzN1ZqVW5wb2FwR1hVNHhsY3ZBaUIwQjR3YUlxd1h5ZGcrdEsxMDFTaDRDeFVGOHVzV051cGt3UUx5MUJhY1JOZmhoQVo1RG5JS2Y0QUwzOERldEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1Z2E2RWN6S2Z2b1RMaUpQcDJ4R3Zad3RhajBOTkx3MFRSeHdNMXViMlIxbXFzdTg4OFYzc05IZDBYRlBGQUhnb1AzSSt4VldJZFhFOEErQlBsZFZqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzMwMDc5NTA4OToxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXNi9LZWwra2FHa2lycUtQZVZBVzVhMkZtZ3Z3S1RDZHN5aTlrd3prd28wIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTY0NTM3MzYsImxhc3RQcm9wSGFzaCI6IjNSOVozOSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ01WIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ali",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923300795089",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
