const express=require('express');
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Home page");
})

module.exports=route;