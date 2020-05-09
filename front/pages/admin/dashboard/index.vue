<template>
    <v-row>
        <v-col xs="12" sm="6" offset-sm="3">
            <div>
                <v-subheader>
                    Open incidents
                </v-subheader>
                <v-card>
                    <LoadingIcon :is-loading="loading"/>
                    <v-list v-if="!loading">
                        <v-list-item
                            v-for="item in openIncidents"
                            :key="item.id"
                            ripple
                            @click="goTo(item.id)"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-card-title v-if="!loading && openIncidents.length === 0" primary-title>
                        <p> There are currently no open incidents </p>
                    </v-card-title>
                </v-card>
            </div>
            <div>
                <v-subheader class="mt-5">
                    Closed incidents
                </v-subheader>
                <v-card>
                    <LoadingIcon :is-loading="loading"/>
                    <v-list v-if="!loading" two-line>
                        <v-list-item
                            v-for="item in closedIncidents"
                            :key="item.id"
                            ripple
                            @click="goTo(item.id)"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.end | readableDateTime }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-card-title v-if="!loading && closedIncidents.length === 0" primary-title>
                        <p> There are currently no closed incidents </p>
                    </v-card-title>
                </v-card>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import {timeFormatter} from "../../../mixins/DateTimeFilters";
import {mapState} from 'vuex'

export default {
    layout: 'dashboard',
    data: () => ({
        loading: true,
    }),
    computed: {
        closedIncidents() {
            return this.incidents.filter(a => a.solved)
        },
        openIncidents() {
            console.log("here")
            return this.incidents.filter(a => !a.solved)
        },
        ...mapState('admin', [
            'incidents'
        ])
    },
    mounted() {
        this.getIncidents()
    },
    methods: {
        goTo(page) {
            this.$router.push({name: 'admin-dashboard-incident-id', params: {id: page}})
        },
        getIncidents() {
            this.loading = true
            this.$incident.getAllIncidents().then((incidents) => {
                this.$store.commit('admin/setIncidents', incidents)
            }).catch(() => {
                this.$store.dispatch('admin/showSnackbar', 'Oh, we couldn\'t get the incidents')
            }).finally(() => {
                this.loading = false
            })
        }
    },
    mixins: [timeFormatter]
}
</script>
