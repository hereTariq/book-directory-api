// importing Book model
const Book = require("../models/book_directory");
const { bookValidation } = require("../utils/validation");

// controller to get all books (token is not reqiured)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No Book found! You need to create one" });
    }
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({
      message: "Something goes wrong in retrieving the items",
    });
  }
};

// controller for getting particular book using it's id (token is not required)
exports.findOneBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ message: `There is no book found with that id: ${id}` });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving book with id: ${id}`,
      maybe: "make sure your id is correct!",
    });
  }
};

// Controller for creating new book (token required) => you need to sign in
exports.createBook = async (req, res) => {
  const { error } = bookValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { title, author } = req.body;
  try {
    const bookExists = await Book.findOne({ title });
    if (bookExists) {
      return res.status(400).send("The book already exists with that title");
    }
    const newBook = new Book({ title, author });
    const savedBook = await newBook.save();
    res.status(201).json({
      message: "You successfully created a post",
      savedBook,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something goes wrong in creating a book",
    });
  }
};

// Controller to remove a particular book using it's id (token required) you need to sign in
exports.removeBook = async (req, res) => {
  const id = req.params.id;
  try {
    const bookExists = await Book.findById(id);
    if (!bookExists) {
      return res.status(404).json({ message: "Book does not exists." });
    }
    const deletedData = await Book.deleteOne({ _id: id });
    res.json({ message: `${bookExists.title} book was deleted` });
  } catch (err) {
    res.status(500).json({
      message: `Cannot delete book with the id: ${id}`,
    });
  }
};

// Controller to update a particular book using it's id(token required) you need to sign in
exports.updateBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ message: `Book does not exists with that id: ${id}` });
    }

    const { error } = bookValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { title, author } = req.body;
    book.title = title;
    book.author = author;
    const updatedBook = await book.save();
    res.status(200).json({ message: "Book updated!" });
  } catch (err) {
    res.status(500).json({ message: `No Book found with that id: ${id}` });
  }
};
