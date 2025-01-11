# Realtime Chat Application

## Installation Instructions

###### Ubuntu & linux ######

### Step 1: Install All Required Modules

Run the following command to install all necessary dependencies:

```bash
npm install @prisma/client bcrypt cors dotenv express jsonwebtoken socket.io yup
```
Install development dependencies:
```npm install --save-dev @types/bcrypt @types/express @types/jsonwebtoken @types/node nodemon prisma ts-node typescript```

### Step 2: Install PostgreSQL

Ensure you have PostgreSQL installed on your machine. If not, follow these instructions:
    Ubuntu Installation Guide:

1. Update your pakage list: 

```sudo apt update```

2. Install PostgreSQL: 

```sudo apt install postgresql postgresql-contrib```

3. Start and Enable PostgreSQL Service:

    Check if PostgreSQL is running: ```sudo systemctl status postgresql```

    Enable PostgreSQL to start on boot: ```sudo systemctl enable postgresql```

4.Access PostgreSQL:
    ```Access PostgreSQL:```

5.Exit PostgreSQL:
    ```\q```

### step 3: Create a New Database in PostgreSQL
Access PostgreSQL using the command above and create a new database:
    ```CREATE DATABASE chat_app;```

### Step 4: Configure .env File

Create a .env file to store your database connection string:

```DATABASE_URL="postgresql://postgres:<password>@localhost:5432/chat_app"```

Replace <password> with the password for your PostgreSQL user.

If you encounter any errors when connecting to your database:
Check the .env file to ensure the password is correct.

If needed, you can change the password by running: 
    ```sudo -u postgres psql```
Then, run:
    ```ALTER USER postgres PASSWORD 'newpassword';```

Example:
    ```ALTER USER postgres WITH PASSWORD 'admin0424';```

-->Replace 'newpassword' with your desired password.

Generate a random JWT secret key with this command:
        ```openssl rand -hex 32```
Add the JWT secret to the .env file:      
        ```JWT_SECRET="your secret key"```
### Step 5: Run Prisma Migrations
1.Create the Prisma schema and run migrations:
        ```npx prisma migrate dev```
2.Create the Prisma folder:
        ```npx prisma init```

After running the command, your directory structure will look like this:
    /your-project
    ├── prisma/
    │   └── schema.prisma
    ├── node_modules/
    ├── package.json
    ├── .env
    └── ...

3.Open the prisma/schema.prisma file:
    ```nano prisma/schema.prisma```
4.Insert your Prisma schema content into the file, then save:

    +Press Ctrl + O and press Enter to save.

    +Press Ctrl + X to exit nano.

5.Create the Prisma client:
    ```npx prisma generate```

You will be prompted to enter a name for the new migration:
```Enter a name for the new migration: init```

### Step 6: Run Prisma Studio

To interact with your database using a visual tool, run Prisma Studio:
    ```npx prisma studio```

Prisma Studio provides an easy way to explore and manipulate the data in your PostgreSQL database.

### Step 7: Stop PostgreSQL
If you need to stop PostgreSQL, run:
```sudo systemctl stop postgresql```

###### Window ######

### Step 1: Install All Required Modules

1. Open **Command Prompt** or **PowerShell**.
2. Navigate to your project directory using the `cd` command.
   
   Example:

```bash
   cd path\to\your-project
```

3.Install all necessary dependencies by running:
```npm install @prisma/client bcrypt cors dotenv express jsonwebtoken socket.io yup
```

4.Install development dependencies:

```npm install --save-dev @types/bcrypt @types/express @types/jsonwebtoken @types/node nodemon prisma ts-node typescript
```

### Step 2: Install PostgreSQL

1.Download PostgreSQL for Windows from the official PostgreSQL website.

2.Run the installer and follow the installation steps:

Choose the default options for installation.
Set the password for the postgres user during the installation process (remember it, as you will need it later).

3.Start PostgreSQL:

PostgreSQL should automatically start after installation.

If it doesn't, you can start it manually from the Services window or by running the following command in PowerShell:
```net start postgresql-x64-13
```


### Step 3: Create a New Database in PostgreSQL

1.Open Command Prompt or PowerShell as Administrator and enter the PostgreSQL interactive terminal: 
```psql -U postgres
```
2.Create a new database by running the following SQL command:
```CREATE DATABASE chat_app;
```
3.Exit the PostgreSQL terminal:
```\q
```

### Step 4: Configure .env File
1.Create a .env file in the root directory of your project if it doesn't already exist.

2.Add the following line to the .env file to configure your PostgreSQL connection string:
```DATABASE_URL="postgresql://postgres:<password>@localhost:5432/chat_app"
```

Replace <password> with the password you set during PostgreSQL installation.

If you encounter any errors when connecting to your database:
1.Open the PostgreSQL terminal again:
```psql -U postgres
```
2.Change the password using the following SQL command:
```ALTER USER postgres PASSWORD 'newpassword';
```
3.Replace 'newpassword' with your desired password and update the .env file with the new password.

Generate a random JWT secret key with the following command: 
```openssl rand -hex 32
```
Add this secret key to the .env file:
```JWT_SECRET="your secret key"
```


### Step 5: Run Prisma Migrations

1.Run Prisma migrations to create the necessary database tables:
```npx prisma migrate dev
```

2.Initialize Prisma if you haven't already:
```npx prisma init
```

After running the command, your directory structure should look like this:

/your-project
├── prisma/
│   └── schema.prisma
├── node_modules/
├── package.json
├── .env
└── ...

3.Open the prisma/schema.prisma file using any text editor (e.g., Notepad or VS Code) and add your Prisma schema.

After editing the schema, save the file.

4.Generate the Prisma client:
```npx prisma generate
```
You will be prompted to enter a name for the migration. For example:
```Enter a name for the new migration: init
```

This will create and apply the migration to your database.

### Step 6: Run Prisma Studio
To interact with your database visually, run Prisma Studio:
```npx prisma studio
```
Prisma Studio is a visual tool that allows you to explore and manage your data in PostgreSQL.

### Step 7: Stop PostgreSQL
If you need to stop PostgreSQL, run the following command in PowerShell as Administrator:
```net stop postgresql-x64-13
```