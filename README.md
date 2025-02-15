# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Setup Instructions](#setup-instructions)
    - [Cloning the Repository](#cloning-the-repository)
    - [Installing Dependencies](#installing-dependencies)
    - [Environment Variables](#environment-variables)
    - [Starting the Development Server](#starting-the-development-server)
  - [Testing the Application](#testing-the-application)

---

## Overview

This project is a frontend web application built using React.js and integrates with the backend API for authentication and data management. It provides a user-friendly interface for interacting with the system.

## Setup Instructions

### Cloning the Repository

```sh
git clone <[repository_url](https://github.com/vitorlsouza/kitty-care-frontend.git)>
```

### Installing Dependencies

```sh
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
VITE_BACKEND_BASE_URL=http://localhost:3000
```

### Starting the Development Server

```sh
npm run dev
```

## Testing the Application

Once the development server is running, open your browser and navigate to:

```
http://localhost:5173
```

Try logging in with Google OAuth to verify that authentication is working correctly.
