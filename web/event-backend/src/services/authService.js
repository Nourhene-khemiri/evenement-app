const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw { status: 400, message: "Tous les champs sont requis" };
  }

  if (password.length < 6) {
    throw { status: 400, message: "Mot de passe trop court" };
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw { status: 409, message: "Email déjà utilisé" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user.toJSON());

  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 401, message: "Identifiants incorrects" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw { status: 401, message: "Identifiants incorrects" };
  }

  const token = generateToken(user.toJSON());

  const { password: _, ...userSafe } = user.toJSON();

  return { user: userSafe, token };
};

const getMe = async (userId) => {
  return await User.findByPk(userId, {
    attributes: ["id", "name", "email", "createdAt"],
  });
};

module.exports = {
  register,
  login,
  getMe,
};
