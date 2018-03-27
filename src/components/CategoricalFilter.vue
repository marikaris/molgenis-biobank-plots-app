<template>
  <div class="dropdown">
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      All biobanks
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#" v-for="option in refOptions">{{option}}</a>
    </div>
  </div>
</template>
<script>
  import {GET_REF_DATA} from '../store/actions'

  export default {
    name: 'boolean-filter',
    props: [
      'label',
      'id',
      'optionsUri'
    ],
    computed: {
      refOptions () {
        return this.$store.state.refOptions[this.id]
      }
    },
    watch () {},
    mounted () {
      this.$store.dispatch(GET_REF_DATA, [this.optionsUri, this.id])
    }
  }
</script>
