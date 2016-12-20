

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const assert = chai.assert;

chai.use(chaiHttp);

const connection = require('../lib/mongoose-config');
const app = require('../lib/app');

describe('Validating Album routes', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'albums';
            connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const testAlbum = {
        title: 'Test Album',
        description: 'test album description'
    };

    const request = chai.request(app);

    it('GET all before posting', done => {
        request
            .get('/api/albums')
            .then(res => done('status should not be 200'))
            .catch(res => {
                assert.equal(res.status, 404);
                done();
            });
    });

    it('POST new album', done => {
        request
            .post('/api/albums')
            .send(testAlbum)
            .then(res => {
                const album = res.body;
                assert.ok(album._id);
                testAlbum._id = album._id;
                testAlbum.__v = 0;
                done();
            })
            .catch(done);
    });

    it ('GET all after POST', done => {
        request
            .get('/api/albums')
            .then(res => {
                assert.deepEqual(res.body, [testAlbum]);
                done();
            })
            .catch(done);
    });

    it('GET by id', done => {
        request
            .get(`/api/albums/${testAlbum._id}`)
            .then(res => {
                assert.deepEqual(res.body, testAlbum);
                done();
            })
            .catch(done);
    });

    it('DELETE an album', done => {
        request
            .delete(`/api/albums/${testAlbum._id}`)
            .then(res => {
                const deletedAlbum = res.body;
                assert.ok(deletedAlbum._id);
                done();
            })
            .catch(done);
    });

});
