<template>
  <div class="tab-strategy-3">
    <div id="container" class="mymap"></div>
    <div class="button-group">
      <input id="cityName" class="inputtext" placeholder="请输入城市的名称" type="text"/>
      <input id="query" class="button" value="到指定的城市" type="button"/>
    </div>
  </div>
</template>
<script>

  export default {
    name:'tabStrategy3',
    data(){
      return{
      }
    },
    methods:{
      //地图初始化
      loadmap(){
        const map = new AMap.Map('container', {
          resizeEnable: true
        });
        //设置城市
        AMap.event.addDomListener(document.getElementById('query'), 'click', function() {
          let cityName = document.getElementById('cityName').value;
          if (!cityName) {
            cityName = '北京市';
          }
          map.setCity(cityName);
        });
      }
    },
    mounted(){
      this.loadmap();  //加载地图和相关组件
    },

  }
</script>
<style scoped>
  .tab-strategy-3{
    margin:50px;
  }
  .mymap{
    width: 100%;
    height: 500px;
  }
  input[type="text"] {
    height: 25px;
    outline: none;
    border: 1px solid #CCCCCC;
    padding: 0 4px;
  }
</style>
