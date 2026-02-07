export function  profile(req, res) {
    if(req.session.user){
        return res.json(req.session.user)
    }else{
        res.json({
            message: 'not logged in',
        })


    }
}
export function  changePassword(req, res) {
    if (!req.session.user) {
        return res.status(401).json({
            ok: false,
            message: 'Not logged in'
        })
    }

    res.json({
        ok: true,
        message: 'You can change password',
        user: req.session.user
    })
}