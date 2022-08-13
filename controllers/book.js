// importing Book model
const Book = require('../models/book');
const User = require('../models/user');
const { bookValidation } = require('../utils/validation');
const mongoose = require('mongoose');
const fs = require('fs');
const { join } = require('path');

// controller to get all books (token is not reqiured)
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (books.length === 0) {
            return res
                .status(404)
                .json({ message: 'No Book found! You need to create one' });
        }
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({
            message: 'Something gone wrong in retrieving the items',
        });
    }
};

// controller for getting particular book using it's id (token is not required)
exports.findOneBook = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Id' });
    }
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                message: `There is no book found with that id: ${id}`,
            });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({
            message: `Error retrieving book with id: ${id}`,
            maybe: 'make sure your id is correct!',
        });
    }
};

// Controller for creating new book (token required) => you need to sign in
exports.createBook = async (req, res) => {
    const { error } = bookValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    if (!req.file) {
        return res.status(422).json({ message: 'No Image provided.' });
    }

    const { title, author, image } = req.body;
    const book = await Book.findOne({ title, author });
    if (book) {
        return res.status(409).json({ message: 'Book already exists' });
    }
    const imageUrl = req.file.path;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newBook = new Book({
            title,
            author,
            imageUrl,
            userId: req.userId,
        });
        const savedBook = await newBook.save();
        user.books.push(newBook);
        await user.save();
        res.status(201).json({
            message: 'Book created successfully.',
            savedBook,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something goes wrong in creating a book',
        });
    }
};

// Controller to remove a particular book using it's id (token required) you need to sign in
exports.removeBook = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Id' });
    }
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book does not exists.' });
        }
        if (book.userId != req.userId) {
            return res.status(401).json({
                error: 'You are not authorized person to delete this book',
            });
        }
        clearImage(book.imageUrl);
        const deletedBook = await Book.findByIdAndDelete(id);
        const user = await User.findById(req.userId);
        user.books.pull(id);
        await user.save();
        res.json({ message: `book was deleted`, deletedBook });
    } catch (err) {
        res.status(500).json({
            message: `Cannot delete book with the id: ${id}`,
        });
    }
};

// Controller to update a particular book using it's id(token required) you need to sign in
exports.updateBook = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Id' });
    }
    try {
        const { error } = bookValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let { title, author, image } = req.body;
        if (req.file) {
            image = req.file.path;
        }
        if (!image) {
            return res.status(422).json({ error: 'No image file picked.' });
        }
        const book = await Book.findById(id);
        if (!book) {
            return res
                .status(404)
                .json({ message: `Book does not exists with that id: ${id}` });
        }

        if (book.userId != req.userId) {
            return res.status(401).json({
                error: 'You are not authorized person to update this book',
            });
        }
        if (image !== book.imageUrl) {
            clearImage(book.imageUrl);
        }
        book.title = title;
        book.author = author;
        book.imageUrl = image;
        const updatedBook = await book.save();
        res.status(200).json({ message: 'Book updated!' });
    } catch (err) {
        next(err);
    }
};

const clearImage = (filePath) => {
    filePath = join(__dirname, '..', filePath);
    fs.unlink(filePath, (err) => console.log(err));
};
