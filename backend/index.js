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
        if(!fs.existsSync(`./uploads/${req.params.user_id}`)){
            fs.mkdir(`./uploads/${req.params.user_id}`,(err)=>{
                if(err)
                console.log(err);
            });
        }
        fs.mkdir(`./uploads/${req.params.user_id}/${req.params.content_id}`,(err)=>{
        })
        return callback(null, `./uploads/${req.params.user_id}/${req.params.content_id}`);
    },
    filename: (req, file, callback) => {
      const filename = `${file.originalname}`;
      return callback(null, filename);
    },
  });
  

const upload = multer({storage});

app.post('/upload/:user_id/:content_id', upload.any('files'), (req, res) => {
    res.send({result:'Files uploaded successfully'});
});

app.post('/add-content',async (req,res)=>{
    let content = new Content(req.body);
    let result = await content.save();
    res.send(result);
})

app.get('/content',async (req,res)=>{
    contents = await Content.find();
    if(contents.length>0){
        res.send(contents);
    }
    else{
        res.send({result:"no content in db"});
    }
})

app.delete('/delete/:user_id/:content_id',async (req,res)=>{
    const result = await Content.deleteOne({_id:req.params.content_id});
    fs.rm(`./uploads/${req.params.user_id}/${req.params.content_id}`,{recursive:true},(err)=>{
        if(err)
        console.log(err);
    })
    res.send(result);
})

// app.delete('/delete/:id1/:id2',(req,res)=>{
//     console.log(req.params.id1);
//     console.log(req.params.id2)
//     res.send({result:"recieved"});
// })
app.listen(5000);