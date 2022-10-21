const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const userRoute = require("./route/userRoute.ts");
const attendanceRoute = require("./route/attendanceRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port =process.env.PORT || 5000;
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log("yo");
});
