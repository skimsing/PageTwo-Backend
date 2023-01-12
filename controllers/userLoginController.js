//imports 
const bcrypt = require('bcrypt');
const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const {createAccessToken} = require('../auth');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


//USER LOGIN
module.exports.loginUser = (req, res) =>{
    knex("users")
    .where({username: req.body.username})
    .then((result)=> {
        const data = {
            username: req.body.username
        }
        const token = jwt.sign(data, JWT_SECRET)
        
        res.json({
            message: "login success",
            token: token
        })
    })
    .catch((err)=>{
        res.status(400).send('Unable to log user in. Try again later', err);
    })
}

//GET ALL USERS
module.exports.getAllUsers = (req, res) => {
    knex("users")
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).send("cant find users")
    });
}
//get user profile
// module.exports.getUserProfile = (req, res) =>{
//     if(req.user){
//         req.json({user: req.user})
//     }
// }

//get single user by id
module.exports.getSingleUser = (req, res) => {
    knex("users")
    .where({userid: req.params.userid})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).send(`Error: can't get user ${req.params.userid}`)
    })
}

//register users
module.exports.registerUser = (req, res) => {
    if(
        !req.body.username ||
        !req.body.password ||
        !req.body.email
    ){
        return(res.status(400).send({message: `please fill out all the required fields`}))
    }
    if(knex("users").where("userid", req.body.userid)){
        return(res.status(400).send({message: `Username already exists. Please choose a different username`}))
    }

    const newUser = {
        userId:uuid(),
        ...req.body,
    }

    knex("users")
    .insert(newUser)
    .then((data) =>{
        res.status(200).json({success: true});
    })
    .catch((err)=>{
        res.status(500).send(`could not add new user: try again later`);
    })
}
// module.exports.registerUser = (req, res) => {
//     if(
//         !req.body.username ||
//         !req.body.password ||
//         !req.body.email
//     ){
//         return(res.status(400).send({message: `please fill out all the required fields`}))
//     }

//     const hashedPass = bcrypt.hashSync(req.body.password, 10);

//     const newUser = {
//         userId:uuid(),
//         ...req.body,
//         password: hashedPass
//     }
//     if(knex("users").filter((user) => user.userId === req.body.userid)){
//         return(res.status(400).send({message: `Username already exists. Please choose a different username`}))
//     }
//     knex("users")
//     .insert(newUser)
//     .then((data) =>{
//         res.status(200).json({success: true});
//     })
//     .catch((err)=>{
//         res.status(500).send(`could not add new user: try again later`);
//     })
// }
//user login
// module.exports.loginUser = (req, res) => {
//     //auth

//     knex("users")
//     .where({username: req.body.username})
//     .then((result) =>{
//         if(result !== null){
//             const isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);
            
//             if(isPasswordCorrect){
//                 return(res.status(200).send({accessToken: createAcessToken(result)}))
//             } else{
//                 res.status(400).send({message: 'Error: Username and/or password is incorrect'})
//             }
//         } else {
//             return res.status(400).send({message: 'No user found'})
//         }
//     })
//     .catch((err)=>{
//         res.status(400).send({message: 'Unable to log user in. Try again later'}, err);
//     })
// }

