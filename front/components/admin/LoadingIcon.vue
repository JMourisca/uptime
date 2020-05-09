<template>
    <v-container justify-center style="text-align:center" v-if="isLoading">
        <v-progress-circular
            indeterminate
            color="primary"
        />
    </v-container>
</template>

<script>
export default {
    props: {
        isLoading: Boolean
    }
}
</script>
