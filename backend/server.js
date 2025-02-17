import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const db = new Database("./db/products.db", { verbose: console.log });

db.prepare(
  `CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoryName TEXT UNIQUE NOT NULL CHECK (categoryName IN ('Shoes', 'Clothes', 'Bags', 'Watches', 'Sunglasses'))
  )`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productName TEXT NOT NULL,
      price NUMBER NOT NULL,
      image TEXT,
      secondaryImage1 TEXT,
      secondaryImage2 TEXT,
      secondaryImage3 TEXT,
      brand TEXT,
      productDescription TEXT,
      isNew TEXT,
      categoryId INTEGER,
      publishingDate TEXT,  -- Allows user-defined dates
      FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL
  )`
).run();
  

app.get("/api/products", (req, res) => {
  const products = db.prepare(`
    SELECT products.*, categories.categoryName
    FROM products
    LEFT JOIN categories ON products.categoryId = categories.id
  `).all();
  
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = db.prepare(
    `SELECT products.*, categories.categoryName 
     FROM products 
     LEFT JOIN categories ON products.categoryId = categories.id
     WHERE products.id = ?`
  ).get(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/api/products", (req, res) => {
  const { productName, price, image, secondaryImage1, secondaryImage2, secondaryImage3, brand, productDescription, isNew, categoryId, publishingDate } = req.body;

  if (!productName || !price || !publishingDate || !categoryId) {
    return res.status(400).json({ error: "Product name, price, publishing date, and categoryId are required" });
  }

  const stmt = db.prepare(
    "INSERT INTO products (productName, price, image, secondaryImage1, secondaryImage2, secondaryImage3, brand, productDescription, isNew, categoryId, publishingDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const result = stmt.run(productName, price, image, secondaryImage1, secondaryImage2, secondaryImage3, brand, productDescription, isNew, categoryId, publishingDate);

  res.json({ id: result.lastInsertRowid, productName, price, publishingDate, categoryId });
});

app.delete("/api/products/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM products WHERE id = ?");
  stmt.run(req.params.id);
  res.json({ message: "Product deleted" });
});

app.get("/api/categories", (req, res) => {
  const categories = db.prepare("SELECT * FROM categories").all();
  res.json(categories);
});



  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
