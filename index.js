const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { getAllPosts, addNewPost } = require("./server-classes/static-db.js");
const connectDB = require("./server-classes/db.js");
const Post = require("./server-classes/Post");

// povezivanje sa env fajlom
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server slusa na portu: ${PORT}`);
});

// konekcija ka bazi
connectDB();

app.use(express.static("client"));
app.use(express.json());

app.get("/api/posts", async (req, res) => {
  try {
    const allPosts = await Post.find().sort({ _id: -1 });

    res.json({
      success: true,
      posts: allPosts,
    });
  } catch (err) {
    res.json({
      success: false,
      msg: err.message,
    });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const author = req.body.author;
    const text = req.body.text;

    const newPost = new Post({
      author: author,
      text: text,
    });

    const savedPost = await newPost.save();

    res.json({
      success: true,
      post: savedPost,
    });
  } catch (err) {
    res.json({
      success: false,
      msg: err.message,
    });
  }
});

app.get("/api/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    res.json({
      success: true,
      post: post,
    });
  } catch (err) {
    res.json({
      success: false,
      msg: err.message,
    });
  }
});

app.post("/api/comment", async (req, res) => {
  try {
    const postId = req.body.postId;
    const author = req.body.author;
    const text = req.body.text;

    const post = await Post.findById(postId);

    const newComment = {
      author: author,
      text: text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    post.commentsNumber++;

    const savedPost = await post.save();

    res.json({
      success: true,
      post: savedPost,
    });
  } catch (err) {
    res.json({
      success: false,
      msg: err.message,
    });
  }
});

// implementacija sa bazom sa nizom

// app.get("/api/posts", (req, res) => {
//   const allPosts = getAllPosts();

//   res.json({
//     success: true,
//     posts: allPosts,
//   });
// });

// app.post("/api/posts", (req, res) => {
//   const author = req.body.author;
//   const text = req.body.text;

//   const newPost = {
//     _id: Math.floor(Math.random() * 1000),
//     author: author,
//     text: text,
//     createdAt: new Date(),
//     commentsNumber: 0,
//     comments: [],
//   };

//   addNewPost(newPost);

//   res.json({
//     success: true,
//     post: newPost,
//   });
// });
