
describe( 'Image Service', () => {
    const { assert } = chai;

    // mock the services module
    beforeEach( 
        angular.mock.module('services', { apiUrl: '/api' })
    );
    
    let $httpBackend = null, imageService = null;
    
    beforeEach(angular.mock.inject((_imageService_, _$httpBackend_ ) => {
        $httpBackend = _$httpBackend_;
        imageService = _imageService_;
    }));

    afterEach(() => {
        // make sure the $httpBackend expectations that we set up
        // have actually happened
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it( 'get images', done => {
        // mock return data from pirate get
        const images = [1, 2, 3];
        
        // set the expectation
        $httpBackend
            // what http VERB and url are we expecting?
            .expectGET('/api/images')
            // mock a reponse that will get set on the .data 
            // property of $http response object
            .respond(images);

        // make the call against SUT
        imageService.get()
            .then(allImages => {
                // $httpBackend serializes the object we pass to
                // .respond, so to "test" we need to do 
                // deepEqual as they are no longer the same object reference
                assert.deepEqual(allImages, images);
                done();
            })
            .catch(done);

        // we need to tell $httpBackend everything is setup and okay
        // to "flush" (send) reponses back
        $httpBackend.flush();
    });


    it('add image', done => {

        const image = {
            title: 'testImage',
            description: 'a test image',
            url: 'fake URL'
        };
        
        $httpBackend
            .expectPOST('/api/images', image)
            .respond(image);

        imageService.add(image)
            .then(saved => {
                assert.deepEqual(saved, image);
                done();
            })
            .catch(done);

        $httpBackend.flush();
    });

    it('remove image', done => {
        const image = {
            title: 'testImage',
            description: 'a test image',
            url: 'fake URL',
            _id: 'ABC123'
        };
        
        $httpBackend
            .expectDELETE(`/api/images/${image._id}`)
            .respond(image);

        imageService.remove(image)
            .then(removed => {
                assert.deepEqual(removed, image);
                done();
            })
            .catch(done);

        $httpBackend.flush();
    });
    
});