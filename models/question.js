const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let questionSchema = mongoose.Schema({
  owner:{type:Schema.Types.ObjectId,ref:'user'},
  question:String,
  answer:[{type:Schema.Types.ObjectId,ref:'answer'}],
  upvote:[],
  downvote:[],
  date:{type:String}
});

let Question = mongoose.model('question',questionSchema);



module.exports = Question;
