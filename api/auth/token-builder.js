const { JWT_SECRET } = require("../secrets")

module.exports = (user) => {
    const payload = {
        subject: user.user_id,
        role_name: user.role_name,
        username: user.username
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, JWT_SECRET, options)
}