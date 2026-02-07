export default function auth(req, res, next) {
    const isLoggedIn = true

    if(!isLoggedIn) {
        return res.status(401).json({
            message: 'unauthorized',
        })
    }

    next()
}