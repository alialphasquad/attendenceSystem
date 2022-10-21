import express, { Express, Request, Response } from "express";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

module.exports.createUser = async (req: Request, res: Response) => {
  try {
    var hashedPassword = bcrypt.hashSync(
      req.body.password,
      Number(process.env.SALT)
    );
    const user: any = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        lastLogin: new Date(),
        createdAt: new Date(),
        role: req.body.role
      },
    });
    let tokenGenerator = {
      id: user.id,
      email: user.email,
      name: user.username,
    };
    let token = jwt.sign(tokenGenerator, process.env.SECRET, {
      expiresIn: "1y",
    });
    let data = {
      userId: user.id,
      token: token,
    };
    res.status(200).send({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports.getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).send({
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports.updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username: req.body.username,
        email: req.body.email,
      },
    });
    res.status(200).send({
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports.deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send({
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.logInUser = async (req: Request, res: Response) => {
  try {
    let { id, password , role} = req.body;
    let user: any = await prisma.user.findFirst({
        where: { id: id },
      });
  
      if (user !== null) {
        if ((await bcrypt.compare(password, user.password)) === true) {
          let tokenGenerator = {
            id: user.id,
            email: user.email,
            name: user.first_name,
            role:user.role
          };
          let token = jwt.sign(tokenGenerator, process.env.SECRET, {
            expiresIn: "1y",
          });
          let data = {
            user_id: user.id,
            token: token,
          };
          let updateLastLogin = await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
                lastLogin: new Date(),
            },
          });
          res.status(200).json({
            success: true,
            data: data,
          });
        } else {
          res.status(403).json({
            success: false,
            message: "Invalid password",
          });
        }}
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
