import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const nodemailer = require("nodemailer");
const prisma = new PrismaClient();

export const addAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await prisma.attendance.create({
      data: {
        date: new Date(),
        presentStatus: req.body.presentStatus,
        userId: req.body.userId,
      },
    });
    if(attendance){
      sendEmail(); // Call Send Email Function
    }
    res.status(200).send({
      data: attendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getUserAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attendance = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        attendance: true,
      },
    });
    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const summary = async (req: Request, res: Response) => {
  try {
    const attendance = await prisma.user.findMany({
      include: {
        attendance: true,
      },
    });
    res.status(200).send({
      data: attendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let attendance = await prisma.attendance.update({
      where: {
        id: Number(id),
      },
      data: {
        presentStatus: req.body.presentStatus,
        userId: req.body.userId,
      },
    });
    res.status(200).send({
      data: attendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Function for send Email
const sendEmail = () => {
  try {
    var from = "muhammadali.alphasquad@gmail.com";
    var to = "rizwan.alphasquad@gmail.com";
    var subject = "Attendance";
    var text = " ";
    var html = " ";
    const mailOption = {
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      auth: {
        user: process.env.USER,
        password: process.env.PASSWORD,
      },
    });
    transporter.sendMail(mailOption, function (err: any, info: any) {
      if (err) {
        console.log(err);
      } else {
        console.log("Send Email")
      }
    });
  } catch (error) {
    return error;
  }
};
