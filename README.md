# JavaScript2 E-Commerce Project

## 🚀 Overview
This is a **full-stack e-commerce website** built as part of the JavaScript2 course.  
It features a **React frontend** and an **Express.js + SQLite backend** that allows users to browse high-end fashion items.

---

## 🎯 Features
- **Product Catalog** – Browse a selection of luxury fashion products.
- **Product Details** – View individual product details, images, and descriptions.
- **Category Filtering** – Products are categorized (Shoes, Clothes, Bags, Watches, Sunglasses).
– Styled with **Tailwind CSS**.

---

## 📂 Project Structure



---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/OliverBorys/JavaScript2_OliverBorys_VG.git
cd JavaScript2_OliverBorys_VG




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