export default axios => ({
    getAllIncidents() {
        return axios.get('api/incidents').then((response) => {
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    getAllSites() {
        return axios.get('api/sites').then((response) => {
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    createIncident(payload) {
        payload.update.status = 'identified'
        return axios.post('api/incidents', payload).then((response) => {
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    getIncident(id) {
        return axios.get(`api/incidents/${id}`).then((response) => {
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    toggleIncidentSolved(id) {
        return axios.put(`api/incidents/${id}/toggle_solved`).then((response) => {
            return response.data.solved
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    createUpdate(payload) {
        return axios.post('api/update', payload).then((response) => {
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    deleteUpdate(id) {
        return axios.delete(`api/update/${id}`)
    },
    updateUpdate(payload) {
        return axios.put('api/update/' + payload.id, payload).then((response) => {
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    }
})
