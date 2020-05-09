<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <nuxt></nuxt>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <SnackbarNotification></SnackbarNotification>
    </v-app>
</template>

<script>
import SnackbarNotification from "../components/admin/SnackbarNotification";

export default {
    name: "BareLayout",
    components: {SnackbarNotification},
    mounted() {
        this.$user.getCSRFToken()
    }
}
</script>

<style scoped>

</style>
