# Schedule Buddy

This is a great appointment scheduler application built using React. Here's a breakdown of the functionalities and specifications for running the project locally.

### 1. Live Demo
Demo: [https://schedule-buddy.vercel.app](https://schedule-buddy.vercel.app)

### Repo clone
Clone the repository into your projects directory:
```
git clone https://github.com/Dipjitbaroi/Schedule-Buddy.git
```
Or
```
git clone git@github.com:Dipjitbaroi/Schedule-Buddy.git
```
Navigate to the project directory:
```
cd your-project-name
```
Install Dependency:
```
npm i
```
or 
```
yarn
```

### 2. Run project with docker

**Please open your `Docker Desktop` first.**
Then open you project in your tarminal and run this command:
```
docker-compose up --build
```
after run the project successfully browse [http://localhost:3000/](http://localhost:3000/)

To stop the project run this command:
```
docker-compose down
```

### 3. Run it locally

Create a `.env` file in your project `root directory`:

<img src="./src/assets/images/env.png" alt="env" width="200"/>

Paste this `credential` in your `.env` file:

```.env
VITE_FIREBASE_API_KEY=AIzaSyCXK9h_wnhNHvnaTZ3FREI4BDDOICPfr6g
VITE_FIREBASE_AUTH_DOMAIN=schedule-buddy-app.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-dev-app.firebaseio.com
VITE_FIREBASE_PROJECT_ID=schedule-buddy-app
VITE_FIREBASE_STORAGE_BUCKET=schedule-buddy-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=505046968992
VITE_FIREBASE_APP_ID=1:505046968992:web:1582654123e27ee9dd37c5Ï

```
Build your project to run in production mode:
```
npm run build
```
Or
```
yarn build
```
Finally run your project:
```
npm run preview
```
Or
```
yarn preview
```
Now you can browse the project at [http://localhost:4173/](http://localhost:4173/)

# Project Features

### User Management:
- User login and account creation.
- After login, a user can see all users and search for users by their name or email.
- A user can make an appointment by clicking the ``Make an appointment`` button.

### Appointment Management:
- All appointments that a user schedules with other users can be seen on the `My Appointment` page.
- A user can `cancel` appointment if desired.
- All the appointment that others user want to schedula with me can see at `Requested Appointment` page.
- A user can `approve` or `cancel` appointments from this page.
- A user can search for appointments by name and email, filter by appointment status, and view upcoming and past appointments.
