const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyTokenHandler");
const {getTodos, createTodo, updateTodo, deleteTodo, getTodoById} = require("../controllers/todoControllers");

router.route("/").get(verifyToken, getTodos).post(verifyToken, createTodo);
router.route("/:id").put(verifyToken, updateTodo).delete(verifyToken, deleteTodo);
router.get("/:id", verifyToken, getTodoById);

module.exports = router;
