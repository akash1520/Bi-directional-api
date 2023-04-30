require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose");
const app = express()
const cookieParser = require("cookie-parser")
const router = require("./routes/router")
const restRouter = require("./routes/restRouter")
const routerGraph = require("./routes/router-graph")
const jwt = require('jsonwebtoken');

mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = mongoose.connection;
  
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });

app.use(express.json())
app.use(cookieParser(""))
app.use(express.static('public'))
app.use(router)
app.use(routerGraph)
app.use(restRouter)


app.post("/",(req,res)=>{
    
  try{  const tokenData = jwt.verify(req.headers['authorization'],process.env.PRIVATE_KEY)
    const user = tokenData.user.id

    if(user==='45361'){
        if(req.headers['content-type']==='application/xml')res.redirect("/soap")
    else if(req.headers['type']==='graphql')res.redirect("/graphql")
    else res.redirect("/rest")}
    else{
        res.send("Wrong credenitals")
    }}
    catch(error){
        res.send("Wrong credenitals")
    }
})


const port = process.env.PORT||8005;
app.listen(port,()=>{
    console.log(`server is running on port number ${port}`)
})
