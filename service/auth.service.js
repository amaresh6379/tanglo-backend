const {OAuth2Client} = require('google-auth-library');
require('../config');
const client = new OAuth2Client(CONFIG.client_id);
const jwt = require('jsonwebtoken');
const User = require('../models').user;


const userVerify = async function(data){
    if(data && data.query && data.query.idToken){
        const [err,oauthPayload]  = await to(client.verifyIdToken({
            idToken: data.query.idToken,
            audience:CONFIG?.client_id
        })); 
        if(err) return TE(err.message);
        if(oauthPayload  && oauthPayload.payload && oauthPayload.payload.aud && oauthPayload.payload.aud === CONFIG.client_id  && oauthPayload.payload.email_verified) {
            if(oauthPayload.payload.email){
                let userEmail = oauthPayload.payload?.email;
                let userImage = oauthPayload.payload?.picture;
                const [userErr, userDetails] = await to(User.findOne({
                    where:{
                        email: userEmail,
                        isDeleted: false
                    }
                }))
                if(userErr) return TE(userErr.message);
                if(!userDetails){
                    let userDetails = {
                        name : oauthPayload.payload?.name,
                        email: userEmail,
                        image: userImage
                    }
                    const [createUserErr,createUserData] = await to(User.create(userDetails));
                    if(createUserErr) return TE(createUserErr.message);
                    if(createUserData){
                        const getToken = userJwtToken({email:userEmail});
                        return getToken;
                    }
                }
                if(userDetails){
                    const getToken = userJwtToken({email:userDetails.email});
                    return getToken;
                }
            }
        }
    }
    else if(data?.query?.email && data?.query?.password){
        const [userErr, userDetails] = await to(User.findOne({
            where:{
                email: data?.query?.email,
                password:data?.query?.password,
                isDeleted: false
            }
        }))
        if(userErr) return TE(userErr.message);
        if(userDetails){
            const getToken = userJwtToken({email:userDetails.email});
            return getToken;
        }
        if(!userDetails){
            return TE("Invalid user");
        }
    }
    else{
        return TE("Invalid user");
    }

}
const userJwtToken = async function(data){
    let userDetails = {
        email:data.email,
        env: CONFIG.ENVIRONMENT
    }
    return "Bearer " +jwt.sign(userDetails, CONFIG.jwt_encryption, { expiresIn:  CONFIG.jwt_expiration}); 
}
module.exports.userVerify = userVerify;


const getUser = async function(req){
    const [err,data] = await to(User.findOne({
        where:{
            isDeleted: false,
            id: req?.user?.userId
        }
    }))
    if(err) return TE(err.message)
        if(data){
            return data;
        }
}

module.exports.getUser = getUser;



const updateUser = async function(req){
    let body  =  req && req.body;
    const [err,data] = await to(User.update(
        {
            name : body.name,
            email: body.email

        },
        {
            where:{
                id: req?.user?.userId
            }
           
        }
    ))
    if(err) return TE(err.message)
        if(data){
            return data;
        }
}

module.exports.updateUser = updateUser;


