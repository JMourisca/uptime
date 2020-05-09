<template>
    <v-snackbar v-model="show" :right="true" :timeout="6000" :top="true">
        {{ $store.state.admin.snackbarText }}
        <v-btn color="pink" text @click="$store.commit('setSnackbar', '')">Close</v-btn>
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "SnackbarNotification",
    data() {
        return {
            show: false
        }
    },
    watch: {
        'snackbar' (newVal) {
            this.show = newVal
        }
    },
    computed: mapState('admin', [
        'snackbarText',
        'snackbar'
    ])
}
</script>

<style scoped>

</style>
