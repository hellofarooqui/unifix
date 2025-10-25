import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "aksdajksdASdajh", {
      expiresIn: "12h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const userProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    return res.status(200).json(user);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const userDetails = async (req, res) => {
  //console.log(req)
  const userId = req.user;
  try {
    const user = await User.findById(req.user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getUsersList = async (req, res) => {
  try {
    const users = await User.find().select({ name: 1, email: 1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
