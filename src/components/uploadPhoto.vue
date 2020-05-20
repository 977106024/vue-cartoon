<template>
  <div class="uploadPhoto">
      <svg class="icon camera" aria-hidden="true">
        <use xlink:href="#icon-xiangji"></use>
     </svg>
     <input type="file" accept="image/*" @change="uploadImg">
  </div>
</template>

<script>
import {upload} from '@/service/getData'
export default {
  name: 'uploadPhoto',
  props: {
    msg: String
  },
  created(){
    //  const data = {image:'xxxx'}
    //   upload(data).then(res=>{
    //     console.log(res)
    //   })
  },
  methods:{
    uploadImg(e){
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('photo',file)
      console.log(formData)
      const data = {image:formData}
      upload(formData).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.uploadPhoto{
  // padding-top: 10vh;
  position: relative;
  input[type=file]{
    width: 4em;
    height: 4em;
    position: absolute;
    top: 10.5vh;
    left: 50%;
    transform:translateX(-50%);
    opacity: 0;
  }
}
a {
  color: #42b983;
}
.camera{
  width: 4em;
  height: 4em;
  position: absolute;
  top: 10vh;
  left: 50%;
  transform:translateX(-50%);
}

</style>
