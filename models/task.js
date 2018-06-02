var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 let todoSchema = new Schema({
     title: String,
     descripcion: String,
     date: Date,
     dateWOTZ: String
 });

 module.exports = mongoose.model('Tasks', todoSchema);