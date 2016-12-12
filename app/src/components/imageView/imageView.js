
import template from './imageView.html';
import styles from './imageView.css';

export default {
    template,
    bindings: {
        images: '=',
        remove: '<'
    },
    controller
};

function controller () {
    this.styles = styles;

    this.trash = (image) => {
        this.remove(image);
    };
};
