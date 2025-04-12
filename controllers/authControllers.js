const { response } = require("express");
const UserData = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const { generateJWToken } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  

  try {
    let existingUser = await UserData.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({
        ok: false,
        msg: "El correo electrónico ya está registrado",
      });
    }


    const userDatos = new UserData(req.body);
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    userDatos.password = bcrypt.hashSync(password, salt);
    await userDatos.save();

    // generate jwt
    const token = await generateJWToken(userDatos.id, userDatos.name);

    res.status(201).json({
      ok: true,
      msg: "User created successfully",
      uid: userDatos.id,
      name: userDatos.name,
      email: userDatos.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let existingUser = await UserData.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        ok: false,
        msg: "Credentials are not valid",
      });
    }
    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        msg: "Credentials are not valid",
      });
    }

    const token = await generateJWToken(existingUser.id, existingUser.name);

    res.status(201).json({
      ok: true,
      msg: "Login successfully",
      uid: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      token: token,
    });
  } catch (error) {
    
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const renewToken = async (req, res = response) => {
  const { uid, name } = req;
  // Generar JWT

  const token = await generateJWToken(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    msg: "Token re-new successfully",
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
