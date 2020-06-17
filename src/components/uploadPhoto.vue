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
import Exif from 'exif-js' //图片处理
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
    id:null,
  }),
  created(){
   
  },
  methods:{
    uploadImg(e){
      //按钮和loading
      this.loading = true
      this.success = false

      const file = e.target.files[0]
      this.imgPreview(file,(formData)=>{
         upload(formData).then(res=>{
        if(res.status === 200){
          this.imgUrl = res.data.img
          this.reviewImg = 'data:image/jpeg;base64,' + this.imgUrl
          this.id = res.data.id
          this.loading = false
          this.success = true
        }
      })
      })

      // return
      // this.preview(file)
      // const formData = new FormData()
      // formData.append('photo',file)

    },
    //转成base64预览
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
    },
    //图片处理函数
    imgPreview (file, callback) {
      const that = this
      // 创建一个reader
      const reader = new FileReader()
      const img = new Image()

      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // eslint-disable-next-line
        let Orientation = null
        // 去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, () => {
          Orientation = Exif.getTag(file, 'Orientation')
        })

        // 读取成功后的回调
        reader.onloadend = function () {
          console.log('==this.result===', this.result)
          const result = this.result
          img.src = result
          img.onload = function () {
            console.log('===Orientation===', Orientation)
            console.log('===img===', img)
            const data = that.compress(img, 0.7, Orientation)
            const blob = that.dataURItoBlob(data)
            const formData = new FormData()
            var nameImg = new Date().getTime() + '.jpg'
            formData.append('photo', blob, nameImg)
            // 发送请求
            // 代码自己写把formData传给后台就可以了
            callback(formData)
          }
        }
        // 将图片转成base64格式
        reader.readAsDataURL(file)
      } else {
        this.$toast('请上传正确的图片格式')
      }
},
// 压缩图片
compress (img, compressNum, Orientation) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const width = img.width
  const height = img.height
  canvas.width = width
  canvas.height = height
  // 铺底色
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (Orientation && Orientation !== 1) {
    switch (Orientation) {
      case 6:
        canvas.width = height
        canvas.height = width
        ctx.rotate(Math.PI / 2)
        ctx.drawImage(img, 0, -height, width, height)
        break
      case 3:
        ctx.rotate(Math.PI)
        ctx.drawImage(img, -width, -height, width, height)
        break
      case 8:
        canvas.width = height
        canvas.height = width
        ctx.rotate(3 * Math.PI / 2)
        ctx.drawImage(img, -width, 0, width, height)
        break
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height)
  }

  // 进行压缩 compressNum - 图片质量:取值范围为0到1
  const ndata = canvas.toDataURL('image/jpeg', compressNum)
  return ndata
},
// base64转成bolb对象
dataURItoBlob (base64Data) {
  var byteString
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1])
  } else {
    byteString = unescape(base64Data.split(',')[1])
  }
  var mimeString = base64Data
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]
  var ia = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
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
