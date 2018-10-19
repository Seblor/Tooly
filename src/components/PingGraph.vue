<template>
  <div class="ping-graph">
    <div class="header">
      <h3>{{ address }}</h3>
      <div class="remove-cross">
        <font-awesome-icon class="icon" icon="times" @click="$emit('delete-component')" />
      </div>
    </div>
    <canvas ref="chart" width="500" height="100"></canvas>
    <br>
    <div class="pinger-settings">
      <div class="pinger-interval">
        <label>&nbsp;Interval</label>
        <input type="range" min=0 max=1000 v-model="pingInterval">
        <input type="number" min=0 max=1000 v-model="pingInterval">
      </div>
      <div class="pinger-fetch">
        <input :id="_uid+'fetch'" type="checkbox" v-model="fetch">
        <label :for="_uid+'fetch'">&nbsp;Use fetch</label>
      </div>
      <div class="ping-protocol">
        <!-- <span>Protocol: </span> -->
        <select class="protocols" v-model=usedProtocol>
          <option type="radio" v-for="(currentProtocol, protocolId) of protocols" :key=currentProtocol.name :value=protocolId>{{ currentProtocol.name }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { TimeSeries, SmoothieChart } from '../../libs/smoothie.js'
import Timer from '../utils/Timer.js'

/**
 * Pings the address using Image URL queries
 * @param address The address to ping
 */
function pingAddressWithImg (address) {
  return new Promise((resolve, reject) => {
    let img = new Image()

    function sendTime () {
      clearTimeout(timer)
      resolve((Date.now() - pingTime) / 2)
      img = null
    }

    let pingTime, timer

    img.onload = () => {
      sendTime()
    }
    img.onerror = () => {
      sendTime()
    }

    pingTime = Date.now()
    img.src = `${address}?t=${Date.now()}`
    timer = setTimeout(() => {
      reject(new Error('Error: Timeout'))
      img = null
    }, 1500)
  })
}

/**
 * Pings the address using Fetch
 * @param address The address to ping
 */
function pingAddressFetch (address) {
  return new Promise((resolve, reject) => {
    let pingTime = Date.now()
    let timer = setTimeout(() => {
      reject(new Error('Error: Timeout'))
    }, 1000)

    fetch(address)
      .then(function () {
        resolve((Date.now() - pingTime) / 2)
        clearTimeout(timer)
        pingTime = null
      })
      .catch(function () {
        resolve(1000)
        clearTimeout(timer)
        pingTime = null
      })
  })
}

/**
 * Check if the URL is valid (without the protocol)
 * @param address The address to ping
 */
function ValidURL (str) {
  var pattern = new RegExp('^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3})|' + // OR ip (v4) address
    'localhost)' + // OR 'localhost'
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locater
  if (!pattern.test(str)) {
    return false
  } else {
    return true
  }
}

export default {
  name: 'PingGraph',
  props: {
    address: {
      validator: ValidURL
    },
    interval: {
      type: Number,
      default: 1000
    },
    protocol: {
      default: function () {
        return 'https'
      },
      validator: function (value) {
        return ['http', 'https', 'ws'].indexOf(value) !== -1
      }
    },
    useFetch: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      protocols: {
        http: { name: 'HTTP' },
        https: { name: 'HTTPS' },
        ws: { name: 'WebSocket' }
      },
      usedProtocol: this.protocol,
      fetch: this.useFetch,
      pingInterval: this.interval
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.clearAll()
    next()
  },
  beforeRouteLeave (to, from, next) {
    this.clearAll()
    next()
  },
  destroyed: function () {
    this.clearAll()
  },
  mounted: function () {
    // get the component ID to identify the labels
    this.id = this._uid

    this.clearAll()

    // Creating chart
    this.pings = new TimeSeries()
    this.chart = new SmoothieChart({ minValue: 0, tooltip: true })
    this.chart.addTimeSeries(this.pings, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 2 })
    this.chart.streamTo(this.$refs['chart'], 500)

    this.timer = new Timer(async () => {
      let result = 1000
      try {
        result = await (this.fetch ? pingAddressFetch : pingAddressWithImg)(`${this.usedProtocol}://${this.address}`)
      } catch (error) { }
      if (this.pings) {
        this.pings.append(Date.now(), result)
      }
    }, this.interval, true)
  },
  watch: {
    protocol: function (value) {
      this.usedProtocol = value
    },
    pingInterval: function (value) {
      this.timer.changeInterval(value)
    }
  },
  methods: {
    /**
     * Clears all variables
     */
    clearAll: function () {
      this.pings = null
      this.chart = null
      if (this.timer) {
        this.timer.stop()
      }
      this.timer = null
    }
  }
}
</script>

<style>
.ping-graph {
  display: table;
}

.graph {
  text-align: center;
  float: right;
}

.protocols {
  margin: 0;
}

.header h3 {
  display: inline-block;
}

.remove-cross {
  float: right;
  cursor: pointer;
}

.pinger-settings {
  display: flex;
  width: 500px;
}

.pinger-settings > * {
  flex-grow: 1;
  border: 1px solid black;
  padding: 5px;
}

input[type="number"] {
  width: 60px;
}

div.smoothie-chart-tooltip {
  background: #444;
  padding: 1em;
  margin-top: 20px;
  font-family: consolas;
  color: white;
  font-size: 10px;
  pointer-events: none;
}
</style>
