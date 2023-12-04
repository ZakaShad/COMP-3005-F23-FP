# ER Diagrams 
Current version: https://erdplus.com/edit-diagram/82ca8274-8cab-4829-8dd3-a8ab87ccf3a0

Original version (20+ tables): https://erdplus.com/edit-diagram/0ccc27b8-3521-406c-8933-bfe7e38f2891 

# Schema
[https://dbdiagram.io/d/COMP-3005-F23-FP-6564e8f73be1495787d56ebe (can't edit without manually requesting. email is required)](https://dbdiagram.io/d/3005-FP-656c0a3956d8064ca0445d3c)

# Documentation
https://www.overleaf.com/8282345138vzfrpmjxfcpn#479089 

# Video Walkthrough
Insert video here

# Summary
Explain API here

# Pre-Reqs
You need to have the following tools/packages installed to be able to run this server:
- JS
- Node-JS
- PGAdmin and PostgreSQL

# Preparing the DB
- Launch PGAdmin
- Enter the username and password. **COPY / REMEMBER THESE! YOU WILL NEED THEM!**
- Create a new DB. **REMEMBER THE DB NAME!**
- Run `init.sql` in the SQL folder in this repo

# Preparing the server env
- Run `npm install`
- **IMPORTANT**: Create the following environment variables
    - `DB_PASS`, which should store the password of your DB
    - `DB_USER`, which should store the user of your DB
    - `DB_NAME`, which should store the name of your DB

# Running the server
- Run `npm run dev`
- Now, the server should be listening on port 1337. Use tools like Postman or Thunder Client to easily make the requests.

# Function Explanations
Explain functions here 
