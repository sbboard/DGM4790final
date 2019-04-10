const Series = require('../models/series.model')

//list of series
exports.category_list = (req, res, next) => {
    Product.find({category:req.params.cat}).sort('-date').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//members of specific series
exports.category_list = (req, res, next) => {
    Product.find({category:req.params.cat}).sort('-date').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//list all characters that have been assigned to a series
exports.category_list = (req, res, next) => {
    Product.find({category:req.params.cat}).sort('-date').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//create
exports.product_create = (req, res, next) => {
    let name = req.files.img.name;
    req.files.img.mv('/var/www/html/assets/contentImages/'+name)
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
exports.product_update = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body},
        (err, product) => {
        if (err) return next(err)
        res.send("Content updated")
    })
}

//remove person from series
exports.product_delete = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err)
        res.send('Deleted successfully')
    })
}

//everything
exports.whole_list = (req, res, next) => {
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