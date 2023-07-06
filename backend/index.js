const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
require("./db/config")
const Content = require("./db/Contents")
const User = require("./db/User");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));



app.post("/register",async (req,res)=>{
    const user = new User(req.body);
    let result = await user.save();

    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login",async (req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            res.send(user);
        }
        else{
            res.send({result:"no user found"})
        }
    }
    else{
        res.send({result:"please fill all the fields"})
    }
    
})

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if(!fs.existsSync(`./uploads/${req.params.id}`)){
            fs.mkdir(`./uploads/${req.params.id}`,(err)=>{
                if(err)
                console.log(err);
                else
                console.log("directory created successfully")
            });
        }
        return callback(null, `./uploads/${req.params.id}`);
    },
    filename: (req, file, callback) => {
      const filename = `${file.originalname}`;
      return callback(null, filename);
    },
  });
  

const upload = multer({storage});

app.post('/upload/:id', upload.any('files'), (req, res) => {
    console.log(req.files)
    res.send({result:'Files uploaded successfully'});
});

app.post('/add-content',async (req,res)=>{
    let content = new Content(req.body);
    let result = await content.save();
    res.send(result);
})

app.listen(5000);