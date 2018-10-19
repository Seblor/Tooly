<template>
  <div id="ping">
    <h1>Latency Checker</h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <ping-graph address="nghttp2.org/httpbin/stream/0" />
        </b-col>
        <b-col>
          <ping-graph address="wiki.seblor.fr" />
        </b-col>
        <b-col>
          <ping-graph address="wikipedia.org" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PingGraph from '../components/PingGraph'

export default {
  name: 'ping',
  data () {
    return {}
  },
  components: {
    PingGraph
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  mounted: function () {
  }
}
</script>

<style>
.ping-graph {
  display: inline;
}
</style>
