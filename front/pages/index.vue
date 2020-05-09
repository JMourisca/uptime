<template>
    <div>
        <div class="cards">
            <div class="card status" v-for="site in $store.state.sites" :key="site.id">
                <SiteStatus :api-result="site"></SiteStatus>
            </div>
            <div class="card incidents" v-if="openIncidents.length > 0">
                <div class="incident_item" v-for="i in openIncidents" :key="i.id">
                    <nuxt-link :to="{ name: 'incident-id', params: { id: i.id }}">
                        <IncidentListItem :incident="i"></IncidentListItem>
                    </nuxt-link>
                </div>
            </div>
            <div class="calendar">
                <HistoryPart></HistoryPart>
            </div>
        </div>
    </div>
</template>

<script>
import IncidentListItem from "../components/visitors/IncidentListItem";
import SiteStatus from "../components/visitors/SiteStatus";
import HistoryPart from "../components/visitors/HistoryPart";

export default {
    components: {HistoryPart, SiteStatus, IncidentListItem},
    computed: {
        openIncidents() {
            return this.$store.state.incidents.filter(a => !a.solved)
        }
    }
}
</script>

<style>
    .incidents > .incident_item {
        margin-bottom: 30px;
        margin-top: 10px;
    }

    .incidents > .incident_item:last-child {
        margin-bottom: 10px;
    }

    .incidents {
        margin-bottom: 30px;
    }

    .card.status {
        margin-bottom: 10px;
    }

    .calendar {
        font-family: Montserrat;
        font-weight: 300;
        width: 700px;
        margin: 30px auto 0px;
        font-size: 16px;
    }
</style>
