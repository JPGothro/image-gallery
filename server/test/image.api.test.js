
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const assert = chai.assert;

chai.use(chaiHttp);

const connection = require('../lib/mongoose-config');
const app = require('../lib/app');

describe('Validating Image routes', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'images';
            connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const testImage = {
        title: 'Test Image',
        description: 'test image description',
        url: 'https://dgosxlrnzhofi.cloudfront.net/custom_page_images/623/page_images/campuses-and-locations.jpg?1461711109',
        albumId: '58547f17fe53f22a22cc1696'
    };

    const request = chai.request(app);

    it('GET all before posting', done => {
        request
            .get('/api/images')
            .then(res => done('status should not be 200'))
            .catch(res => {
                assert.equal(res.status, 404);
                done();
            });
    });

    it('POST new image', done => {
        request
            .post('/api/images')
            .send(testImage)
            .then(res => {
                const image = res.body;
                assert.ok(image._id);
                testImage._id = image._id;
                testImage.__v = 0;
                done();
            })
            .catch(done);
    });

    it ('GET all after POST', done => {
        request
            .get('/api/images')
            .then(res => {
                // console.log('get after post response body', res.body);
                assert.deepEqual(res.body, [testImage]);
                done();
            })
            .catch(done);
    });

    it('GET by id', done => {
        request
            .get(`/api/images/${testImage._id}`)
            .then(res => {
                // console.log('get with ID after post response body', res.body);
                assert.deepEqual(res.body, testImage);
                done();
            })
            .catch(done);
    });

    it('DELETE an image', done => {
        request
            .delete(`/api/images/${testImage._id}`)
            .then(res => {
                const deletedImage = res.body;
                assert.ok(deletedImage._id);
                done();
            })
            .catch(done);
    });

});
