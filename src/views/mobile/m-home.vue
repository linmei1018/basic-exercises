<template>
  <div class="box">
      <h3>{{ title }}</h3>
      <!--<ul  class="imgList">-->
        <!--<li v-for="(item,index) in imgs" :key="index">-->
          <!--<img  :src="item" />-->
        <!--</li>-->
      <!--</ul>-->
      <!--<p class="footer">-->
          <!--<a href="javascript:;" class="btn" data-control="prev" @click="btn('prev')">上一页</a>-->
          <!--<a href="javascript:;" class="btn" data-control="next" @click="btn('next')">下一页</a>-->
      <!--</p>-->
    <Carousel v-model="value" loop>
      <CarouselItem v-for="(item,index) in imgs" :key="index">
        <div class="demo-carousel">
          <img  :src="item" />
        </div>
      </CarouselItem>
    </Carousel>
      <!--<div class="loading">-->
        <!--<p class="progress">0%</p>-->
      <!--</div>-->
  </div>
</template>
<script>
  import con1 from "../../images/preloadImg/baby.jpg";
  import con2 from "../../images/preloadImg/baobao.jpg";
  import con3 from "../../images/preloadImg/dongman.jpg";
  import con4 from "../../images/preloadImg/girl.jpg";
  import con5 from "../../images/preloadImg/hema.jpg";
  import con6 from "../../images/preloadImg/luobo.jpg";
  import con7 from "../../images/preloadImg/maomi.jpg";
  import con8 from "../../images/preloadImg/nainiu.jpg";
  import con9 from "../../images/preloadImg/niuniu.jpg";
  import con10 from "../../images/preloadImg/tutu.jpg";
  import con11 from "../../images/preloadImg/wans.jpg";
  import con12 from "../../images/preloadImg/wawa.jpg";
  import con13 from "../../images/preloadImg/yuela.jpg";

  export default {
    name:'m-home',
    data(){
      return{
          value: 0,
          title:'',
          imgs:[
            con1,con2,con3,con4,con5,con6,con7,con8,con9,con10,con11,con12,con13
          ]
      }
    },
    mounted(){
      let len = this.imgs.length;
      this.title = (this.value + 1) + '/' + len;
    },
    methods:{
    }
  }
</script>
<style>
  li{
    list-style: none;
  }
  .box{
    text-align:center;
  }
  h3{
    height:30px;
  }
  .imgList{
    width:100%;
    height:200px;
    overflow: hidden;
  }
  img{
    display: block;
    width:100%;
    height:200px;
  }
  .btn{
    display:inline-block;
    height:30px;
    line-height:30px;
    border:1px solid #ccc;
    background-color:#fff;
    padding:0 10px;
    margin-right:50px;
    color:#333;
  }
  .btn:hover{
    background-color:#eee;
  }
  .loading{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:#eee;
    text-align:center;
    font-size:30px;
  }
  .progress{
    margin-top:300px;
  }
  .footer{
    margin:100px 0;
  }
</style>
