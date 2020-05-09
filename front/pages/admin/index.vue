<template>
    <div>
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                    v-model="username"
                    prepend-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                />
                <v-text-field
                    id="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    @keyup.enter="login"
                />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click="login"
            >
                Login
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    layout: 'bare',
    data() {
        return {
            username: '',
            loading: false,
            password: ''
        }
    },
    methods: {
        login() {
            this.loading = true
            this.$user.login({username: this.username, password: this.password}).then((user) => {
                this.$store.commit("admin/setUser", user)
                this.$router.push({name: 'admin-dashboard'})
            }).catch((error) => {
                console.log('this is an error')
                console.log(error)
            }).finally(() => {
                this.loading = false
            })
        },
    }
}
</script>
