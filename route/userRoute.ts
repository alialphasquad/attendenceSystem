import express from "express";
import {createUser,getUser,updateUser,deleteUser,logInUser} from '../controller/userController';

const router = express.Router();

router.route("/create").post(createUser);
router.route("/get").get(getUser);
router.route("/update").put(updateUser);
router.route("/delete").delete(deleteUser);
router.route("/login").post(logInUser);


export default router;
