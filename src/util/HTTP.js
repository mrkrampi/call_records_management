import axios from 'axios';

export const HTTP = axios.create({
    /*baseURL:'url домен',*/
    headers: {'Content-Type': 'application/json'}
});

function getTokenFromStorage() {
    return localStorage.getItem('jwt');
}

HTTP.interceptors.request.use(request => {
        const fullUrl = request.url;
        if (fullUrl.indexOf('/signin') === -1) {
            const token = getTokenFromStorage();
            if (token) {
                request.headers   = {
                    ...request.headers,
                    'Authorization': `Bearer ${token}`
                };
            } else {
                throw new Error()
            }
        }
        return request;
    },
    error => Promise.reject(error)
);
