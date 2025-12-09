exports.checkAuth = (req, res) => {
    if (req.isAuthenticated()){
        return res.json({
            auth: true,
            user: {
                id: req.user.id,
                email: req.user.email,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                is_member: req.user.is_member,
                is_admin: req.user.is_admin
            }
        })
    } else {
        return res.json({
            auth: false,
            user: null
        })
    }
}

exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err){
            return res.status(500).json({
                success: false,
                message: 'Error: Could not log out'
            })
        }
        res.json({
            success: true,
            message: 'Logged out successfully'
        })
    })
}