const express = require("express"); // Express framework for building web applications
const bodyParser = require("body-parser"); // Middleware to parse JSON bodies
const fs = require("fs").promises; // File system module to interact with the file system
const path = require("path"); // Module to handle and transform file paths
const cors = require("cors"); // Middleware to enable CORS (Cross-Origin Resource Sharing)

const app = express();
const PORT = 3000;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the path to the data file
const dataFilePath = path.join(__dirname, "books.json");

// Function to load books data from the file
const loadBooks = async () => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const books = JSON.parse(data);

    // Sort books by date in descending order
    books.sort((a, b) => new Date(b.date) - new Date(a.date));

    return books;
  } catch (error) {
    console.error("Error loading books:", error);
    return [];
  }
};

// Function to save books data to the file
const saveBooks = async (books) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(books, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving books:", error);
  }
};

// Endpoint to add a new book
app.post("/api/books", async (req, res) => {
  const books = await loadBooks();
  const { title, author, status, description } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    status,
    description,
    date: new Date().toISOString(),
  };

  books.unshift(newBook); // Add the new book to the beginning of the array
  await saveBooks(books);
  res.status(201).json(newBook);
});

// Endpoint to get all books
app.get("/api/books", async (req, res) => {
  const books = await loadBooks();
  res.json(books);
});

// Endpoint to get a single book by ID
app.get("/api/books/:id", async (req, res) => {
  const books = await loadBooks();
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// Endpoint to update a book's status by ID
app.put("/api/books/:id", async (req, res) => {
  const books = await loadBooks();
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { status } = req.body;
  book.status = status;
  await saveBooks(books);
  res.json(book);
});

// Endpoint to delete a book by ID
app.delete("/api/books/:id", async (req, res) => {
  const books = await loadBooks();
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found" });

  books.splice(bookIndex, 1);
  await saveBooks(books);
  res.status(204).send();
});

// Endpoint to filter books by status
app.get("/api/books/filter/:status", async (req, res) => {
  const books = await loadBooks();
  const filteredBooks = books.filter(
    (b) => b.status.toLowerCase() === req.params.status.toLowerCase()
  );
  res.json(filteredBooks);
});

// Middleware to handle 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
