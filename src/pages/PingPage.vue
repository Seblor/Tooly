<template>
  <div id="ping">
    <h1>Latency Checker</h1>
    <b-container class="bv-example-row reduced-margin">
      <b-row>
        <b-col v-for="(target, index) in targets" :key=index>
          <ping-graph :address=target.url :protocol=target.protocol v-on:delete-component=removeComponent(index) />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PingGraph from '../components/PingGraph'

const targets = [
  {
    url: 'nghttp2.org/httpbin/stream/0'
  },
  {
    url: 'seblor.fr'
  },
  {
    url: 'www.wikipedia.org'
  },
  {
    url: 'vps.seblor.fr',
    protocol: 'http'
  }
]

export default {
  name: 'ping',
  data () {
    return { targets }
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
  },
  methods: {
    removeComponent: function (index) {
      targets.splice(index, 1)
    }
  }
}
</script>

<style>
.ping-graph {
  display: inline;
}

.reduced-margin {
  margin-left: 0;
  margin-right: 0;
}
</style>
