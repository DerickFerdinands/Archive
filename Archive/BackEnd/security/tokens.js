const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
    return {
        accessToken: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '604800s'}),
        refreshToken: jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    }
}

const generateAccessToken = (refreshToken) => {
    const user = verifyRefreshToken(refreshToken);
    if (user !== null)
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '604800s'})
    else
        return null;
}

const verifyAccessToken = (token) => {
    let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return null;
        return user;
    })
    return user;
}

const verifyRefreshToken = (token) => {
  let user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return null;
        return user;
    })
    return user;
}

module.exports = {
    generateTokens,
    generateAccessToken,
    verifyAccessToken,
    verifyRefreshToken
}