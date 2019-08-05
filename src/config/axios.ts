import axios from 'axios';

const appID = "yLG8dfNvwBVFr3td6wHCSUix";
const appSecret = "WembHPWGgcq8V9Swpv3Y7RZp" ;

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

// Add a request interceptor
// tslint:disable-next-line:only-arrow-functions
instance.interceptors.request.use(function (config) {
    const xToken = localStorage.getItem('x-token')
    if(xToken){
        config.headers.Authorization = `Bearer ${xToken}`
    }
    return config;
// tslint:disable-next-line:only-arrow-functions
}, function (error) {
    // tslint:disable-next-line:no-console
    console.error(error)
    return Promise.reject(error);
});

// Add a response interceptor
// tslint:disable-next-line:only-arrow-functions
instance.interceptors.response.use(function (response) {
    // Do something with response data
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
    }
    return response;
// tslint:disable-next-line:only-arrow-functions
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default instance

