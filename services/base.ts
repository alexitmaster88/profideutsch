import axios from 'axios'

/**
 * API endpoint
 */
//'http://chamber-api.apptest.uz' 

// ***************      TEST          **********************
let API_URL = 'http://83.69.136.217:6006'
let API_URL_ERP = 'http://sspuis.apptest.uz'
let API_URL_MY = 'http://sspmyuis.apptest.uz'


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const IS_REAL = false
const IS_REAL = true

// ***************      REAL          **********************
if (IS_REAL) {
    API_URL = 'https://api.chamber.uz'
    API_URL_ERP = 'https://erp-api.chamber.uz'
    API_URL_MY = 'https://my-api.chamber.uz'
}
// API_URL_MY = 'https://my-api.chamber.uz'
// API_URL = 'http://localhost:6006'

export { API_URL, API_URL_ERP, API_URL_MY }


export const apiInstance = axios.create({
    baseURL: API_URL + '/api/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const apiInstanceErp = axios.create({
    baseURL: IS_REAL ? API_URL_ERP : API_URL_ERP + '/api/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const apiInstanceMy = axios.create({
    baseURL: IS_REAL ? API_URL_MY : API_URL_MY + '/api/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

// Add a request interceptor
apiInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const controller = new AbortController()
        config.signal = controller.signal

        config.paramsSerializer = {
            indexes: null,
            ...config.paramsSerializer
        }
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
apiInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.request?.status == 401) {
            // bolishi mumkin emaas
        }

        return Promise.reject(error)
    }
)
