const router = require("express").Router();

// controller for books
const bookController = require("../controllers/book");
// access token middleware
const verifyToekn = require("../middlewares/authToken");

// route for getting all books
// GET /books/
router.get("/", bookController.getAllBooks);

// router for getting one book by id
// GET /books/:id
router.get("/:id", bookController.findOneBook);

// route for creating new post => you must be authenticated (you need auth-token)
// POST /books/create
router.post("/create", verifyToekn, bookController.createBook);

// route for updating existing post => you must be authenticated (you need auth-token)
// PUT /books/update/:id
router.put("/update/:id", verifyToekn, bookController.updateBook);

// route for deleting existing post => you must be authenticated (you need auth-token)
// DELETE /books/delete/:id
router.delete("/delete/:id", verifyToekn, bookController.removeBook);

module.exports = router;
