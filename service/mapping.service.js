const UserDayMapping =require('../models').userDayMapping;
const UserSectionMapping =  require('../models').userSectionMapping;

const createUserDayMapping = async function(req){
    let body = {
        userId :  req && req.user && req.user.userId,
        dayId : req && req.params && req.params.dayId,
        isDeleted :  false
    };
    const [dayErr,dayDetails] = await to(UserDayMapping.create(body));
    if(dayErr) return TE(dayErr.message);
    console.log(dayDetails);
    if(dayDetails) return dayDetails;
}  
module.exports.createUserDayMapping = createUserDayMapping;

const createUserSectionMapping = async function(req){
    let body = {
        userId :  req && req.user && req.user.userId,
        sectionId :  req && req.params && req.params.sectionId,
        isDeleted :  false
    }
    const [UserSectionMappingErr,UserSectionMappingData] = await to(UserSectionMapping.create(body));
    if(UserSectionMappingErr) return TE(UserSectionMappingErr.message);
    if(UserSectionMappingData) return UserSectionMappingData;
}
module.exports.createUserSectionMapping = createUserSectionMapping;


const getCompletedSectionDetails = async function(req){
    const [UserSectionMappingErr,UserSectionMappingData] = await to(UserSectionMapping.findAll({
        where:{
            userId : req && req.user && req.user.userId,
            isDeleted : false
        }
    }));
    if(UserSectionMappingErr) return TE(UserSectionMappingErr.message);
    if(UserSectionMappingData) return UserSectionMappingData;
}
module.exports.getCompletedSectionDetails = getCompletedSectionDetails;



const getCompletedDays = async function(req){
    const [UserSectionMappingErr,UserSectionMappingData] = await to(UserDayMapping.findAll({
        where:{
            userId : req && req.user && req.user.userId,
            isDeleted : false
        }
    }));
    if(UserSectionMappingErr) return TE(UserSectionMappingErr.message);
    if(UserSectionMappingData) return UserSectionMappingData;
}
module.exports.getCompletedDays = getCompletedDays;