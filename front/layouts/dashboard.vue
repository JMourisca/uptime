<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app
                             style="margin-top: 69px;">
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.text" active-class="active" :to="item.path">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark fixed>
            <v-toolbar-title style="width: 300px; text-align: left;" class="ml-0 pl-3">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="logout">
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content style="margin-top: 64px;">
            <v-container fluid>
                <v-layout justify-center align-center>
                    <nuxt v-if="!loadingUser"/>
                </v-layout>
            </v-container>
        </v-content>
        <v-btn
            fab
            bottom
            right
            color="pink"
            dark
            fixed
            @click.stop="dialog = !dialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <!-- this is the dialog that opens once -->
        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title class="primary py-4 title">
                    Add new incident
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-row>
                        <v-col sm="12">
                            <v-text-field
                                v-model="title"
                                label="Incident Title"
                                :error-messages="errors.title"
                                @keyup="errors.title=''"
                            />
                        </v-col>
                        <v-col sm="12">
                            <v-textarea
                                v-model="description"
                                label="Incident details"
                                hint="Add any information here that you already know about this."
                                :error-messages="errors.description"
                                @keyup="errors.description=''"
                            />
                        </v-col>
                        <v-col sm="12">
                            <v-select
                                v-model="site"
                                :items="sites"
                                label="Site"
                                item-text="title"
                                item-value="id"
                                :error-messages="errors.site"
                                @keyup="errors.site=''"
                            />
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dialog=false; resetForm()">Cancel</v-btn>
                    <v-btn text :loading="loading" @click="createIncident">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    name: 'Dashboard',
    data: () => ({
        dialog: false,
        drawer: true,
        items: [
            {icon: 'mdi-account-group', text: 'Incidents', link: 'Incidents', path: '/admin/dashboard'},
            {icon: 'mdi-settings', text: 'Settings', link: 'Settings', path: '/admin/dashboard/settings'}
        ],
        title: '',
        description: '',
        site: '',
        loading: false,
        loadingUser: true,
        siteError: '',
        errors: [],
        sites: {},
        payload: {},
    }),
    mounted() {
        this.getSites()
        this.$user.getUser().then((data) => {
            this.$store.commit('admin/setUser', data)
            this.loadingUser = false
        })
    },
    methods: {
        logout() {
            this.$user.logout().then((data) => {
                this.$router.push({name: 'admin/index'})
                this.$store.commit('setUSer', {})
            }).catch(() => {
            })
        },
        resetForm() {
            this.title = this.titleError = this.description = this.descriptionError = this.site = this.siteError = ''
        },
        getSites() {
            this.$incident.getAllSites().then((sites) => {
                this.sites = sites
                if (this.sites.length === 1) {
                    this.site = this.sites[0].id
                }
            }).catch(() => {
                this.$store.dispatch('admin/showSnackbar', 'That didn\'t go well. We couldn\'t get the sites')
            })
        },
        createIncident() {
            this.payload = {
                incident: {
                    title: this.title
                },
                update: {
                    description: this.description
                },
                site_id: this.site
            }
            this.$incident.createIncident(this.payload).then((incident) => {
                this.$store.commit('admin/addIncident', incident)
                this.$store.dispatch('admin/showSnackbar', 'Incident created.')
                this.resetForm()
                this.dialog = false
            }).catch((data) => {
                this.errors = data
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>

</style>
