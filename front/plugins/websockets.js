import VueNativeSock from "vue-native-websocket";
import Vue from 'vue';

export default function ({store}) {
    Vue.use(VueNativeSock, "ws://localhost:8002/ws/", {
        store,
        reconnection: true,
        reconnectionDelay: 3000
    })
}
