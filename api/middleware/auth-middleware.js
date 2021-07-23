const User = require('../users/users-model')

function checkPayload (req, res, next) {
    const { username, password } = req.body
    if (!username || !password){
        res.status(401).json({
            message: 'missing required fields'
        })
    } else if (passord.length < 3){
        res.status(422).json({
            message: 'password needs to be 3 chars or longer'
        })
    } else {
        next()
    }
}

async function checkUsernameFree (req, res, next) {
    try {
        const users = await User.findBy({ username: req.body.username })
        if (!users.length){
            next()
        } else {
            next({
                status: 422,
                message: 'username taken'
            })
        }
    } catch (err){
        next(err)
    }
}

async function checkUsernameExists (req, res, next){
    try {
        const users = await User.findBy({ username: req.body.username})
        if (users.length){
            req.user = users[0]
            next()
        } else {
            next({
                status: 401,
                message: 'Invalid credentials'
            })
        }
    } catch (err){
        next(err)
    }
}

module.exports = {
    checkPayload,
    checkUsernameFree,
    checkUsernameExists
}