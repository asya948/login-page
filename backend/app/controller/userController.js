export function  profile(req, res) {
    res.json({
        message: "user profile",
        user: req.user,
    })
}
export function  changePassword(req, res) {
    res.json({
        message: " changed password",
    })
}