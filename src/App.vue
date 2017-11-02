<template>
  <div id="app">
    <line-chart v-if="type = 'line'"
      :dataset="dataset"
      :size="size"
      :axes="axes">
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
  },
  data () {
    return {
      size: {
        width: 400,
        height: 200,
      },
      axes: undefined
    }
  },
  methods: {
    createAxes: function() {
      
      /*let width = this.get("width");
      let h_adj = (height - margins.top - margins.bottom);
      let w_adj = (width - margins.left - margins.right);
      let scales = this.get("scales");
      let axes = this.get("axes");
      let labels = this.get("labels");
      let names = this.get("data").map((v) => v.name);

      if (orientation === "vertical") {
        scales.y = d3.scaleLinear()
          .domain([0,this.get("max")])
          .range([h_adj, 0]);
        scales.x = d3.scaleBand()
          .domain(names)
          .rangeRound([0, w_adj])
          .padding(0.1);
        axes.y = d3.axisLeft(scales.y).ticks(10).tickFormat((d) => "$"+d);
        axes.x = d3.axisBottom(scales.x);
      } else if (orientation === "horizontal") {
        scales.y = d3.scaleBand()
          .domain(names)
          .rangeRound([0, h_adj])
          .padding(0.1);
        scales.x = d3.scaleLinear()
          .domain([0, this.get("max")])
          .range([0, w_adj])
        axes.y = d3.axisLeft(scales.y);
        axes.x = d3.axisBottom(scales.x).ticks(10).tickFormat((d) => "$"+d);
      }
      
      svg.append("g")
          .attr("class", "y axis")
          .call(axes.y)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 10) // thsees are two specific. should change.
          .attr("dy", ".5em")
          .style("text-anchor", "end")
          .text(labels.y);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h_adj + ")")
          .call(axes.x)
        .append("text")
          .attr("transform", "translate(" + (w_adj / 2) + "," + "0)")
          .attr("dy", margins.bottom)
          .text(labels.x);*/
      
      let y = d3.scaleLinear().domain([0,d3.max(this.dataset.y)]).range([this.size.height,0])
      let x = d3.scaleLinear().domain([0,d3.max(this.dataset.x)]).range([0, this.size.width])
      let yaxis = d3.axisLeft(y).ticks(4).tickFormat((d) => d)
      let xaxis = d3.axisBottom(x).ticks(4).tickFormat((d) => d)
      let axis = d3.select("g").append("g").attr("class", "y-axis")
          .call(yaxis)
      axis.append("g").attr("class", "x-axis")
          .attr("transform", `translate(180)`)
          .call(xaxis)
      return axis
    }
  },
  beforeMount: function () {
    this.axes = this.createAxes()
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
