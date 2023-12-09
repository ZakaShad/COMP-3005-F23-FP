# ER Diagram
![FP ERD](https://github.com/ZakaShad/COMP-3005-F23-FP/assets/72482337/54cfb111-52d1-4cd7-822f-4d441847bdee)

# Schema
![FP v2](https://github.com/ZakaShad/COMP-3005-F23-FP/assets/72482337/4fa4b041-0f11-4a10-853b-17a4649b7441)


[Here's the link to the dbdiagram.io schema](https://dbdiagram.io/d/FP-v2-656d2a9356d8064ca04cef20)

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
