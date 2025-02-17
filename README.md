# JavaScript2 E-Commerce Project

## 🚀 Overview
This is a **full-stack e-commerce website** built as part of the JavaScript2 course.  
It features a **React frontend** and an **Express.js + SQLite backend** that allows users to browse high-end fashion items.

---

## 🎯 Features
- **Product Catalog** – Browse a selection of luxury fashion products.
- **Product Details** – View individual product details, images, and descriptions.
- **Category Filtering** – Products are categorized (Shoes, Clothes, Bags, Watches, Sunglasses).
- **UI** – Styled with **Tailwind CSS**.

---

## 📂 Project Structure



---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/OliverBorys/JavaScript2_OliverBorys_VG.git
cd JavaScript2_OliverBorys_VG

```md
### **2️⃣ Install Dependencies**
After cloning the repository, navigate to the project folder and install dependencies:

#### **📌 Install Frontend Dependencies**
```sh
npm install

#### **📌 Install Backend Dependencies**
```sh
cd backend
npm install

---

### **✅ Why This is Important?**
- The **frontend** (`React`) and **backend** (`Express`) are separate, each requiring its own dependencies.
- Running `npm install` in the **frontend** directory installs React-related dependencies.
- Running `npm install` in the **backend** installs Express, SQLite, and other server dependencies.

---

### **🚀 Final Steps to Run the Project**
After installing dependencies, users can start both **frontend and backend**:

#### **Start Backend (`Express + SQLite`)**
```sh
cd backend
npm run dev

#### **Start Frontend (`React + Vite`)**
```sh
cd ../
npm run dev




Dependencies
npm install
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install tailwindcss @tailwindcss/vite
npm install -D prettier prettier-plugin-tailwindcss
npm install tailwindcss
npm install prop-types



mkdir backend
cd backend

npm init -y

npm install express better-sqlite3 cors dotenv

npm install --save-dev nodemon

mkdir db
touch db/products.db
touch server.js

Add nodemon to package.json



Don't forget to start the server on the backend and on frontend, otherwise the products won't be able to fetch
Crtl ö
npm run dev

open new terminal
cd backend
npm run dev