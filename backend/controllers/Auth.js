const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.SignUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.status(400);
      res.json({ success: false, message: "User already exists , Please Login" });
      return;
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const user = userModel.create({
          name,
          email,
          password: hash,
        });
        res.status(201);
        let token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        res.json({ success: true });
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.SignIn = async (req , res) => {
    try {
        let { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .send({ message: "Invalid username or password", success: false });
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              let token = jwt.sign({ email, id: user._id }, JWT_SECRET);
              res.cookie("token", token);
              res.status(200).json({ message: "Sifn successful", success: true });
            } else {
              return res.send({
                message: "Invalid username or password",
                success: false,
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({ message: error.message, success: false });
      }
}
