
imageService.$inject = ['$http', 'apiUrl'];

export default function imageService($http, apiUrl) {
    return {
        get() {
            return $http.get(`${apiUrl}/images`)
                .then(res => res.data);
        },
        add(image) {
            return $http.post(`${apiUrl}/images`,image)
                .then(res => res.data);
        }, 
        remove(image) {
            console.log('deleting image: ', image);
            return $http.delete(`${apiUrl}/images/${image._id}`)
                .then(res => res.data);
        }
    };
};
