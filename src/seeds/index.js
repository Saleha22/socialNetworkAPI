const mongoose = require("mongoose");

const { User, Thought } = require("../models");

const users = require("./data/users");
const thoughts = require("./data/thoughts");

const init = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/social_network_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("[INFO]: Database connection successful");

    await User.deleteMany({});
    await User.insertMany(users);

    console.log("[INFO]: Successfully seeded users");

    await Thought.deleteMany({});
    await Thought.insertMany(thoughts);

    console.log("[INFO]: successfully seeded thoughts");

    const thoughtsFromDb = await Thought.find({});
    const usersFromDb = await User.find({});

    const promises = thoughtsFromDb.map(async (thought) => {
      const userName = thought.userName;
      const user = usersFromDb.find((user) => user.userName === userName);
      user.thoughts.push(thought._id.toString());
      await User.findByIdAndUpdate(user._id, { ...user });
    });

    const friendsPromises = usersFromDb.map(async (user) => {
      const userId = user._id.toString();
      const allUsers = usersFromDb.filter(
        (currentUser) => currentUser.userName !== user.userName
      );
      const randomFriend =
        allUsers[Math.floor(Math.random() * allUsers.length)];

      user.friends.push(randomFriend._id);
      await User.findByIdAndUpdate(userId, { ...user });
    });

    await Promise.all(promises);
    await Promise.all(friendsPromises);

    await mongoose.disconnect();
  } catch (error) {
    console.log(
      `[INFO]: Database connection failed  - failed to seed database | ${error.message}`
    );
  }
};

init();
