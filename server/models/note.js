const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  noteText: {type: String, required: true},
  subject:{type:String ,required:true}
});

module.exports = mongoose.model('Note', schema);