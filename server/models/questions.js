const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    platform: {            
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,    
    },
    tags: {
      type: [String],
    },
    Author: {
      type: String,
      required: [true, "Please Provide User"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);





