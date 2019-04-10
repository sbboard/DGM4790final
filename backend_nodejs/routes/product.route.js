const express = require('express')
const router = express.Router()

const series_controller = require('../controllers/series.controller')

//list of series
router.get('/list/series', series_controller.series_list)

//members of specific series
router.get('/:series/characters', series_controller.member_list)

//list all characters that have been assigned to a series
router.get('/list/characters', series_controller.all_chars)

//create
router.post('/create', series_controller.series_create)

//assign person to series
router.put('/:id/update', series_controller.person_assign)

//remove person from series
router.delete('/:id/delete', series_controller.person_remove)

//everything
router.get('/', series_controller.everything)

module.exports = router