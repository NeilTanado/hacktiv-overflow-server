const Question = require('../models/question');
const Answer = require('../models/answer');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = {
  createQuestion(req,res){
    var decoded = jwt.verify(req.headers.token,'secret');
    const newDate = new Date;
    var date = String(newDate).slice(0, 15);
    var time = String(newDate).slice(16, 24);
    var now = `${date}`;
    var questionBaru = new Question({
      question : req.body.question,
      owner : decoded.id,
      upvote: [],
      downvote: [],
      answer: [],
      date : now
    });
    questionBaru.save()
    .then((value) => {
      res.status(201).json({
        message: 'berhasil buat pertanyaan',
        value
      });
    })
    .catch((err) => {
      res.status(400).json({
        message:'error'
      });
    });
  },

  deleteQuestion(req,res){
    Question.findOneAndDelete({_id:req.params.id})
    .then((deleteQuestion) => {
      res.status(200).json({
        message: 'delete success'
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'delete gagal'
      });
    });
  },

  upvoteQuestion(req,res){
    let decoded = jwt.verify(req.headers.token, 'secret');
    Question.findOneAndUpdate({_id:req.params.id},{
      $push:{
        upvote:decoded.id
      }
    })
    .then((value) => {
      res.status(200).json({
        message:'sucess',
        value
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:'err',
        err
      });
    });
  },

  downvoteQuestion(req,res){
    let decoded = jwt.verify(req.headers.token, 'secret');
    Question.findOneAndUpdate({_id:req.params.id},{
      $push:{
        downvote:decoded.id
      }
    })
    .then((value) => {
      res.status(200).json({
        message:'sucess',
        value
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:'err',
        err
      });
    });
  },

  createAnswer(req,res){
    let decoded = jwt.verify(req.headers.token, 'secret');
    console.log('======',decoded);
    const newDate = new Date;
    var date = String(newDate).slice(0, 15);
    var time = String(newDate).slice(16, 24);
    var now = `${date}`;
    let newAnswer = new Answer({
      answer: req.body.answer,
      owner: decoded.id,
      name: decoded.name,
      pertanyaan: req.body.questionId,
      upvote:[],
      downvote:[],
      date:now
    });
    newAnswer.save()
    .then((value) => {
      Question.findOneAndUpdate({_id:req.body.questionId},{
        $push:{
          answer:value._id
        }
      })
      .then((valuequestion) => {
        res.status(200).json({
          message:'sucess push question',
          valuequestion
        });
      });
    })
    .catch((err) => {
      res.status(400).json({
        message:'error'
      });
    });
  },

  deleteAnswer(req,res){
    Answer.findOneAndDelete({_id:req.params.id})
    .then((deleteAnswer) => {
      res.status(200).json({
        message:'sucess delete',
        deleteAnswer
      });
    })
    .catch((err) => {
      res.status(400).json({
        message:'sucess delete',
        err
      });
    });
  },

  upvoteAnswer(req,res){
    console.log(req.params);
    let decoded = jwt.verify(req.headers.token, 'secret');
    Answer.findOneAndUpdate({_id:req.params.id},{
      $push:{
        upvote:decoded.id
      }
    })
    .then((value) => {
      res.status(200).json({
        message:'sucess',
        value
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:'err',
        err
      });
    });
  },

  downvoteAnswer(req,res){
    console.log(req.params);
    let decoded = jwt.verify(req.headers.token, 'secret');
    Answer.findOneAndUpdate({_id:req.params.id},{
      $push:{
        downvote:decoded.id
      }
    })
    .then((value) => {
      res.status(200).json({
        message:'sucess',
        value
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:'err',
        err
      });
    });
  },

  callQuestion(req,res){
    Question.find()
    .populate('answer')
    .populate('owner')
    .then((value) => {
      res.status(200).json({
        message:'data terkirim',
        value
      });
    })
    .catch((err) => {
      res.status(400).json({
        message:'gagal kirim data',
        err
      });
    });
  },

  oneQuestion(req,res){
    Question.findOne({_id:req.params.id})
    .populate('answer')
    .populate('owner')
    .then((value) => {
      res.status(200).json({
        message:'data terkirim',
        value
      });
    })
    .catch((err) => {
      res.status(400).json({
        message:'gagal kirim data',
        err
      });
    });
  }
};
