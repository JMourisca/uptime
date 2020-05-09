export const state = () => ({
    snackbarText: [],
    snackbar: false,
    user: {},
    incidents: [],
    incident: {}
})

export const mutations = {
    setSnackbar(state, text) {
        state.snackbarText = text
        state.snackbar = !state.snackbar
    },
    setUser(state, user) {
        state.user = user
    },
    setIncidents(state, incidents) {
        state.incidents = incidents
    },
    addIncident(state, incident) {
        state.incidents.push(incident)
    },
    setIncident(state, incident) {
        state.incident = incident
    },
    setIncidentSolved(state, isSolved) {
        state.incident.solved = isSolved
    },
    addNewUpdate(state, update) {
        state.incident.update_set.push(update)
    },
    removeUpdate(state, update) {
        let i = state.incident.update_set.findIndex(o => o.id === update.id);
        state.incident.update_set.splice(i, 1)
    },
    changeUpdate(state, update) {
        let i = state.incident.update_set.findIndex(o => o.id === update.id)
        state.incident.update_set.splice(i, 1, update)
    }
}

export const actions = {
    showSnackbar({commit}, text) {
        if (this.state.snackbar) {
            setTimeout(() => {
                commit('setSnackbar', text)
            }, 100)
        }
        commit('setSnackbar', text)
    }
}
