const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();

const Image = require('../models/image');

router
    .get('/', (req, res, next) => {
        Image.find({}).lean()
            .then(images => {
                if (!images || images.length === 0) {
                    // console.log('No images found');
                    next({code: 404, message: 'No images found.'});
                }
                else res.send(images);
            })
            .catch(next);        
    })

    .get('/:id', (req, res, next) => {
        let imageId = req.params.id;

        Image.findById(imageId).lean()
        .then(image => {
            if (!image) {
                next({code: 404, message: 'No image found.'});
            }
            res.send(image);            
        })
        .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Image(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })
    
    .delete('/:id', (req, res, next) => {
        let imageId = req.params.id;
        console.log('delete of image with id:', imageId);
        Image.findByIdAndRemove(imageId)
            .then(removed => res.send(removed))
            .catch(next);
    });

module.exports = router;
