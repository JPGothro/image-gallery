
import template from './imageChoice.html';


export default {
    template,
    controller
};

controller.$inject = ['imageService'];

function controller(imageService) {
    this.choices = [
        {name: 'Gallery', value: 'gallery'},
        {name: 'Thumbnail', value: 'thumbnail'},
        {name: 'Text View', value: 'view'}
    ];

    this.myChoice = this.choices[2];

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

