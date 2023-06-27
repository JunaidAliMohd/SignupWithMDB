const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
let mongoose = require("mongoose");
let path = require("path");
let dotenv = require("dotenv");

dotenv.config();

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads')
  },
    filename: (req, file, cb) => {
        console.log(file);
    
      cb(null,Date.now()+"_"+file.originalname);
  }
})

const upload = multer({ storage: storage })


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,"./client/build")));


let employeeSchema = new mongoose.Schema({
    name: String,
    mobileNo: String,
    age: Number,
    email: String,
    password: String,
    profilePic:String,

});

let Employee = new mongoose.model("employee",employeeSchema);



app.post("/signup",upload.single("profilePic"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    let profilePicPath = `${req.file.destination}/${req.file.filename}`;

    let query = `insert into users (name,mobileNo,age,email,password,profilePic)values('${req.body.name}','${req.body.mobileNo}',${req.body.age},'${req.body.email}','${req.body.password}',${profilePicPath},)`;
    
    console.log(query);

    

        

    

    let UserData = await  Employee({
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        profilePic: profilePicPath,
    });
    
    console.log("saved to db successfully");

    let results = await Employee.insertMany([UserData]);
    
    return res.json(results)
    
    
})

app.listen(4567, () => {
    console.log(`listening to port 4567`);
})




let connectToMDB = async () => {
    try {
        await mongoose.connect(process.env.mdburl);

        console.log("connected to mdb");
    } catch {
        console.log("unable to connet to mdb");
    }
};







connectToMDB();


 


