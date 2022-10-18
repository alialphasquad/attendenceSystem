import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import userRoute from "./route/userRoute";
import attendanceRoute from "./route/attendanceRoute";
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = 9000;
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Attendance System",
      version: "1.0.0",
      description: " API",
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
    ],
  },
  apis: ["./route/*.ts"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/attendance", attendanceRoute);
app.get("/", (req: any, res: any) => {
  res.send("Welcome to Home Page");
  console.log("yo");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  console.log("yo");
});
