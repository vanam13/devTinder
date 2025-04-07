const adminauth = (req,res,next)=>{
    console.log("admin auth getting checked");
    const token = 'abc';
    const isadminauth = token === 'abc';
    if (!isadminauth){
        res.status(410).send('unauthorized for admin');
    }
    else{
        next();
    }
}

const userauth = (req,res,next)=>{
    console.log("user auth getting checked");
    const token = 'abc';
    const isadminauth = token === 'abc';
    if (!isadminauth){
        res.status(410).send('unauthorized for user');
    }
    else{
        next();
    }
}

module.exports = {adminauth, userauth}