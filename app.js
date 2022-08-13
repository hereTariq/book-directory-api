const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const { join } = require('path');
const underconstruction = require('./middlewares/underconstruction');
const app = express();
app.use(underconstruction);

require('dotenv').config();

// importing routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
app.use(cors());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') +
                '-' +
                file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const PORT = process.env.PORT || 3200;

//  loading middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use('/images', express.static(join(__dirname, 'images')));
// route middlewares
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

mongoose
    .connect('mongodb://localhost:27017/book_directory')
    .then((result) => {
        console.log('connected');
        app.listen(PORT);
    })
    .catch((err) => console.log(err));
