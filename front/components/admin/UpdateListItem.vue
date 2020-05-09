<template>
    <div>
        <p class="mb-0">{{ item.description }}</p>
        <p class="caption">{{ item.status }}</p>
        <div v-if="item.user.id === user.id">
            <v-dialog v-model="modal" max-width="500">
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" outlined small color="primary">
                        Edit
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="headline">
                        Edit this update
                    </v-card-title>
                    <v-card-text>
                        <UpdateForm
                            ref="form"
                            :update="item"
                            :errors="errors"
                            :is-loading="formLoading"
                            @input="formData = arguments[0]"
                        />
                        <v-btn
                            :loading="formLoading"
                            style="float:right"
                            :disabled="formLoading"
                            @click="submitUpdate"
                        >
                            Submit
                        </v-btn>
                        <div style="clear:both"/>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="deleteModal" max-width="500">
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" outlined small color="error">
                        Remove
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="headline">
                        Are you sure that you want to remove this update?
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            color="red darken-1"
                            text
                            :loading="removeLoading"
                            @click="removeItem"
                        >
                            Remove
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import UpdateForm from "@/components/admin/UpdateForm";

export default {
    name: 'UpdateListItem',
    components: {
        UpdateForm,
    },
    data: () => ({
        modal: false,
        deleteModal: false,
        loading: false,
        removeLoading: false,
        errors: {},
        editFormLoading: false,
        formData: {},
        formLoading: false
    }),
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: mapState('admin', [
        'user'
    ]),
    methods: {
        submitUpdate() {
            this.editFormLoading = true
            this.$incident.updateUpdate(this.formData).then((data) => {
                this.$store.commit('admin/changeUpdate', data)
                this.$store.dispatch('admin/showSnackbar', 'Update has been changed.')
                this.modal = false
            }).catch((error) => {
                this.errors = error
            }).finally(() => {
                this.editFormLoading = false
            })
        },
        removeItem() {
            this.removeLoading = true
            this.$incident.deleteUpdate(this.item.id).then((response) => {
                this.$store.commit('admin/removeUpdate', this.item)
                this.$store.dispatch('admin/showSnackbar', 'Update has been removed.')
                this.deleteModal = false
            }).catch((error) => {
                if (error) {
                    this.$store.dispatch('admin/showSnackbar', 'Oh. We couldn\'t remove this update.')
                }
            }).finally(() => {
                this.removeLoading = false
            })
        }
    }
}
</script>
