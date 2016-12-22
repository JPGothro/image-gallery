
import template from './imageThumbnail.html';
import styles from './imageThumbnail.scss';

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
