
describe('Image Gallery components: ', () => {
    const { assert } = chai;

    // mock the components module
    // to use before, instead of beforeEach, this is required:
    angular.mock.module.sharedInjector();

    before( angular.mock.module('components') );
    
    let $component = null;
    before(
        angular.mock.inject($componentController => {
            $component = $componentController;
        })
    );
        
    // this image is used for more than one component test
    const testImage = {title: 'testImg', url: 'a fake URL', description: 'the test image'};

    describe('parent component: imageChoice', () => {
        const images = [
            {title: 'testImage', description: 'a test image', url: 'fake URL'},
            {title: 'testImageToo', description: 'another test image', url: 'fake URL too'}
        ];
        
        const imageService = {
            get() {
                return Promise.resolve(images);
            },
            add(image) {
                return Promise.resolve(image);
            },
            remove(image) {
                return Promise.resolve(image);
            }
        };


        it('loads images', done => {
            let component = $component('imageChoice', {imageService});

            setTimeout(() => {
                assert.equal(component.images, images);
                done();
            });
        });

        it('add an image', done => {
            let component = $component('imageChoice', {imageService});

            component.add(testImage);

            setTimeout(() => {
                assert.equal(images.length, 3);
                assert.equal(images[2], testImage);
                done();
            });
        });

        it('remove an image', done => {
            let component = $component('imageChoice', {imageService});

            component.remove(testImage);
            setTimeout(() => {
                assert.equal(images.length, 2);
                done();
            });
        });

    });

    describe('child component: imageView', () => {
        let removedItem = null;

        it('remove image', done => {
            let component = $component('imageView', null, {
                remove(image) {removedItem = image;}
            });
            component.trash(testImage);
            assert.deepEqual(removedItem, testImage);
            done();
        });

    });

    describe('child component: imageAdd', () => {
        let newImage = null;
        let addedImage = null;

        it('add new image', done => {
            newImage = $component('imageAdd', null, {
                add(image) {addedImage = image;}
            });
            newImage.title = testImage.title;
            newImage.url = testImage.url;
            newImage.description = testImage.description;
            newImage.addImage(testImage);
            assert.deepEqual(addedImage, testImage);
            done();
        });

    });
});