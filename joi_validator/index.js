const express = require('express');
const app = express();

const joi = require("joi");

const schema = joi.object({
    username : joi.string().alphanum().min(3).max(30).required(),
    password : joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email : joi.string().email({
        minDomainSegments : 2,
        tlds : {allow : ["com","net","edu"]}
    })
});

const data = {
    username : "rafu123",
    password : "123456",
    email : "rafu@gmail.com"
}

const result = schema.validate(data)

if(result.error) {
    console.error(result.error.details)
}else{
    console.log("Data is Valid!")
}
