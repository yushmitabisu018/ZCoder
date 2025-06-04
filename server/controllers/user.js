const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Get logged-in user's data
const getUser = async (req, res) => {
  const { user: { userName } } = req;

  try {
    const userData = await User.findOne({ userName });
    if (!userData) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: `No user found: ${userName}` });
    }
    return res.status(StatusCodes.OK).json({ userData });
  } catch (err) {
    console.error("Error retrieving user data:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
};

// Get another user's data by username (from param)
const getOtherUser = async (req, res) => {
  const { id: userName } = req.params;

  try {
    const userData = await User.findOne({ userName });
    if (!userData) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: `No user found: ${userName}` });
    }
    return res.status(StatusCodes.OK).json({ userData });
  } catch (err) {
    console.error("Error retrieving other user:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
};

// Add a friend
const addFriend = async (req, res) => {
  const { user: { userName } } = req;
  const { id: friendUserName } = req.params;

  if (userName === friendUserName) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Cannot add yourself as a friend." });
  }

  try {
    const user = await User.findOneAndUpdate(
      { userName },
      { $addToSet: { friends: friendUserName } }, // avoid duplicates
      { new: true }
    );

    return res.status(StatusCodes.OK).json({ msg: `${friendUserName} added to your friends`, user });
  } catch (err) {
    console.error("Error adding friend:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error adding friend" });
  }
};

// Remove a friend
const removeFriend = async (req, res) => {
  const { user: { userName } } = req;
  const { id: friendUserName } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { userName },
      { $pull: { friends: friendUserName } },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({ msg: `${friendUserName} removed from your friends`, user });
  } catch (err) {
    console.error("Error removing friend:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error removing friend" });
  }
};

// Get all friends
const getAllFriends = async (req, res) => {
  const { user: { userName } } = req;

  try {
    const user = await User.findOne({ userName });
    const friends = user.friends || [];

    return res.status(StatusCodes.OK).json({
      friends,
      count: friends.length,
      msg: friends.length ? "Friends list retrieved" : "You have no friends yet."
    });
  } catch (err) {
    console.error("Error getting friends list:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error fetching friends" });
  }
};

module.exports = {
  getUser,
  getOtherUser,
  addFriend,
  removeFriend,
  getAllFriends,
};
