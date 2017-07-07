<template>
  <div id="app">
    <div id="header">

    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <d3-chromo-chart :height="chromoChart.height" :figureWidth="chromoChart.figureWidth"
                           :patientIds="chromoChart.patientIds" :chr_size="chromoChart.chr_size"
                           :mutations="chromoChart.mutations"></d3-chromo-chart>
          <d3-line-chart :data="lineChart.data" :width="lineChart.width" :height="lineChart.height"
                         :title="lineChart.title" :xLabel="lineChart.xLabel" :yLabel="lineChart.yLabel"></d3-line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import D3LineChart from './components/D3LineChart'
  import D3ChromoChart from './components/D3ChromoChart'

  export default {
    name: 'app',
    components: {
      D3LineChart,
      D3ChromoChart
    },
    data () {
      return {
        lineChart: {
          data: {
            matrix: [
              [
                12,
                0,
                8,
                8,
                0,
                4,
                0
              ],
              [
                8,
                4,
                8,
                0,
                2,
                10,
                6
              ],
              [
                4,
                0,
                14,
                2,
                0,
                4,
                0
              ],
              [
                0,
                2,
                2,
                6,
                0,
                2,
                10
              ],
              [
                0,
                0,
                8,
                2,
                0,
                4,
                0
              ],
              [
                2,
                2,
                8,
                10,
                0,
                6,
                0
              ],
              [
                2,
                2,
                2,
                2,
                3,
                0,
                0
              ],
              [
                8,
                0,
                4,
                0,
                0,
                4,
                2
              ],
              [
                2,
                6,
                4,
                0,
                6,
                0,
                6
              ],
              [
                8,
                8,
                10,
                2,
                2,
                2,
                0
              ],
              [
                2,
                10,
                4,
                0,
                6,
                6,
                0
              ],
              [
                12,
                0,
                4,
                2,
                0,
                4,
                6
              ],
              [
                2,
                0,
                4,
                2,
                0,
                8,
                2
              ]
            ],
            yLabels: [
              'UFO',
              'centaur',
              'fairy',
              'gnome',
              'mermaid',
              'unicorn',
              'vampire'
            ],
            xLabels: [
              '1998',
              '1999',
              '2000',
              '2001',
              '2002',
              '2003',
              '2004',
              '2005',
              '2006',
              '2007',
              '2008',
              '2009',
              '2010'
            ]
          },
          width: 800,
          height: 400,
          title: 'UFO sightings per year',
          xLabel: 'Year',
          yLabel: 'Sightings'
        },
        chromoChart: {
          mutations: {
            hoi: [
              {
                'start': 2000000,
                'stop': 3000000,
                'type': 'del'
              }
            ],
            doei: [{
              'start': 20330000,
              'stop': 30330000,
              'type': 'del'
            }, {
              'start': 56000000,
              'stop': 66000000,
              'type': 'del'
            }]
          },
          height: 20,
          figureWidth: 800,
          patientIds: ['hoi', 'doei'],
          chr_size: 170805979
        }
      }
    }
  }
</script>
