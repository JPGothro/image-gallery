
import template from './imageChoice.html';
import styles from './imageChoice.scss';

export default {
    template,
    controller,
    bindings: {
        albumId: '<'
    }
};

// controller.$inject = ['imageService', '$state'];
controller.$inject = ['imageService', 'albumService'];

// function controller(imageService, $state) {
function controller(imageService, albumService) {
    this.styles = styles;

    this.choices = [
        {name: 'Text View', value: 'view'},
        {name: 'Gallery', value: 'gallery'},
        {name: 'Thumbnail', value: 'thumbnail'}
    ];

    this.myChoice = this.choices[0];

    // this.updateView = () => {
    //     $state.go($state.current.name, {view: this.myChoice});
    // };

    // set this to onInit
    this.getOne(this.albumId);

    this.getOne = albumId => {
        albumService.getOne(albumId)
            .then(album => {
                this.album = album;
            });
    };

    this.add = image => {
        image.albumId = album._id;
        imageService.add(image)
            .then(saved => this.album.images.push(saved));
    };

    this.remove = image => {
        imageService.remove(image)
            .then(removed => {
                let theIndex = this.album.images.indexOf(image);
                if (theIndex > -1) this.album.images.splice(theIndex, 1);
            });
    };

};

