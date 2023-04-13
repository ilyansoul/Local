const {sign, verify} = require('jsonwebtoken')
let secretKey = process.env.secret;

const createToken = (user, token) => {
    const accessToken = sign({username : user.name, id: user.id }, secretKey)

    return accessToken;
}

const validateToken = (req , res , next) => {
    const accessToken = req.cookies['access_token'];
    console.log(accessToken);

    if(!accessToken) {
     return res.status(400).json({err: 'User not Authenticated'})
    };
    try {
        const validToken = verify(accessToken, secretKey);
        if(validToken) {
 req.authenticated = true;
 return next();
    }
}
catch(err) {
    return res.status(400).json({err: err.message})
}
}

module.exports = {createToken , validateToken}