
routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'welcome',
        url: '/',
        component: 'welcome'
    });

    $stateProvider.state({
        name: 'about',
        url: '/about',
        component: 'about'
    });

    $stateProvider.state({
        name: 'albums',
        url: '/albums',
        component: 'albumsMain'
    });

    $stateProvider.state({
        name: 'albums.images',
        url: '/:id/images',
        resolve: {
            albumId: ['$transition$', t => t.params().id]
        },
        views: {
            myimages: 'imageChoice'
        }
    });

    $stateProvider.state({
        name: 'images',
        url: '/images',
        component: 'imageChoice'
    });

    $urlRouterProvider.otherwise('/');
};

