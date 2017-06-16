<template>
  <div class="row">
    <div class="col-md-10">
      <b-card>
        <h6 class="d3-header">{{title}}</h6>
        <div id="chart"></div>
      </b-card>
    </div>
    <div class="col-md-2">
      <selected-dot-information :yLabel="yLabel" :xLabel="xLabel" :xPos="xPos" :yPos="yPos"></selected-dot-information>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import _ from 'lodash'
  import SelectedDotInformation from './SelectedDotInformation'

  export default {
    name: 'd3-line-chart',
    props: ['data', 'height', 'width', 'title', 'xLabel', 'yLabel'],
    components: {SelectedDotInformation},
    data: function () {
      return {
        selected: 'Selected: ',
        xPos: '',
        yPos: ''
      }
    },
    computed: {
      hoverContent: {
        get: function () {
          return this.selected
        },
        set: function (content) {
          this.xPos = content.split(',')[0]
          this.yPos = content.split(',')[1]
          if (this.selected !== content) {
            this.selected = 'Selected:<br/>' + content
          }
        }
      }
    },
    mounted () {
      this.renderChart()
    },
    methods: {
      selectDot ($this) {
        d3.selectAll('circle').attr('style', 'fill:black')
        d3.select($this).attr('style', 'fill:red')
      },
      hoverDot ($this, myInstance) {
        const hoverDot = d3.select($this)
        const xPos = myInstance.data.xLabels[hoverDot.attr('xIndex')]
        const yPos = hoverDot.attr('yVal')
        myInstance.hoverContent = xPos + ',' + yPos
      },
      drawXAxis (x, height, labels, svg) {
        // http://bl.ocks.org/phoebebright/3061203
        labels = labels.map(function (label) {
          return parseInt(label)
        })
        // TODO: make configurable, year/number
        const xAxis = d3.axisBottom().scale(x).ticks(d3.timeYear)

        svg.append('g')
          .attr('class', 'xaxis')   // give it a class so it can be used to select only xaxis labels  below
          .call(xAxis)
          .attr('transform', 'translate(50,' + (height + 10) + ')')
      },
      drawYAxis (y, height, labels, svg) {
        // http://bl.ocks.org/phoebebright/3061203
        // TODO: add y labels somehow
        const yAxis = d3.axisLeft(y).scale(y)
        svg.append('g').attr('transform', 'translate(50,10)').attr('height', height + 20).call(yAxis)
      },
      addXLabel (width, height, label, svg) {
        svg.append('text')
          .attr('transform',
            'translate(' + (width / 2) + ' ,' +
            (height + 50) + ')')
          .style('text-anchor', 'middle')
          .text(label)
      },
      addYLabel (height, label, svg) {
        svg.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', 0 - (height / 2))
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text(label)
      },
      plotData (data, x, y, svg, myInstance) {
        x.domain(d3.extent(data, (d, i) => i))
        y.domain([0, d3.max(data, d => d)])
        const createPath = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d))
        // add the line
        svg.append('g').attr('transform', 'translate(50, 10)').append('path').attr('d', createPath(data)).attr('class', 'line')
        // add the scatterplot dots
        svg.selectAll('dot').data(data).enter().append('circle').attr('r', 3.5).attr('cx', (d, i) => x(i))
          .attr('cy', d => y(d)).attr('transform', 'translate(50, 10)').attr('xIndex', (d, i) => i).attr('yVal', (d, i) => d).attr('class', 'dot')
          .on('mouseover', function () {
            myInstance.hoverDot(this, myInstance)
          }).on('click', function () {
            myInstance.selectDot(this)
          })
      },
      renderChart () {
        const data = this.data.matrix.map(function (data) {
          return data[0]
        })
        const xlabels = this.data.xLabels
        // TODO: make generic for bigger datasets
        const ylabels = _.range(Math.max(data))
        const height = this.height
        const width = this.width
        const svg = d3.select('#chart')
          .append('svg')
          .attr('width', width + 60)
          .attr('height', height + 60)
        const x = d3.scaleTime().domain([new Date(xlabels[0], -0.5, 1), new Date(xlabels[xlabels.length - 1], -0.5, 1)]).range([0, width])
        const y = d3.scaleLinear().domain([ylabels[0], ylabels[ylabels.length - 1]]).nice().range([height, 0])
        this.drawXAxis(x, height, xlabels, svg)
        this.addXLabel(width, height, this.xLabel, svg)
        this.drawYAxis(y, height, ylabels, svg)
        this.addYLabel(height, this.yLabel, svg)
        this.plotData(data, x, y, svg, this)
        svg.attr('width', width + 60)
        svg.attr('height', height + 60)
      }
    }
  }
</script>

<style>
  .d3-header {
    color: black;
  }

  svg {
    /*background-color: rgba(255, 111, 152, 0.24);*/
    margin: 25px;
  }

  .line {
    fill: none;
    stroke: steelblue;
    stroke-width: 3px;
  }

  .selected {
    color: red;
  }
</style>
