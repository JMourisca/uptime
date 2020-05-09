<template>
    <div>
        <v-col class="pa-0">
            <v-textarea
                v-model="item.description"
                name="input-7-4"
                label="Please specify this update"
                placehoder="We have..."
                auto-grow
                auto-focus
                :disabled="isLoading"
                :error-messages="formErrors.description"
                @keyup="formErrors.description=''"
            />
        </v-col>
        <v-col class="text-xs-right pa-0">
            <v-select
                v-model="item.status"
                :items="items"
                label="Status"
                item-value="key"
                item-text="value"
                :disabled="isLoading"
                :error-messages="formErrors.status"
                @change="formErrors.status=''"
            />
        </v-col>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'UpdateForm',
    props: {
        update: {
            default: () => {
                return {}
            },
            type: Object
        },
        isLoading: {
            default: false,
            type: Boolean
        },
        errors: {
            default: () => {
                return {}
            },
            type: Object
        }
    },
    data: () => ({
        item: [],
        items: [{key: 'identified', value: 'Identified', id: 1}, {
            key: 'investigating',
            value: 'Investigating',
            id: 2
        }, {key: 'monitoring', value: 'Monitoring', id: 3}, {key: 'resolved', value: 'Resolved', id: 4}]
    }),
    computed: {
        formErrors() {
            return JSON.parse(JSON.stringify(this.errors))
        },
        ...mapState(['incident'])
    },
    watch: {
        item(value) {
            this.$emit('input', value)
        }
    },
    mounted() {
        this.item = JSON.parse(JSON.stringify(this.update))
        this.item.incident_id = this.$route.params.id
    },
    methods: {
        resetForm() {
            this.item = {description: '', status: '', incident_id: this.$route.params.id}
        }
    }
}
</script>

<style scoped>

</style>
