const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose")
const Todo = require("../models/todoSchema");

//@desc get all todos for a particular user
// route GET /
// access private

const getTodos = asyncHandler( async (req, res, next) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const todos = await Todo.find({ userId });

    if(!todos) {
        res.status(401);
        return next(new Error("Not found any todo for user " + req.user.username));
    }

    res.status(200).json(todos);
})

//@desc get todos by id
// route GET /:id
// access private

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        // Optional: restrict access to only the owner
        if (todo.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



//@desc create todo
// route POST /
// access private

const createTodo = asyncHandler( async (req, res, next) => {
    const userId = req.user.userId;
    const {title, description, priority, tags} = req.body;

    const todo = await Todo.create({
        title,
        description,
        priority,
        tags,
        userId
    })

    res.status(201).json({message: "Todo saved successfully", todo});
})

//@desc update todo
// route PUT /
// access private

const updateTodo = asyncHandler( async (req, res, next) => {
        const todoId = req.params.id;
        const userId = req.user.userId;

        const todo = await Todo.findOne({_id : todoId, userId});

        if(!todo) {
            res.status(404);
            return next(new Error("Todo not found or unauthorized"));
        }

        const{title, description, completed, priority, tags} = req.body;

        // update only those which are sent in the body, like if we hit the completed checkbox, we will just gonna send completed: true, so we will only gonna update that, because all other will be undefined, so if we like update all, in that case some fields will become undefined

        if(title !== undefined) todo.title = title;
        if(description !== undefined) todo.description = description;
        if(priority !== undefined) todo.priority = priority;
        if(completed !== undefined) todo.completed = completed;
        if(tags !== undefined) todo.tags = tags

        const updateTodo = await todo.save();

        res.status(200).json({message: "todo-updated",todo: updateTodo});
    }
)

//@desc delete todo
// route DELETE /
// access private

const deleteTodo = asyncHandler( async (req, res, next) => {
    const todoId = req.params.id;
    const userId = req.user.userId;

    const todo = await Todo.findOne({_id : todoId, userId});
    if(!todo) {
        res.status(404);
        return next(new Error("todo not found or unauthorized!"))
    }

    const deletedTodo = await todo.deleteOne();

    res.status(200).json({message: "todo-deleted", todo: deletedTodo});
})


module.exports = {getTodos, createTodo, updateTodo, deleteTodo, getTodoById};
