import User from "../api/User";
import Incident from "../api/Incident";

export default function ({store, $axios, redirect}, inject) {
    const user = User($axios)
    const incident = Incident($axios)
    inject('user', user)
    inject('incident', incident)

    $axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 403) {
                redirect('/admin')
                store.dispatch('admin/showSnackbar', 'Please authenticate')
            } else if (error.response.status === 500) {
                store.dispatch('admin/showSnackbar', 'Something went wrong, we are going to fix this.')
            } else if ('error' in error.response.data) {
                store.dispatch('admin/showSnackbar', error.response.data.error)
            } else if ('detail' in error.response.data) {
                store.dispatch('admin/showSnackbar', error.response.data.detail)
            }
            return Promise.reject(error)
        }
    )
}

