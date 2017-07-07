<template>
  <b-card header="Selected">
    <b>{{xLabel}}</b> : {{xPos}}<br/>
    <b>{{yLabel}}</b> : {{yPos}}<br/>
  </b-card>
</template>

<script>
  export default {
    name: 'selected-dot-information',
    props: ['xPos', 'yPos', 'xLabel', 'yLabel']
  }
</script>
