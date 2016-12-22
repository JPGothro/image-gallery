
albumService.$inject = ['$http', 'apiUrl'];

export default function albumService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/albums`)
                .then(res => res.data);
        },
        getOne(album) {
            return $http.get(`${apiUrl}/albums/${album._id}`)
                .then(res => res.data);
        },        
        add(album) {
            return $http.post(`${apiUrl}/albums`,album)
                .then(res => res.data);
        }, 
        remove(album) {
            return $http.delete(`${apiUrl}/albums/${album._id}`)
                .then(res => res.data);
        }
    };
};
