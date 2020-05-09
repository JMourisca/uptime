<template>
    <div class="cards">
        <div class="card incidents">
            <h1>{{ incident.title }}</h1>
            <div
                v-for="i in incident.update_set"
                :key="i.id"
                class="incident_item"
            >
                <p>{{ i.description }}</p>
                <div class="half">
                    {{ i.date | timeAgo }}
                    <span class="right">
          Status: {{ i.status }}
        </span>
                </div>
            </div>
        </div>
        <nuxt-link :to="{ name: 'index' }">
            <div class="back">
                &larr; back
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import {timeFormatter} from "../../mixins/DateTimeFilters";

export default {
    name: "Incident",
    mixins: [timeFormatter],
    computed: {
        incident() {
            return this.$store.state.incidents.find(a => a.id === parseInt(this.$route.params.id))
        }
    }
}
</script>

<style scoped>
    .half {
        color: #999999;
    }

    .right {
        float: right;
    }

    h2 {
        margin-bottom: 10px;
    }
</style>
