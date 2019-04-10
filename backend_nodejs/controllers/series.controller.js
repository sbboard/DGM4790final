const Series = require('../models/series.model')

//list of series
exports.series_list = (req, res, next) => {
    Product.find({category:req.params.cat}).sort('-date').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//members of specific series
exports.member_list = (req, res, next) => {
    Product.find({category:req.params.cat}).sort('-date').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//list all characters that have been assigned to a series
exports.all_chars = (req, res, next) => {
    Product.find({category:req.params.cat}).sort('-date').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//create
exports.series_create = (req, res, next) => {
    let product = new Product({
        title: req.body.title,
        subtitle: req.body.subtitle,
        img: name,
        url: req.body.url,
        category: req.body.category,
        date: Date(),
        series: req.body.series
    })

    product.save((err) => {
        if (err){
            return next(err)
        }
        res.send('Content Posted')
    })
}

//assign person to series
exports.person_assign = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body},
        (err, product) => {
        if (err) return next(err)
        res.send("Content updated")
    })
}

//remove person from series
exports.person_remove = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err)
        res.send('Deleted successfully')
    })
}

//everything
exports.everything = (req, res, next) => {
    Product.find({}).sort('-date').exec((err,personList) => {
        if (err) return next(err)
        if(isNaN(req.params.num)){
            res.send(personList)
        }
        else{
            res.send(personList.slice(0,req.params.num))
        }
    })
}