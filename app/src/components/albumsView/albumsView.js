
import template from './albumsView.html';
import styles from './albumsView.scss';

export default {
    template,
    bindings: {
        albums: '<'
    },
    controller
};

function controller () {
    this.styles = styles;
    this.albums = this.albums;
    console.log('albumViews controller is here!');              
};
