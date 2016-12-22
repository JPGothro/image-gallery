
import template from './mainapp.html';
import styles from '../../scss/main.scss';

export default {
    template,
    controller
};

function controller() {
    this.styles = styles;
};
