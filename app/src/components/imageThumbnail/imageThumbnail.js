
import template from './imageThumbnail.html';
import styles from './imageThumbnail.css';

export default {
    template,
    bindings: {
        images: '='
    },
    controller (){this.styles = styles;}
};
