const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let answerSchema = mongoose.Schema({
  owner:{type:Schema.Types.ObjectId,ref:'user'},
  pertanyaan:{type:Schema.Types.ObjectId,ref:'question'},
  name:String,
  answer:'',
  upvote:[],
  downvote:[],
  date:{type:String}
});

let Answer = mongoose.model('answer',answerSchema);



module.exports = Answer;
