
import template from './imageAdd.html';
import styles from './imageAdd.css';

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
        this.url = '';
        this.description = '';
    };

    // clear the input fields for initial display.
    this.reset();

    this.addImage = () => {
        this.add({
            title: this.title,
            url: this.url,
            description: this.description
        });
        this.reset();
    };

};