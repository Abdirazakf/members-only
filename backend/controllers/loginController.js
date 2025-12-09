const passport = require('passport')

exports.authenticateUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info)  => {
        if (err){
            return next(err)
        }

        if (!user){
            return res.status(401).json({
                success: false,
                message: info.message || 'Login failed'
            })
        }

        req.logIn(user, (err) => {
            if (err){
                return next(err)
            }

            return res.json({
                success: true,
                message: 'Login successful',
                user: {id: user.id, username: user.username}
            })
        })
    })(req, res, next)
}