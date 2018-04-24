<template>
  <div id="biobank-plots-tour">
    <button class="btn btn-sm btn-secondary d-none d-lg-block" @click="startTour()">
      <i class="fa fa-question-circle-o" aria-hidden="true"></i> Help
    </button>
    <v-tour name="biobankPlotsTour" :steps="steps" :callbacks="callbacks"></v-tour>
  </div>
</template>

<script>
  import VueTour from 'vue-tour'

  export default {
    name: 'biobank-plots-tour',
    components: {VueTour},
    props: [],
    data () {
      return {
        callbacks: {
          onPreviousStep: this.customPreviousStepCallback,
          onNextStep: this.customNextStepCallback,
          onStart: this.resetTour,
          onStop: this.resetTour
        }
      }
    },
    computed: {
      steps () {
        return [
          {
            target: '#biobank-plots-tour',
            content: `Welcome to the biobank plot aggregates. Let's get started!`,
            params: {
              placement: 'bottom'
            }
          },
          {
            target: '#application-container > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-3.col-xl-3 > div.d-none.d-lg-block.filter-container.p-4.mb-5 > div > div:nth-child(3) > div > div:nth-child(1) > div > div > div',
            content: `Select here a biobank of interest in order to receive the aggregates for the specific biobank. For now we select "PAN".`,
            params: {
              placement: 'bottom'
            }
          },
          {
            target: '#application-container > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-3.col-xl-3',
            content: 'Aggregates for biobank "PAN" are shown here. Hover over the bars to see the number of subjects per feature.',
            params: {
              placement: 'right'
            }
          },
          {
            target: '#application-container > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-3.col-xl-3 > div.d-none.d-lg-block.filter-container.p-4.mb-5',
            content: `Let's apply some more filters!`,
            params: {
              placement: 'left'
            }
          },
          {
            target: '#application-container > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-3.col-xl-3 > div.d-none.d-lg-block.filter-container.p-4.mb-5 > div > div:nth-child(3) > div > div:nth-child(2)',
            content: `Let's say sex is "male"`,
            params: {
              placement: 'top'
            }
          },
          {
            target: '#application-container > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-3.col-xl-3 > div.d-none.d-lg-block.filter-container.p-4.mb-5 > div > div:nth-child(3) > div > div:nth-child(3) > div',
            content: `... and ever smoked is "Yes"`,
            params: {
              placement: 'top'
            }
          },
          {
            target: '#application-container > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-3.col-xl-3 > div.d-none.d-lg-block.filter-container.p-4.mb-5 > div > div:nth-child(1) > div:nth-child(3)',
            content: `There are more plots available, let's look at "Age in years".`,
            params: {
              placement: 'left'
            }
          },
          {
            target: '#application-container > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-3.col-xl-3 > div.d-none.d-lg-block.filter-container.p-4.mb-5 > div > div:nth-child(1) > div:nth-child(3)',
            content: `The last tab: "Data available" contains plots regarding which type of samples are available.`,
            params: {
              placement: 'left'
            }
          },
          {
            target: '#application-container > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-3.col-xl-3 > div.d-none.d-lg-block.filter-container.p-4.mb-5 > div > div:nth-child(1) > div:nth-child(1) > h4',
            content: `If you want to start over, simply press the reset button!`,
            params: {
              placement: 'left'
            }
          }
        ]
      }
    },
    methods: {
      customPreviousStepCallback (currentStep) {
        if (currentStep === 2) {
          this.selectSomeFilters({biobank: 'PAN'})
        } else if (currentStep === 5) {
          this.selectSomeFilters({sex: ['male']})
        } else if (currentStep === 6) {
          this.selectSomeFilters({sex: ['male'], smoking: [true]})
        } else if (currentStep === 7) {
          document.querySelector('#age_years-tab').click()
        } else if (currentStep === 8) {
          document.querySelector('#data_type-tab').click()
        }
      },
      customNextStepCallback (currentStep) {
        if (currentStep === 1) {
          this.selectSomeFilters({biobank: 'PAN'})
        } else if (currentStep === 4) {
          this.selectSomeFilters({sex: ['male']})
        } else if (currentStep === 5) {
          this.selectSomeFilters({sex: ['male'], smoking: [true]})
        } else if (currentStep === 6) {
          document.querySelector('#age_years-tab').click()
        } else if (currentStep === 7) {
          document.querySelector('#data_type-tab').click()
        }
      },
      resetTour () {
        this.$store.commit('RESET_ALL_ACTIVE_FILTERS')
      },
      selectSomeFilters (filters) {
        this.$store.commit('UPDATE_ACTIVE_FILTERS', filters)
      },
      startTour () {
        this.$tours['biobankPlotsTour'].start()
      }
    }
  }
</script>
<style>
  #biobank-plots-tour {
    position: relative;
    z-index: 5;
  }

  .v-step {
    width: 20em;
  }
</style>
