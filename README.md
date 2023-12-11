# Video Walkthrough
Here's the YouTube link:
https://www.youtube.com/watch?v=PUYu29D-Vwo 

Here's the backup:
https://clipchamp.com/watch/JcZMk0U2D3k 

# Pre-Reqs
You need to have the following tools/packages installed to be able to run this server:
- JS
- Node-JS
- PGAdmin and PostgreSQL

# Preparing the DB
- Launch PGAdmin
- Enter the username and password. **COPY / REMEMBER THESE! YOU WILL NEED THEM!**
- Create a new DB. **REMEMBER THE DB NAME!**
- Run `create.sql` and `insert.sql` in the SQL folder in this repo

# Preparing the server env
- Run `npm install`
- **IMPORTANT**: Edit src/DB.ts
    - update `DB.user` with your pgAdmin username
    - update `DB.password` with your pgAdmin password
    - update `DB.database` with your pgAdmin database name
    - ensure that `DB.port` matches the port of your running SQL server
      
# Running the server
- Run `npm run dev`
- Now, the server should be listening on port 3000
- Navigate to http://localhost:3000/
