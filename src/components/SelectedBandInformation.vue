<template>
  <b-card header="Selected">
    <small>
      <b>Band</b>: {{band}}<br/>
      <b>Genomic position</b>: {{start}}-{{stop}}<br/>
    </small>
  </b-card>
</template>

<script>
  export default {
    name: 'selected-dot-information',
    props: ['start', 'stop', 'band']
  }
</script>
