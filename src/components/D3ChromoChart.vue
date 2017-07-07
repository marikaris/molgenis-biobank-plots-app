<template>
  <div class="row">
    <div class="col-md-12">
      <b-card>
        <div id="bars"></div>
      </b-card>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'd3-chromo-chart',
    data: function(){
      chr6 = [[0, 2300000, 'p25.3'], [2300000, 4200000, 'p25.2'], [4200000, 7100000, 'p25.1'],
        [7100000, 10600000, 'p24.3'], [10600000, 11600000, 'p24.2'], [11600000, 13400000, 'p24.1'],
        [13400000, 15200000, 'p23'], [15200000, 25200000, 'p22.3'], [25200000, 27000000, 'p22.2'],
        [27000000, 30400000, 'p22.1'], [30400000, 32100000, 'p21.33'], [32100000, 33500000, 'p21.32'],
        [33500000, 36600000, 'p21.31'], [36600000, 40500000, 'p21.2'], [40500000, 46200000, 'p21.1'],
        [46200000, 51800000, 'p12.3'], [51800000, 52900000, 'p12.2'], [52900000, 57000000, 'p12.1'],
        [57000000, 58700000, 'p11.2'], [58700000, 61000000, 'p11.1'], [61000000, 63300000, 'q11.1'],
        [63300000, 63400000, 'q11.2'], [63400000, 70000000, 'q12'], [70000000, 75900000, 'q13'],
        [75900000, 83900000, 'q14.1'], [83900000, 84900000, 'q14.2'], [84900000, 88000000, 'q14.3'],
        [88000000, 93100000, 'q15'], [93100000, 99500000, 'q16.1'], [99500000, 100600000, 'q16.2'],
        [100600000, 105500000, 'q16.3'], [105500000, 114600000, 'q21'], [114600000, 118300000, 'q22.1'],
        [118300000, 118500000, 'q22.2'], [118500000, 126100000, 'q22.31'], [126100000, 127100000, 'q22.32'],
        [127100000, 130300000, 'q22.33'], [130300000, 131200000, 'q23.1'], [131200000, 135200000, 'q23.3'],
        [135200000, 139000000, 'q23.3'], [139000000, 142800000, 'q24.1'], [142800000, 145600000, 'q24.2'],
        [145600000, 149000000, 'q24.3'], [149000000, 152500000, 'q25.1'], [152500000, 155500000, 'q25.2'],
        [155500000, 161000000, 'q25.3'], [161000000, 164500000, 'q26'], [164500000, 171115067, 'q27'],
      ]
    },
    props: ['mutations', 'figureWidth', 'chr_size', 'height', 'patientIds'],
    mounted () {
      this.renderChart()
    },
    methods: {
      makeChromosome (){

      },
      makeBar (chart, patientId, transform) {
        const bar = chart.append('g')
          .attr('transform', 'translate(0,' + transform + ')')
        bar.append('rect')
          .attr('width', this.figureWidth)
          .attr('height', 19)
          .attr('id', 'total' + patientId)
          .attr('class', 'background-bar')
        return bar
      },
      addMutations (bar, patientMutations, patientId) {
        const self = this
        patientMutations.map(function (mutation) {
          console.log('mutations', mutation, patientId)
          let bp = self.figureWidth / self.chr_size
          let size = mutation.stop - mutation.start
          bar.append('rect').attr('width', size * bp).attr('height', self.height).attr('x', bp * mutation.start)
            .attr('id', patientId).attr('class', mutation.type)
        })
      },
      renderChart () {
        const self = this
        self.patientIds.map(function (patientId, i) {
          d3.select('#bars').append('div').attr('id', 'patient_container_' + self.patientId)
          let patientContainer = d3.select('#patient_container_' + self.patientId)
          patientContainer.append('div').attr('class', patientId).append('svg')
            .attr('class', 'chart').attr('id', 'patient' + patientId)
          let chart = d3.select('#patient' + patientId).attr('width', self.figureWidth).attr('height', self.height)
          let bar = self.makeBar(chart, patientId, i + 1)
          self.addMutations(bar, self.mutations[patientId], patientId)
        })
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

  rect.background-bar {
    fill: #99CCFF;
  }

  rect.del{
    fill:orange
  }

  rect.dup{
    fill:steelblue
  }
</style>
