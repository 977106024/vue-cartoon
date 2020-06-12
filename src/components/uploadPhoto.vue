<template>
  <div class="uploadPhoto">
    <section class="upload">
      <svg class="icon camera" aria-hidden="true">
        <use xlink:href="#icon-xiangji"></use>
     </svg>
     <input type="file" accept="image/*" @change="uploadImg">
     <img class="preview" :src="reviewImg" alt="">
    </section>

     <section class="select">
      <label class="radio" ><input v-model="selected" name="gender" type="radio" value="true" required>戴口罩</label>
      <label class="radio" ><input  v-model="selected" name="gender" type="radio" value="false" required>无</label>
     </section> 

     <section class="submit">
       <button @click="submit" :class={show:success} :disabled="!success">确定</button>
        <img class="loading" v-show="loading" src="@/assets/images/loading.gif" alt="">
     </section>

  </div>
</template>

<script>
import {upload,getCartoon} from '@/service/getData'
export default {
  name: 'uploadPhoto',
  props: {
    msg: String
  },
  data:() =>({
    reviewImg:'1111',
    selected:false,
    imgUrl:null,
    success:false,
    loading:false,
    id:null
  }),
  created(){
   
  },
  methods:{
    uploadImg(e){
      //按钮和loading
      this.loading = true
      this.success = false

      const file = e.target.files[0]
      this.preview(file)
      const formData = new FormData()
      formData.append('photo',file)


      upload(formData).then(res=>{
        if(res.status === 200){
          this.imgUrl = res.data.img
          this.id = res.data.id
          this.loading = false
          this.success = true
        }
      })
    },
    preview(file){

       var reads = new FileReader()
       reads.readAsDataURL(file)
       let _this = this
       reads.onload = function(e) { //图片转成城base64
         _this.reviewImg = this.result
      };
    },
    submit(){
      this.loading = true

      if(!this.imgUrl)return
      let type = Boolean(this.selected) ? 'anime_mask' : 'anime'
      const data = {
        id:this.id,
        imgUrl:this.imgUrl,
        type:type,
        mask_id:Math.floor(Math.random()*8 +1)
      }
      getCartoon(data).then(res=>{
        if(res.status === 200){
            this.reviewImg = res.data.img
            this.loading = false
        }
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
    z-index: 99;
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
  z-index: 98;
}

.upload{
  height: 30vh;
  width: 60vw;
  margin: 5vh auto;
  border: 5px solid #ccc;
  border-radius: 15px;
  position: relative;
  .preview{
    width: 60vw;
    height:30vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // z-index: -1;
  }
}


section.select {
    /* margin: 0 auto; */
    display: flex;
    align-items: center;
    justify-content: center;
}
.select label:last-child{
  margin-left: 50px;
}
/* start radio 样式重写*/
.radio {
    display: inline-block;
    position: relative;
    width: 50px;
}
 
.radio input[type="radio"] {
    position: absolute;
    width: 0;
    height: 0;
}
 
input[type="radio"]:after {
    content:'';
    background-image: url(../assets/images/radio.jpg);
    background-size:20px 20px;
    width:20px;
    height:20px;
    position: absolute;
    z-index: 100;
    right: 10px;
    top: -4px;
    margin-top: 2px;
}
 
input[type="radio"]:checked:after {
    background-image: url(../assets/images/radioActive.jpg);
    background-size:18px 18px;
    width:18px;
    height:18px;
    margin-top: 2px;
}

//提交
.submit{
  padding-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  button{
    color: white;
    font-size: 15px;
    font-family: YouYuan;
    padding:18px 50px;
    border: none;
    border-radius: 5px;
    background: #eee;
    // background: rgb(247, 181, 44);
  }
  button.show{
    background: rgb(247, 181, 44);
  }
  .loading{
    width: 35px;
    height: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding-top: 10vh;
  }
}
 

</style>
