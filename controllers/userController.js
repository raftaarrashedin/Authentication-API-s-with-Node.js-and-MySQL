const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require('../config/dbConnection')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

const register = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
            req.body.email
        )});`,

        (error,result) => {
            if(result && result.length){
                return res.status(409).send({
                    msg :'This user is already in use!'
                });
            }
            else{
                bcrypt.hash(req.body.password, 10, (error,hash) => {
                    if(error){
                        // throw error;
                        // console.log(error)
                        return res.status(401).send({
                            msg : "Kya baat h ye, kiu nh hora insert",
                            msg:error
                        });
                    }else{
                        db.query(
                            `INSERT INTO users (name,email,password) VALUES('${req.body.name}',${db.escape(
                                req.body.email
                            )}, ${db.escape(hash)});`,
                            (error,result) => {
                                if(error) {
                                    return res.status(404).send({
                                        msg:error
                                    })
                                }
                                return res.status(500).send({
                                    msg: 'Successfully, The user has been registered!'
                                })
                            }
                        );
                    }
                });
            }
        }
    );
}

const login = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err,result) =>{
            if(err){
                return res.status(400).send({
                    msg : "Email or Password is incorrect!"
                });
            }
            if(!result.length){
                return res.status(401).send({
                    msg : "Email or Password is incorrect!"
                });
            }

            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    if(bErr){
                        return res.status(402).send({
                            msg : "Email or Password is incorrect!"
                        });
                    }
                    if(bResult){
                        // console.log(JWT_SECRET);
                        const token = jwt.sign({id:result[0]['id'], is_admin:result[0]['is_admin']}, JWT_SECRET,{expiresIn:'1h'});
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = ${result[0]['id']}`
                        )

                        return res.status(200).send({
                            msg:"LoggedIn",
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(404).send({
                        msg : "Email or Password is incorrect!"
                    });
                }
            )
        }
    )
}

module.exports = {
    register,
    login
}