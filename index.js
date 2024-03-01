const express = require("express");
const{connectToMongoDB} = require("./connect");
const urlRoute = require("./routes/url");
const URL = require('./models/url');
const app = express();
const PORT =8001;
 connectToMongoDB("mongodb+srv://satvikagrawal3004:Agrawal75@mydb.btc81am.mongodb.net/shorturlß?retryWrites=true&w=majority&appName=mydb")
 .then(() => console.log('Mongodb connected'))
 app.use(express.json());
app.use("/url", urlRoute);

app.get('/:shortid', async (req, res)=>{
   const shortid =req.params.shortid;
   const entry = await URL.findOneAndUpdate({
      shortid
   }, {
    $push:{
    visithistory:{ 
        timestamp: Date.now(),
    }
   }, });
   res.redirect(entry.redirectURL);
})
app.listen(PORT, ()=> console.log(`Server started at port:${PORT} `)) 