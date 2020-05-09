import Cookies from 'js-cookie'

export default axios => ({
    login(payload) {
        return axios.post('api/login', payload).then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    logout() {
        return axios.get('api/logout').then(() => {
            return true
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    getCSRFToken() {
        return axios.get('api/CSRFtoken').then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    getUser() {
        return axios.get('api/user').then((response) => {
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    }
})
