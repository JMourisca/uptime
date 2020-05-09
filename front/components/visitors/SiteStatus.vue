<template>
    <div>
        <div class="inner">
            <h2>{{apiResult.title}}</h2>
            <IndicatorIcon class="rightfloat" :show-text="false" :status="apiResult.status"></IndicatorIcon>
        </div>
        <div class="uptime" v-for="j in apiResult.uptime_set.slice(0, 30)" :key="j.id">
            <div :class="'small-square-indicator ' + j.status"></div>
        </div>

    </div>
</template>

<script>
import IndicatorIcon from "./general/IndicatorIcon";

export default {
    name: "Site",
    components: {IndicatorIcon},
    props: {
        apiResult: Object
    },
    computed: {
        status() {
            return this.site.uptime_set[this.site.uptime_set.length - 1].status
        }
    }
}
</script>

<style scoped>
    .rightfloat {
        float: right;
        margin-top: 13px;
    }

    h2 {
        display: inline-block;
        width: 50%;
    }

    .small-square-indicator {
        width: 100%;
        height: 5px;
        display: inline-block;
    }

    .uptime {
        display: inline-block;
        width: 3.33%;
    }
</style>
