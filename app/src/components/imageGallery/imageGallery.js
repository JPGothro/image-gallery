
import template from './imageGallery.html';
import styles from './imageGallery.css';

export default {
    template,
    bindings: {
        images: '='
    },
    controller () {this.styles = styles;}
};
