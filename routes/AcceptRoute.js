const Acceptcase = require("../models/AcceptCase-model")
const express=require("express");
var path = require('path');
var fs = require('fs');
const app=express();
const dellist=app.delete('/deleted/:id',function(req,res,next){
    const id=req.params.id;
    Acceptcase.findByIdAndRemove(id).exec()
    res.send("deleted!")



})

module.exports={dellist}