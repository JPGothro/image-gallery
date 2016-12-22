
import template from './mainApp.html';
import styles from '../../scss/main.scss';

export default {
    template,
    controller
};

function controller() {
    this.styles = styles;
};
