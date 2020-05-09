<template>
    <div>
        <h2>History</h2>
        <div v-for="(i, index) in dates" :key="index" class="calendar-item">
            <p>{{ i.toDateString() }}</p>
            <div v-if="getIncidents(i).length === 0">
                <font-awesome-icon icon="check-circle" class="green-color"></font-awesome-icon>
                <div class="subtext">
                    No incidents
                </div>
            </div>
            <div v-for="j in getIncidents(i)" :key="j.id">
                <font-awesome-icon icon="exclamation-circle" class="orange-color"/>
                <div class="subtext issue-name">
                    <nuxt-link :to="{ name: 'incident-id', params: { id: j.id }}">
                        {{ j.title }}
                    </nuxt-link>
                    <div class="issue-resolved">
                        Resolved on: {{ j.end | dateFormat }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "HistoryPart",
    mounted() {
        const start = new Date();
        for (let i = 0; i < 6; i++) {
            this.dates.push(new Date(start));
            start.setDate(start.getDate() - 1)
        }
    },
    data: () => ({
        dates: []
    }),
    methods: {
        getIncidents(i) {
            return this.closedIncidents.filter(a => moment(moment(a.start).startOf('day').isSame(moment(i).startOf('day'))))
        }
    },
    filters: {
        dateFormat(value) {
            return moment.utc(value).format('ll')
        }
    },
    computed: {
        closedIncidents() {
            return this.$store.state.incidents.filter(a => a.solved)
        }
    }
}
</script>

<style scoped>
    .calendar h2 {
        font-weight: 500;
        margin-bottom: 10px;
    }

    .green-color {
        color: #2EE779;
    }

    .orange-color {
        color: #f3b34c;
    }

    .subtext {
        color: lightgrey;
        display: inline-block;
        position: relative;
        left: 10px;
    }

    a, a:hover, a:visited, a:focus {
        color: #7d7d7d;
    }

    .issue-resolved {
        display: block;
        font-size: 12px;
        color: #a2a2a2;
    }

    .fa-exclamation-circle {
        vertical-align: top;
        top: 2px;
        position: relative;
    }

    .calendar-item {
        margin-bottom: 10px;
    }

    .calendar-item p {
        margin-bottom: 5px;
    }

    .small-square-indicator {
        width: 100%;
        height: 5px;
        display: inline-block;
    }

    .issue-name {
        color: #7d7d7d;
    }
</style>
