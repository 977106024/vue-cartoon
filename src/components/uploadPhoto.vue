<template>
  <div class="uploadPhoto">
      <svg class="icon camera" aria-hidden="true">
        <use xlink:href="#icon-xiangji"></use>
     </svg>
  </div>
</template>

<script>
export default {
  name: 'uploadPhoto',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.uploadPhoto{
  padding-top: 10vh;
}
a {
  color: #42b983;
}
.camera{
  width: 4em;
  height: 4em;
}

</style>
