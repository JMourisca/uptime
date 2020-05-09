/*
state is the place where you can put your variables in. In this case, we added sites, issues, and notificationErrors.
  All of these will later be accessible from all of the components.
 */
export const state = () => ({
    socket: {
        isConnected: true,
        message: '',
        reconnectError: false
    },
    sites: [],
    incidents: [],
    notificationErrors: []
})

/*
mutations is the place where you can create a function to modify the states with. You cannot directly change states.
A big advantage of this is that you can see in your Vue debug tool what is changing a value.
*/
export const mutations = {
    SOCKET_ONOPEN(state, event) {
        state.socket.isConnected = true
    },
    SOCKET_ONCLOSE(state, event) {
        if (state.notificationErrors.find(a => a.id === 0) === undefined) {
            state.notificationErrors.push({
                color: 'red',
                id: 0,
                text: 'We lost connection to the server. Please refresh the page or wait for a bit.',
                time: 0
            })
        }
        state.notificationErrors = state.notificationErrors.filter(a => a.id !== 0)
        state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
        console.error(state, event)
    },
    SOCKET_ONMESSAGE(state, message) {
        const data = JSON.parse(message.data).message
        console.log(data)
        const i = state.sites.findIndex(o => o.id === data.id)
        state.sites[i] ? state.sites.splice(i, 1, data) : state.sites.push(data)
        state.socket.message = message
        const result = state.sites.map(a => a.incident_set)
        state.incidents = [].concat.apply([], result)
    },
    SOCKET_RECONNECT(state, count) {
        console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
        console.log('We are back up and sailing guys! Nothing to worry about.')
        state.socket.reconnectError = true
    },
    addNotificationError(state, error) {
        error.id = btoa(Math.random()).substr(5, 5)
        state.notificationErrors.push(error)
    },
    removeNotificationError(state, error) {
        state.notificationErrors = state.notificationErrors.filter(a => a.id !== error.id)
    }
}

/*
actions is the way we can trigger mutations if they are not synchronized.
*/
export const actions = {
    showNotificationErrors({commit}, error) {
        commit('addNotificationError', error)
        if (error.time) {
            setTimeout(() => {
                commit('removeNotificationError', error)
            }, error.time)
        }
    }
}
