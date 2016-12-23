import WelcomePage from './welcome-page';

describe('My Album/Image Viewer App', function() {

    const welcome = new WelcomePage();

    it('should have a title', function() {
        welcome.get();
        expect(welcome.title).toEqual('Image (Re)Viewer');
    });
    
    describe('navigation', function() {

        beforeEach(function() {
            welcome.get();
        });

        it('default to welcome page, and navigate to albums', function() {
            
            expect(welcome.url).toBe('/');
            expect(welcome.stateComponent).toEqual('welcome');  

            welcome.goToAlbums();

            expect(welcome.url).toBe('/albums');
            expect(welcome.stateComponent).toEqual('albums-main');  

        });
   
        it('default to welcome page, and navigate to images', function() {
            expect(welcome.url).toBe('/');
            expect(welcome.stateComponent).toEqual('welcome');  

            welcome.goToImages();

            expect(welcome.url).toBe('/images');
            expect(welcome.stateComponent).toEqual('image-choice');
        });

    });
});


