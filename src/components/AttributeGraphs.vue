<template>
    <div v-if="attributeCharts && attributeCharts.gender && attributeCharts.smoking">
      <b-card show-header variant="primary">
        <div class="row">
          <div class="col-md-12">
            <d3-line-chart :data="[10,12,14,18,19]" height="400" title="Test"></d3-line-chart>
          </div>
        </div>
      </b-card>
    </div>

</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import AttributeGraph from './AttributeGraph'
  import PieGraph from './PieGraph'
  import D3LineChart from './D3LineChart'
  import { chartColors, chartColorsGradient } from '../utils'

  export default {
    name: 'attribute-graphs',
    components: {AttributeGraph, PieGraph, D3LineChart},
    data: () => ({
      chartColors,
      chartColorsGradient
    }),
    computed: {
      ...mapGetters(['attributeCharts']),
      ...mapState(['biobank'])
    }
  }
</script>
<style scoped>
  .chart-header{
    color: #292b2c;
    text-align: center;
  }
</style>
