
import template from './albumsMain.html';
import styles from './albumsMain.scss';

export default {
    template,
    controller
};

controller.$inject = ['albumService'];

function controller(albumService) {
    this.styles = styles;
    this.albums = [];

    albumService.getAll()
        .then(albums => {this.albums = albums;});

    this.getOne = album => {
        albumService.getOne(album)
            .then(album => {this.albums = [album];});
    };

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
