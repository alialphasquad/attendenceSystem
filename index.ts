import express from 'express';
import userRoute from './route/userRoute';
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = 9000
app.use(express.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(cors());
app.use(bodyParser.json());
app.use('/user',userRoute);
app.get('/',(req:any,res:any) => {
    res.send("Welcome to Home Page");
    console.log("yo")
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    console.log("yo")
});