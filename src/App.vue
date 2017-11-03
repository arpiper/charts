<template>
  <div id="app">
    <line-chart v-if="type = 'line'"
      :dataset="dataset"
      :size="size"
      :xyaxis="xyaxis">
    </line-chart>
  </div>
</template>

<script>
import LineChart from "./components/LineChart.vue"

var d3 = require("d3")
export default {
  name: 'app',
  props: {
    dataset: [Object, Array],
    chartType: [Array, String],
    sizeProp: [Object, Array],
  },
  data () {
    return {
      size: {
        width: 400,
        height: 200,
        margins: 25,
      },
      xyaxis: undefined
    }
  },
  methods: {
    createAxes: function() {
      let h = this.size.height - (2 * this.size.margins)
      let w = this.size.width - (2 * this.size.margins)
      let y = d3.scaleLinear()
          .domain([0, d3.max(this.dataset.y)])
          .range([this.size.height - this.size.margins, 0])
      let x = d3.scaleLinear()
          .domain([0, d3.max(this.dataset.x)])
          .range([0, w])
      let yaxis = d3.axisLeft(y)
          .ticks(4)
          .tickFormat((d) => d)
      let xaxis = d3.axisBottom(x)
          .ticks(4)
          .tickFormat((d) => d)

      this.size.adj_height = h
      this.size.adj_width = w
      this.xyaxis = {
        scales: {x: x, y: y},
        axis: {x: xaxis, y: yaxis}
      }
    }
  },
  created: function () {
    if (this.sizeProp) {
      this.size = this.sizeProp
    }
  },
  beforeMount: function () {
    this.createAxes()
  },
  components: {
    LineChart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
