<template>
  <div class="chart-container">
    <h3>lines</h3>
    <svg class="line-chart">
      
    </svg>
  </div>
</template>

<script>
var d3 = require("d3")

export default {
  name: "line-chart",
  props: {
    dataset: [Object, Array],
    size: [Object, Array],
    xyaxis: [Object, Array]
  },
  data () {
    return {
      svg: undefined,
    }
  },
  methods: {
    drawPoints: function () {
      let data = this.dataset
      let h = this.size.height - this.size.margins
      this.svg.append("g").selectAll("circle").data(data.x)
        .enter().append("circle")
          .attr("class", "data-point")
          .attr("fill", "blue")
          .attr("cx", (d) => d)
          .attr("cy", (d,i) => h - data.y[i])
          .attr("r", 3)
    },
    drawLines: function () {
      let data = this.dataset
      let h = this.size.height - this.size.margins
      this.svg.append("g").selectAll("line").data(data.x.slice(0,data.x.length - 1))
        .enter().append("line")
          .attr("class", "data-line")
          .attr("stroke", "blue")
          .attr("stroke-width", 1)
          .attr("x1", (d) => d)
          .attr("y1", (d,i) => h - data.y[i])
          .attr("x2", (d,i) => data.x[i+1])
          .attr("y2", (d,i) => h - data.y[i+1])
    },
  },
  mounted: function () {
    this.svg = d3.select(".line-chart")
        .attr("height", this.size.height)
        .attr("width", this.size.width)
        //.attr("viewBox", `0, 0, ${this.size.width}, ${this.size.height}`)
        //.attr("preserveAspectRatio", "none")
      .append("g")
        .attr("transform", `translate(${this.size.margins}, 0)`)

    if (this.xyaxis) {
      this.svg.append("g")
        .attr("class", "y-axis")
        .call(this.xyaxis.axis.y)
      this.svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${this.size.height - this.size.margins})`)
        .call(this.xyaxis.axis.x)
    }
    this.drawPoints()
    this.drawLines()
    
  }
}
</script>

<style scoped>
.chart-container {
}
</style>
