const {Router} = require('express')
const circleRouter = Router()
const {getUsersCircles, createCircle, joinCircle} = require('../controllers/circleController')

circleRouter.get('/list', getUsersCircles)
circleRouter.post('/create', createCircle)
circleRouter.post('/join', joinCircle)

module.exports = circleRouter