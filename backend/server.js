import express from "express";
import Database from "better-sqlite3";
import cors from "cors";


const app = express();
const PORT = 5000;

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

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { productName, price, image, secondaryImage1, secondaryImage2, secondaryImage3, brand, productDescription, isNew, categoryId, publishingDate } = req.body;

  const stmt = db.prepare(`
    UPDATE products 
    SET 
      productName = ?, 
      price = ?, 
      image = ?, 
      secondaryImage1 = ?, 
      secondaryImage2 = ?, 
      secondaryImage3 = ?, 
      brand = ?, 
      productDescription = ?, 
      isNew = ?, 
      categoryId = ?, 
      publishingDate = ?
    WHERE id = ?
  `);

  const result = stmt.run(
    productName, 
    price, 
    image, 
    secondaryImage1, 
    secondaryImage2, 
    secondaryImage3, 
    brand, 
    productDescription, 
    isNew, 
    categoryId, 
    publishingDate, 
    id
  );

  if (result.changes === 0) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({ message: "Product updated successfully" });
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


const heroDb = new Database("./db/hero.db", { verbose: console.log });

heroDb.prepare(`
  CREATE TABLE IF NOT EXISTS hero_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT NOT NULL
  )
`).run();

app.get("/api/hero-images", (req, res) => {
  const images = heroDb.prepare("SELECT * FROM hero_images").all();
  res.json(images);
});

app.post("/api/update-hero-images", (req, res) => {
  const { imageUrl1, imageUrl2 } = req.body;

  if (!imageUrl1 || !imageUrl2) {
    return res.status(400).json({ error: "Both image URLs are required." });
  }

  const stmt1 = heroDb.prepare("UPDATE hero_images SET image_url = ? WHERE id = 1");
  const stmt2 = heroDb.prepare("UPDATE hero_images SET image_url = ? WHERE id = 2");
  
  stmt1.run(imageUrl1);
  stmt2.run(imageUrl2);
  

  res.json({ message: "Hero images updated successfully!" });
});


  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
