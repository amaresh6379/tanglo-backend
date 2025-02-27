const Content  =  require('../models').content;
const mistake = require('../models').mistake;

const getParicularSectionContent = async function(req){
    const [contentErr,contentDetails] = await to(Content.findAll({
        where:{
            isDeleted:false,
            sectionId:req?.params?.id
        },
        include:[
            {
                model: mistake,
                required: false,
            }
        ]
    }));
    if(contentErr) return TE(contentErr.message);
    contentDetails.sort((a,b) =>  a.index -  b.index);
    if(contentDetails) return contentDetails;
}
module.exports = {getParicularSectionContent};