Realtime Chat Application

[+] Installation Instructions [+]

*Step 1: Install All Required Modules

Run the following command to install all necessary dependencies:

```npm i @prisma/client bcrypt cors dotenv express jsonwebtoken socket.io yup```

Install development dependencies:

```npm i -D @types/bcrypt @types/express @types/jsonwebtoken @types/node nodemon prisma ts-node typescript ```

*Step 2: Install PostgreSQL

Ensure you have PostgreSQL installed on your machine. If not, follow these instructions:

Ubuntu Installation Guide:
    
Update Your Package List:

```sudo apt update```

Install PostgreSQL:

```sudo apt install postgresql postgresql-contrib```

Start and Enable PostgreSQL Service:

Check if PostgreSQL is running:

``` sudo systemctl status postgresql```

Enable PostgreSQL to start on boot:
```sudo systemctl enable postgresql```

Access PostgreSQL: ```sudo -i -u postgres psql```

Exit PostgreSQL: ```\q```

*Step 3: Create a New Database in PostgreSQL

Access PostgreSQL using the command above and create a new database:

```CREATE DATABASE chat_app;```

*Step 4: Configure .env File

Create a .env file to store your database connection string:

```DATABASE_URL="postgresql://postgres:<password>@localhost:5432/chat_app"```

Replace <password> with the password for your postgres user.

If you encounter any errors when connecting to your database, check the .env file and ensure the password is correct. If needed, you can change the password with:

``` sudo -u postgres psql ```
Then, run:

```ALTER USER postgres PASSWORD 'newpassword';```

Replace 'newpassword' with the new password.

*Step 5: Run Prisma Migrations

Run the following command to apply Prisma migrations to your database:

```npx prisma migrate dev```

You will be prompted to enter a name for the new migration:

```Enter a name for the new migration: … init```

This will create the migration files and apply them to the database.

*Step 6: Run Prisma Studio

To interact with your database using a visual tool, run Prisma Studio:

```npx prisma studio```

Prisma Studio provides an easy way to explore and manipulate the data in your PostgreSQL database.

Make sure you have fulfilled all the requirements mentioned above before running these commands.



stop postgresql ```sudo systemctl stop postgresql```