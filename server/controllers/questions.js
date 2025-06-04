
const Question = require("../models/questions");
const { BadRequestError, NotFoundError } = require("../errors");

const createQuestion = async (req, res) => {
  const {
    user: { userName },
  } = req;
  const question = await Question.create({ ...req.body, Author: userName });
  res.status(201).json({ question });
};

const getAllQuestions = async (req, res) => {
  const questions = await Question.find({});
  res.status(200).json({ questions });
};

const getAllBookmarks = async (req, res, next) => {
 
  const {
    user: { userName },
  } = req;
  const bookmarks = await Question.find({ Author: userName });
  if (!bookmarks) {
    return res.status(404).json({ msg: `No bookmarks created : ${userName}` });
  }

  res.status(200).json({ bookmarks });
};

module.exports = {
  getAllBookmarks,
  getAllQuestions,
  createQuestion,
  //deleteQuestion,
};