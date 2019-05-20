const Todo = require('../models/todoModel');
const mongoose = require('mongoose');
const moment = require('moment');

// Find One by todoid
exports.index = (req, res) => {
    let id = req.params.id || '';
    if (!id.length || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid id'});
    }

    Todo.findOneById(id)
        .then((todo) => {
            if (!todo) res.status(404).json({error: 'Unknown user'});
            res.json(todo);
        })
        .catch(err => res.status(500).send(err));
};

// Find All
exports.show = (req, res) => {
    Todo.findAll()
        .then((todos) => {
            res.send(todos);
        })
        .catch(err => res.status(500).send(err));
};

// Delete one by todoid
exports.destroy = (req, res) => {
    const id = req.params.id || '';
    if (!id.length || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid id'});
    }

    Todo.deleteById(id)
        .then(() => res.sendStatus(204))
        .catch(err => res.status(500).send(err));
};

// Create todo
exports.create = (req, res) => {
    const title = req.body.title || '';
    const content = req.body.content || '';
    const priority = req.body.priority || '';
    const completed = req.body.completed || null;
    const deadline = req.body.deadline || null;

    let newTodo = {
        title: title,
        content: content,
        priority: priority
    };
    if (completed != null)
        newTodo.completed = completed;
    if (deadline != null) {
        if (!moment(deadline).isValid()) {
            return res.status(400).json({error:'Invalid deadline'});
        }
        newTodo.deadline = deadline;
    }

    Todo.create(newTodo)
        .then(todo => res.status(201).json(todo))
        .catch(err => res.status(500).send(err));
};

// Update one by todoid
exports.update = (req, res) => {
    const id = req.params.id || '';
    if (!id.length || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid id'});
    }

    const title = req.body.title || null;
    const content = req.body.content || null;
    const priority = req.body.priority || null;
    const completed = req.body.completed || null;
    const deadline = req.body.deadline || null;

    let todo = {};
    if (title != null) todo.title = title;
    if (content != null) todo.content = content;
    if (priority != null) todo.priority = priority;
    if (completed != null) todo.completed = completed;
    if (deadline != null) {
        if (!moment(deadline).isValid()) {
            return res.status(400).json({error:'Invalid deadline'});
        }
        todo.deadline = deadline;
    }


    Todo.updateById(id, todo)
        .then(() => res.sendStatus(204))
        .catch(err => res.status(500).send(err));
};