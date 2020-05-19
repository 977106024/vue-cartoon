<template>
  <div class="home">
    <uploadPhoto/>
  </div>
</template>

<script>
// @ is an alias to /src
import uploadPhoto from '@/components/uploadPhoto.vue'

export default {
  name: 'Home',
  components: {
    uploadPhoto
  }
}
</script>
