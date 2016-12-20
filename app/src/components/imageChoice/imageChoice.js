
import template from './imageChoice.html';
import styles from './imageChoice.scss';

export default {
    template,
    controller
};

// controller.$inject = ['imageService', '$state'];
controller.$inject = ['imageService'];

// function controller(imageService, $state) {
function controller(imageService) {
    this.styles = styles;

    this.choices = [
        {name: 'Gallery', value: 'gallery'},
        {name: 'Thumbnail', value: 'thumbnail'},
        {name: 'Text View', value: 'view'}
    ];

    this.myChoice = this.choices[2];

    // this.updateView = () => {
    //     $state.go($state.current.name, {view: this.myChoice});
    // };

    this.images = [];

    imageService.get()
        .then(images => {
            this.images = images;
        });

    this.add = image => {
        imageService.add(image)
            .then(saved => this.images.push(saved));
    };

    this.remove = image => {
        imageService.remove(image)
            .then(removed => {
                let theIndex = this.images.indexOf(image);
                if (theIndex > -1) this.images.splice(theIndex, 1);
            });
    };

};

