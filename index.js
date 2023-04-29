require("dotenv").config()
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const router = require("./routes/router")
const restRouter = require("./routes/restRouter")
const routerGraph = require("./routes/router-graph")


app.use(express.json())
app.use(cookieParser(""))
app.use(express.static('public'))
app.use(router)
app.use(routerGraph)
app.use(restRouter)


app.post("/",(req,res)=>{
    if(req.headers['content-type']==='application/xml')res.redirect("/soap")
    else res.redirect("/graphql")
})


const port = process.env.PORT||8005;
app.listen(port,()=>{
    console.log(`server is running on port number ${port}`)
})
