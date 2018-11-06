<template>
  <div id="app" class="app-main">
      <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{

      }
    }
  };

</script>

<style lang="less" scoped>
  html{
    width: 100%;
    height: 100%;
  }
  body{
    width: 100%;
    height: 100%;
  }
.app-main{
  width: 100%;
  height: 100%;
}
</style>

