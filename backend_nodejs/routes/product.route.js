const express = require('express')
const router = express.Router()

const series_controller = require('../controllers/series.controller')

//list of series
router.get('/list/series', series_controller.person_list)

//members of specific series
router.get('/:series/characters', series_controller.person_list)

//list all characters that have been assigned to a series
router.get('/list/characters', series_controller.person_list)

//create
router.post('/create', series_controller.product_create)

//assign person to series
router.put('/:id/update', series_controller.product_update)

//remove person from series
router.delete('/:id/delete', series_controller.product_delete)

//everything
router.get('/', series_controller.whole_list)

module.exports = router