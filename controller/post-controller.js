import bigformSch from "../model/bigform.js";
import Post from "../model/post.js";
import userSch from "../model/usermodel.js";

// Get all Posts
export const getPosts = async (request, response) => {
  // Step -1 // Test API
  // response.send('Code for Interview');
  try {
    // finding something inside a model is time taking, so we need to add await
    const Posts = await Post.find().sort({ updatedAt: -1 });
    response.status(200).json(Posts);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of the Post in database
export const addPost = async (request, response) => {
  // retreive the info of Post from frontend
  const post = request.body;

  const newPost = new Post(post);
  try {
    await newPost.save();
    response.status(200).json({ message: "added successfully" });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Get a Post by id
export const getPostById = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    response.status(200).json(post);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of edited Post in the database
export const editPost = async (request, response) => {
  let post = await Post.findById(request.params.id);
  post = request.body;

  const editPost = new Post(post);
  try {
    await Post.updateOne({ _id: request.params.id }, editPost);
    response.status(200);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// deleting data of Post from the database
export const deletePost = async (request, response) => {
  try {
    await Post.deleteOne({ _id: request.params.id });
    response.status(201).json("Post deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// bigform data
export const bigform = async (req, res) => {
  try {
    let photoupload = req.file.path;
    let {
      email,
      status,
      propertyType,
      street,
      unit,
      streetName,
      streetSuffix,
      city,
      state,
      zipCode,
      listPrice,
      bedrooms,
      bathrooms,
      finishedsqft,
      acres,
      publicRemarks,
    } = req.body;

    let createNewForm = new bigformSch({
      email,
      status,
      propertyType,
      street,
      unit,
      streetName,
      streetSuffix,
      city,
      state,
      zipCode,
      listPrice,
      bedrooms,
      bathrooms,
      finishedsqft,
      acres,
      publicRemarks,
      imagePath: photoupload,
    });
    let results = await createNewForm.save();
    if (results) {
      res.status(201).json({
        success: true,
        products: results,
        message: "Data inserted successfully",
      });
    } else {
      res
        .status(403)
        .json({ success: false, message: "Internel server error" });
    }
  } catch (error) {
    console.log("got error in bigform fn", error);
  }
};

// signup
export const signup = async (req, res) => {
  let userdata = new userSch(req.body);
  let results = await userdata.save();
  if (results) {
    res.json({ success: true, message: "User signed up successfully" });
  }
  try {
  } catch (error) {
    console.log("Yourhave an error", error);
  }
};

// signin
export const signin = async (req, res) => {
  try {
    let results = await userSch.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (results) {
      res.json({
        success: true,
        data: results,
        message: "User signed in successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Please enter right email and passowrd",
      });
    }
  } catch (error) {
    console.log("Yourhave an error", error);
  }
};

// getProducts
export const getProducts = async (req, res) => {
  let email = req.params.email;

  try {
    let data = await bigformSch.find({ email });
    if (data) {
      res.json({ success: true, data: data, message: "data got successfully" });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    console.log("Yourhave an error", error);
  }
};
