const mongoose = require('mongoose');

// Define Schemes
const todoSchema = new mongoose.Schema({
        title: {type: String, required: true},
        content: {type: String},
        priority: {type: String},
        completed: {type: Boolean, default: false},
        deadline: {type: Date}
    },
    {
        timestamps: true
    });

// Create new todo document
todoSchema.statics.create = function (payload) {
    const todo = new this(payload);
    return todo.save();
};

// Find All
todoSchema.statics.findAll = function() {
    return this.find({});
};

// Find One by id
todoSchema.statics.findOneById = function(id) {
    return this.findById(id);
};

// Update by id
todoSchema.statics.updateById = function (id, payload) {
    return this.findByIdAndUpdate(id, payload, {new: true});
};

// Delete by id
todoSchema.statics.deleteById = function(id) {
    return this.deleteOne({_id:id});
};

// Check if exist given id
todoSchema.statics.existById = function(id) {
    const result = this.findOne({_id:id}).select("_id").lean();
    return result ? true : false;
};

// Create Model & Export it
module.exports = mongoose.model('Todo', todoSchema);
