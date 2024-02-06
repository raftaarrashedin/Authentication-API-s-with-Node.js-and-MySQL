const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require('../config/dbConnection')

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
                        return res.status(400).send({
                            msg : error
                        });
                    }else{
                        db.query(
                            `INSERT INTO users (name,email,password) VALUES('${req.body.name}',${db.escape(
                                req.body.email
                            )}, ${db.escape(hash)});`,
                            (error,result) => {
                                if(error) {
                                    return result.status(400).send({
                                        msg:error
                                    })
                                }
                                return result.status(500).send({
                                    msg: 'The user has been registered!'
                                })
                            }
                        );
                    }
                })
            }
        }
    );
}

module.exports = {
    register
}