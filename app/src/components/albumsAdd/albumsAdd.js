
import template from './albumsAdd.html';
import styles from './albumsAdd.scss';

export default {
    template,
    bindings: {
        add: '<'
    },
    controller
};

function controller() {
    this.styles = styles;

    // clears input fields
    this.reset = () => {
        this.title = '';
        this.description = '';
    };

    // clear the input fields for initial display.
    this.reset();

    this.addAlbum = () => {
        this.add({
            title: this.title,
            description: this.description
        });
        this.reset();
    };

};
