import express from "express";
import multer from "multer";
import {
  getPosts,
  addPost,
  getPostById,
  editPost,
  deletePost,
  bigform,
  signup,
  signin,
  getProducts
} from "../controller/post-controller.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage, dest: "uploads/" });
const router = express.Router();
router.get("/", getPosts);
router.post("/add", addPost);
router.get("/:id", getPostById);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
router.post("/bigform", upload.single("image"), bigform);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getProducts/:email", getProducts);

export default router;
