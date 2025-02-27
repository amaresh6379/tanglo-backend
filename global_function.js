pe = require('parse-error');

//  To return error format.
TE = function(err){
    throw new Error(err);
}

// To format the output data.
to = function(promise){
    return promise.then((data)=>{
        return [null,data];
    }).catch((err)=>{
        return [pe(err)]
    })
}

// Return error data.
ReE = function(res,err,code){
    if(code) res.statusCode = code;
    return res.json({error: err,success:false});
}

// Return success data.
ReS = function(res,data,code){
    if(data && typeof(data) == 'object'){
        data = Object.assign(data,{success: true});
    }
    if(code) res.statusCode = code;
    return res.json(data);
}