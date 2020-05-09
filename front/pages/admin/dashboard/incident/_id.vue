<template>
    <v-container>
        <v-col sm="12" md="6" offset-md="3">
            <v-row>
                <v-col sm="6">
                    <h1 class="heading mt-3">
                        {{ incident.title }}
                    </h1>
                </v-col>
                <v-col sm="6" class="text-right mt-3">
                    <v-btn color="success" style="margin-right: 0px" :loading="closingIssue"
                           @click="toggleIncidentSolved">
                        <span v-if="incident.solved">Reopen incident</span>
                        <span v-else>Close incident</span>
                    </v-btn>
                </v-col>
            </v-row>
            <v-card class="mb-4">
                <v-card-title primary-title>
                    <v-col sm="12">
                        <h3 class="headline mb-3 d-block">
                            Add new update
                        </h3>
                    </v-col>
                    <v-col>
                        <v-form>
                            <UpdateForm
                                ref="form"
                                :update="emptyUpdate"
                                :errors="errors"
                                :is-loading="formLoading"
                                @input="formData = arguments[0]"
                            />
                            <v-btn
                                :loading="formLoading"
                                :disabled="formLoading"
                                style="float:right"
                                @click="submitUpdate"
                            >
                                Submit
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-card-title>
            </v-card>
            <v-subheader>
                Recent updates
            </v-subheader>
            <LoadingIcon :is-loading="loading"/>
            <div v-for="item in incident.update_set" :key="item.id">
                <v-card class="border-bottom">
                    <v-card-title primary-title>
                        <div>
                            <UpdateListItem :item="item"/>
                        </div>
                    </v-card-title>
                </v-card>
            </div>
        </v-col>
    </v-container>
</template>
<script>
import {mapState} from 'vuex'
import UpdateForm from "@/components/admin/UpdateForm";
import UpdateListItem from "@/components/admin/UpdateListItem";

export default {
    name: "",
    layout: 'dashboard',
    mounted() {
        this.getIncident()
    },
    components: {
        UpdateListItem,
        UpdateForm,
    },
    data() {
        return {
            loading: false,
            closingIssue: false,
            emptyUpdate: {description: '', status: ''},
            errors: {},
            formLoading: false,
            formData: {}
        }
    },
    computed: mapState('admin', [
        'incident'
    ]),
    methods: {
        getIncident() {
            this.$incident.getIncident(this.$route.params.id).then((incident) => {
                console.log(incident)
                this.$store.commit('admin/setIncident', incident)
            }).finally(() => {
                this.loading = false
            })
        },
        toggleIncidentSolved() {
            this.closingIssue = true
            this.$incident.toggleIncidentSolved(this.$route.params.id).then((solved) => {
                this.$store.commit('admin/setIncidentSolved', solved)
                this.$store.dispatch('admin/showSnackbar', solved ? 'This incident is now closed.' : 'This incident is now reopened.')
            }).catch((error) => {
                if (error) {
                    this.$store.dispatch('admin/showSnackbar', 'Oh, that didn\'t go well. Please try again')
                }
            }).finally(() => {
                this.closingIssue = false
            })
        },
        submitUpdate() {
            this.formLoading = true
            this.$incident.createUpdate(this.formData).then((data) => {
                this.$store.commit('admin/addNewUpdate', data)
                this.$store.dispatch('admin/showSnackbar', 'Update has been added.')
                this.$refs.form.resetForm()
            }).catch((errors) => {
                this.errors = errors
            }).finally(() => {
                this.formLoading = false
            })
        },
    }
}
</script>

