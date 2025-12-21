# Members Only
A Members Only club web application built with Node.js, Express, EJS, and PostgreSQL, where users can register, log in, and view/post messages with access levels depending on authentication status. It was developed as part of The Odin Project backend curriculum, highlighting authentication, session management, and protected routes. 

## 🚀 Project Summary
Members Only is a simple social space where:
- Anyone can see the list of posts (but not author details)
- Authenticated users can create posts
- Authenticated members can see who wrote each post
- Admin can manage content
This project demonstrates how to build secure parts of a web app that depend on whether a user is logged in. 

## 🎨 Live preview
The server will take a few second to start as it'is deployed on free plan (Le serveur prendra un peu de temps pour demarer car l'app est deployé sur un plan gratuit de Render).
[See the apllication (Voir l'application)](https://manolyx-club.onrender.com/)

## ✨ Key Features
- User registration & login
- Session‑based authentication (cookies & sessions)
- Protected routes so only signed‑in users can post or see author details
- Role‑based visibility (public vs authenticated views)
- Message posting stored in a database
- Graceful handling of unauthorized access
**The core idea is: everyone can see posts, but only members see authors's names.**


## 🧱 Technologies Used

- Node.js — backend runtime
- Express — routing and middleware
- PostgreSQL — data persistence
- Passport local Strategy, Session & cookie middleware — for authentication
- Templating (EJS)  — for rendering dynamic pages

## 🧠 What I Learned

- This project strengthened my backend skills by teaching me:
- How to build a user authentication flow
- How to manage sessions and cookies to keep users logged in
- How to protect routes so that only authorized actions are allowed
- How to differentiate public vs private content based on login status
- How to integrate persistent storage for users and posts
- Unlike simpler projects, this one ties security and user state directly to what content is shown.

## 📁 Project structure

```
.
├── README.md
├── app.js
├── config
│   └── passport.js
├── controllers
│   ├── indexController.js
│   ├── postsController.js
│   └── usersController.js
├── db
│   ├── Database.js
│   ├── PostModel.js
│   ├── UserModel.js
│   ├── pool.js
│   └── populateDb.js
├── errors
│   └── NotFoundError.js
├── eslint.config.js
├── middlewares
│   ├── auth.js
│   └── validationsChain.js
├── package-lock.json
├── package.json
├── public
│   ├── 404.css
│   ├── base.css
│   ├── changeStatus.css
│   ├── index.css
│   ├── login.css
│   ├── logo.jpg
│   ├── postForm.css
│   └── signup.css
├── routes
│   ├── indexRouter.js
│   ├── postsRouter.js
│   └── usersRouter.js
└── views
    ├── pages/
    └── partials/
```
