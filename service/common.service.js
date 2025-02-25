const Hint  =   require('../models').hint;
const Mistake  =  require('../models').mistake;
const Content  =  require('../models').content;
const Score  =  require('../models').score;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const getSectionHint =  async function(req){
    const [hintErr,hintData] =  await to(Hint.findAll({
        where:{
            sectionId : req && req.query && req.query.sectionId,
            isDeleted :  false
        }
    }));
    if(hintErr) return TE(hintErr.message);
    if(hintData) return hintData;

}
module.exports.getSectionHint = getSectionHint;

const getContentMistake =  async function(req){
    const [mistakeErr,mistakeData] =  await to(Mistake.findAll({
        where:{
            contentId : req && req.query && req.query.contentId,
            isDeleted :  false
        }
    }));
    if(mistakeErr) return TE(mistakeErr.message);
    if(mistakeData) return mistakeData;

}
module.exports.getContentMistake = getContentMistake;


const checkMistakes =  async function(req){
    let body =  req && req.body;
    let orginalArray = [];
    let answerArray = [];
    let str = '';
    let arrayValue ;
    
    const [contentErr,contentData] =  await to(Content.findOne({
        where:{
            id : req && req.params && req.params.contentId,
            isDeleted : false
        }
    }));
    if(contentErr) return TE(contentErr.message);
    
    if(contentData && contentData.content){
        orginalArray = contentData.content.split(' ');
    }
    if(body && body.answer){
        answerArray =  body.answer.split(' ');
    }
    let counter  = 0;

    if(answerArray.length >= orginalArray.length){
        arrayValue =  answerArray;
    }
    else{
        arrayValue = orginalArray;
    }
    console.log("arrayValue",arrayValue);
    
    if(arrayValue && arrayValue.length){
        for(let i = 0 ; i < arrayValue.length ;i++){
            console.log("i",i);
            if(answerArray && answerArray[i] && orginalArray && orginalArray[i] && (answerArray[i].toLowerCase() ==  orginalArray[i].toLowerCase())){
                console.log("correct................");
                
                counter++;
                str += i == arrayValue.length - 1 ? answerArray[i] :answerArray[i] + ' ';
            }
            else{
                console.log("answerArray",answerArray[i])
                str += (i == arrayValue.length - 1) ? (answerArray[i] ? ('${' +  answerArray[i] + '}' + ' '  + orginalArray[i])  : (orginalArray[i])) :  (answerArray[i] ? ('${' + answerArray[i] +'}' +' ' + orginalArray[i] + ' ')  : orginalArray[i] + ' ');
                console.log("str",str);
                
            }
        }
        let percentage =  (100 * counter)/orginalArray.length;        
        let [scoreErr,scoreTitle] = await to(checkScore({percentage}));
        if(scoreErr) return TE(scoreErr.message);
        
        if(scoreTitle) {
            scoreTitle.dataValues['answer']  =  str;
            return scoreTitle;
        } 

    }
    }

module.exports.checkMistakes = checkMistakes;

const checkScore =  async function(data){
    let percentage =  data && data.percentage;
    const  [ scoreErr,scoreData] =  await to(Score.findOne({
        where :{
            percentageRange :{ [Op.lte]: percentage }
        }
    }));
    if(scoreErr) return TE(scoreErr.message);
    if(scoreData) return scoreData;
}

module.exports.checkScore =  checkScore;