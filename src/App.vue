<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
import {login} from '@/service/getData'
export default {
  created(){
    const data = {
      email:'123@123.com',
      password:'123456'
    }
    login(data).then(res=>{
      if(res.status === 200){
        let data = res.data
        localStorage.setItem('TOKEN',data.access_token)
        localStorage.setItem('TOKEN_TYPE',data.token_type)
      }else {
        alert('登录失败')
      }
    })
  }
} 
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
 .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }

</style>
