
import template from './albumsView.html';
import styles from './albumsView.scss';

export default {
    template,
    controller
};

controller.$inject['albumService'];

function controller (albumService) {
    this.styles = styles;

    this.albums = [];

    albumService.get()
        .then(albums => {this.albums = albums;});

    this.add = album => {
        albumService.add(album)
            .then(saved => this.albums.push(saved));
    };

    this.remove = album => {
        albumService.remove(album)
            .then(removed => {
                let theIndex = this.albums.indexOf(album);
                if (theIndex > -1) this.albums.splice(theIndex, 1);
            });
    };
};
