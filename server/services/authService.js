import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Hash a user's password before saving it.
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

// Compare the entered password with the stored hash.
export const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Generate an authentication token.
export const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Verify an authentication token.
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
