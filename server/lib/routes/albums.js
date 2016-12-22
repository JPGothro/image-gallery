const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();

const Album = require('../models/album');
const Image = require('../models/image');

router
    .get('/', (req, res, next) => {
        Album.find({}).lean()
            .then(albums => {
                if (!albums || albums.length === 0) {
                    next({code: 404, message: 'No albums found.'});
                }
                else {
                    res.send(albums);
                };
            })
            .catch(next);        
    })

    .get('/:id', (req, res, next) => {
        let albumId = req.params.id;

        Promise
            .all([
                Album.findById(albumId).lean(),
                Image.find({albumId}).select('title description url').lean()
            ])
        .then(([album, images]) => {
            if (!album) {
                next({code: 404, message: 'No album found.'});
            }
            album.images = images;
            res.send(album);            
        })
        .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Album(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })
    
    .delete('/:id', (req, res, next) => {
        let albumId = req.params.id;
        Album.findByIdAndRemove(albumId)
            .then(removed => res.send(removed))
            .catch(next);
    });

module.exports = router;
