const mongoose = require('mongoose');

const Connection = async(username,password)=>{
    const URL = `mongodb+srv://vishal032a:vishal032a@cluster0.fomyegu.mongodb.net/CMS?retryWrites=true&w=majority`

    try{
        await mongoose.connect(URL);
        console.log('database connected successfully')
    }catch(error){
        console.log(`error while connecting error:${error}`)
    }
};
