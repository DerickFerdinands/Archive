 const User = require('../model/User');
const {encodePassword, comparePassword} = require('../security/passwords');
const {response} = require('express');
const {ROLES} = require('../security/roles');
const req = require('express/lib/request');
const res = require('express/lib/response');
const {generateAccessToken, generateTokens} = require("../security/tokens");

const saveUser = async (req, res) => {

    const tempUser = new User({...req.body.user});
    console.log(req.body.user)

    const user = await User.findOne({userEmail: tempUser.userEmail});

    try {

        if (user == null) {
            const tokens = generateTokens(tempUser.toJSON())

            tempUser.userPassword = await encodePassword(tempUser.userPassword);
            tempUser.userRole = ROLES.USER;
            tempUser.userRefreshToken = tokens.refreshToken;

            await tempUser.save()
                .then(() => {
                    res.status(201).json({message: "Saved", tokens: tokens})
                })
                .catch((err) => {
                    res.status(500).json({message: err})
                })

        } else {
            res.status(409).json({message: "User Already Exists!"})
        }

    } catch (err) {
        console.log("Error", err);
    }


}

const loginUser = async (req, res) => {
    const reqUser = req.body.user;

    await User.findOne({userEmail: reqUser.userEmail})
        .then(async (response) => {
            if (response !== null && await comparePassword(reqUser.userPassword, response.userPassword) === true) {
                res.status(200).json({
                    message: "Logged In",
                    data: {
                        accessToken: generateAccessToken(response.userRefreshToken),
                        refreshToken: response.userRefreshToken
                    }
                })
            } else {
                res.status(404).json({message: "User Not Found!"})
            }
        })
        .catch((err) => {
            res.status(500).json({message: err});
        })
}

const findUser = async (req, res) => {
    await User.findOne({userEmail: req.params.email})
        .then((response) => {
            response !== null ?
                res.json({
                    userFirstName: response.userFirstName,
                    userLastName: response.userLastName,
                    userAddress: response.userAddress,
                    userEmail: response.userEmail,
                    userContactNumber:response.userContactNumber
                })
                :
                res.status(404).json({message: "User Not Found!"})
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
}

const deleteUser = async (req, res) => {
    await User.findOne({userEmail: req.params.email})
        .then(async (response) => {
            response !== null ?
                await User.deleteOne({userEmail: req.params.email})
                    .then(() => {
                        res.json({message: "User deleted!"});
                    })
                    .catch(err => res.status(500).json({message: err}))
                :
                res.status(404).json({message: "User Not Found"})
        })
        .catch(err => res.status(500).json(err))

}

const updateUser = async (req,res) => {
    const user = req.body.user;
    await User.findOneAndUpdate({userEmail:user.userEmail}, {$set: {...user}})
        .then((response) =>{
            response !== null ?
                res.json({message: "User Updated!",response})
                :
                res.status(404).json({message: "User Not Found"})
        })
        .catch((err)=>res.status(500).json(err))
}

module.exports = {
    saveUser,
    loginUser,
    findUser,
    deleteUser,
    updateUser
}