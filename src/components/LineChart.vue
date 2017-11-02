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
    axes: [Object, Array]
  },
  data () {
    return {
      svg: undefined,
      margins: 10,
    }
  },
  mounted: function () {
    this.svg = d3.select(".line-chart")
        .attr("height", this.size.height)
        .attr("width", this.size.width)
        .attr("viewBox", `0, 0, ${this.size.width}, ${this.size.height}`)
        .attr("preserveAspectRatio", "none")
      .append("g")
        .attr("transform", `translate(${this.margins}, ${this.margins})`)

    this.svg.append(this.axes)
    let data = this.dataset
    this.svg.append("g").selectAll("circle").data(data.x)
      .enter().append("circle")
        .attr("class", "data-point")
        .attr("fill", "blue")
        .attr("cx", (d) => d)
        .attr("cy", (d,i) => data.y[i])
        .attr("r", 3)

    this.svg.append("g").selectAll("line").data(data.x.slice(0,data.x.length - 1))
      .enter().append("line")
        .attr("class", "data-line")
        .attr("stroke", "blue")
        .attr("stroke-width", 1)
        .attr("x1", (d) => d)
        .attr("y1", (d,i) => data.y[i])
        .attr("x2", (d,i) => data.x[i+1])
        .attr("y2", (d,i) => data.y[i+1])
  }
}
</script>

<style scoped>
.chart-container {
}
</style>
