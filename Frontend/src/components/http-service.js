import 'whatwg-fetch';

class HttpService {
    getJunks = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3001/getjunks')
            .then(response => {
                resolve(response.json());
            })
        });
        return promise;
    }
}
export default HttpService;
