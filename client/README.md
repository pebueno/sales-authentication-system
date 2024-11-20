# Frontend - Client Application

Welcome to the frontend repository of the **React + TypeScript + Vite** application for managing agents, customers, and orders! This project is built for a seamless, modular, and maintainable development experience using modern tools and patterns. Below, you'll find everything you need to understand and work with the project effectively.

---

## Table of Contents

- [Frontend - Client Application](#frontend---client-application)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Why These Choices?](#why-these-choices)
    - [1. **React + TypeScript**](#1-react--typescript)
    - [2. **Vite**](#2-vite)
    - [3. **Material UI**](#3-material-ui)
    - [4. **Centralized State Management with Contexts**](#4-centralized-state-management-with-contexts)
    - [5. **Custom Hooks**](#5-custom-hooks)
  - [Project Structure](#project-structure)
  - [Setup and Run](#setup-and-run)
    - [Prerequisites](#prerequisites)
      - [1. Clone the Repository and Install Dependencies on the root and client folders](#1-clone-the-repository-and-install-dependencies-on-the-root-and-client-folders)
      - [2. Create a `.env` File Add the following environment variable to your `.env` file:](#2-create-a-env-file-add-the-following-environment-variable-to-your-env-file)
      - [3. Run the Development Server Start the development server:](#3-run-the-development-server-start-the-development-server)
      - [4. The application will be accessible at `http://localhost:5173`.](#4-the-application-will-be-accessible-at-httplocalhost5173)
      - [5. Build for Production To create a production build, run:](#5-build-for-production-to-create-a-production-build-run)
      - [6. Preview Production Build After building, you can preview the production build locally:](#6-preview-production-build-after-building-you-can-preview-the-production-build-locally)

---

## Introduction

This application is a **React + TypeScript + Vite** project designed for efficient and scalable development. It interacts with a backend API to manage **agents**, **customers**, and **orders**. The client is designed to ensure robust role-based access control (RBAC) and supports features like CRUD operations and data visualization.

The technologies used include:
- **React** for UI components.
- **TypeScript** for type safety.
- **Vite** for fast development and bundling.
- **Material UI** for styling and prebuilt components.
- **Custom Hooks** for reusable logic.
- **Context API** for global state.

---

## Features

- **Role-Based UI**: Users only see what their role permits (Admin, Agent, Customer, Guest).
- **CRUD Functionality**: Add, edit, delete, and view agents, customers, and orders.
- **Pagination**: Efficiently handle large datasets with Material UI's Pagination.
- **Data Summarization**: Visual summaries of total orders by customer, agent, and country.
- **Reusable Components**: Custom hooks, context providers, and components for modularity.

---

## Why These Choices?

### 1. **React + TypeScript**
   - Ensures a type-safe, scalable, and maintainable codebase.
   - TypeScript reduces runtime errors and provides better developer tooling.

### 2. **Vite**
   - Provides fast startup and HMR (Hot Module Replacement) for an optimized development experience.

### 3. **Material UI**
   - Offers a consistent, modern UI with ready-to-use components.
   - Simplifies layout and design while allowing customization.

### 4. **Centralized State Management with Contexts**
   - Separate contexts (e.g., `AuthContext`, `CustomerContext`) ensure a modular and testable global state.
   - Centralized management avoids prop drilling and improves maintainability.

### 5. **Custom Hooks**
   - Encapsulates reusable logic, such as API calls or authentication, keeping components clean and focused.
   - Example: `useCustomers` for fetching and managing customer data.

---

## Project Structure

```plaintext
📂 client
├── 📂 src
│   ├── 📂 components    # Shared Components and types/interfaces     
│   │   ├── contexts      # Contexts for centralized state
│   │   ├── hooks         # Custom hooks for reusable logic
│   │   ├── pages         # Page-level components
│   ├── App.tsx           # Entry point of the app
│   ├── index.tsx         # Application bootstrap
│   └── styles            # Global and modular styles
├── .env                  # Environment variables
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```
---

## Setup and Run
### Prerequisites
Make sure you have the following installed:

**Node.js** (v20 or later)
**npm** (v8 or later)
Steps to Set Up the Project


#### 1. Clone the Repository and Install Dependencies on the root and client folders
```bash
git clone https://github.com/Resquared/re2-frontend-challenge-pebueno
npm install
cd client
npm install
```
#### 2. Create a `.env` File Add the following environment variable to your `.env` file:
```bash
VITE_API_BASE_URL=/api
```
#### 3. Run the Development Server Start the development server:
```bash
npm run dev
```
#### 4. The application will be accessible at `http://localhost:5173`.

#### 5. Build for Production To create a production build, run:
```bash
npm run build
```

#### 6. Preview Production Build After building, you can preview the production build locally:
```bash
npm run preview
```