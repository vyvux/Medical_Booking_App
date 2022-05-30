# Medical_Booking_App

### Note
NodeJs version 16 is recommended.

### Running project in your local
1.Clone the project to your local machine
2.You need some configuration to use the existing MySql script inside `db` folder
-Create a database with `medcare-deploy.sql` script
-Inside `nodejs` folder, change the environment in `src> config> **config.js** and **connectDB.js**`
-A `.env` file should be created in `nodejs` folder.
PORT = 8081
NODE_ENV = development
MAX_NUMBER_SCHEDULE = 8
NODEMAILER_PASSWORD = (my gmail passsword is removed)
3.Run apps:
-Navigate to .\nodejs folder and run: **npm start**
-Navigate to .\reactjs folder and run: **npm start**
-After successfully built, you can interact with the system at: `http://localhost:3000/`
