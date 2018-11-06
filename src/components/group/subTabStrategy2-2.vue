<template>
  <div class="sub-tab-strategy-2_2">
    <div class="nav">
      <Icon type="android-calendar"></Icon>
      1、图表和表格模式
      2、图片轮播（走马灯）
      3、hover效果，鼠标移上去显示编辑和下发按钮
      <p class="strategy-bread">
            <span class="bread-item" :class="cardMode?'':'active'" @click="cardMode=false">
              <Icon type="ios-paper"></Icon> 表格
              <span class="separator" style="margin: 0 8px;color: #dddee1;">/</span>
            </span>
            <span class="bread-item" :class="cardMode?'active':''" @click="cardMode=true">
                <span class="link"><Icon type="android-apps"></Icon> 图文</span>
            </span>
      </p>
    </div>
    <div class="content">
      <!--表格模式列表begin-->
      <i-table class="darkBlue-table"
               v-if="!cardMode"
               :columns="modeColumns"
               :data="modeData" stripe></i-table>
      <!--表格模式列表end-->
      <!--图片模式列表begin-->
      <div class="card-box clearfix" v-if="cardMode">
        <div class="strategy-list-item"
             v-for="(strategyItem,strategyIndex) in modeData"
             :key="strategyIndex"
             @mouseover="mouseOverIndex = strategyIndex"
             @mouseout="mouseOverIndex = -1">
          <Carousel
            v-model="carouselVal[strategyIndex]"
            v-if="isStrategyPic(strategyItem.pics)"
            :autoplay="setting.autoPlay"
            :autoplay-speed="setting.autoPlaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow">
            <CarouselItem v-for="(img,imgIndex) in modeData[strategyIndex].pics.split(',')"
                          :key="imgIndex" class="img-item">
              <div class="img-box">
                <img :src="img" alt="">
              </div>
            </CarouselItem>
          </Carousel>
          <transition name="slide-fade">
            <div class="strategy-handle" v-if="mouseOverIndex === strategyIndex">
              <div class="handleBtn edit">编辑</div>
              <div class="handleBtn issue">下发</div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'subTabStrategy2-2',
    data(){
      return{
        cardMode:true,//图文模式卡片展示
        modeColumns: [
          {
            type: 'index',
            title: '序号',
            key: 'index',
            align: 'center',
          },
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
        ],
        modeData:[
          {
            pics:'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar,https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
          },
          {
            pics:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar,https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
          },
          {
            pics:'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }

        ],
        //鼠标移动显示编辑下发按钮的card
        mouseOverIndex: -1,
        //轮播效果
        carouselVal: [0, 0],
        setting: {
          autoPlay: false,
          autoPlaySpeed: 2000,
          dots: 'none',
          radiusDot: false,
          trigger: 'click',
          arrow: 'hover'
        },
      }
    },
    methods:{
      isStrategyPic(pics){
        if (pics===undefined) return false;
        return pics.length!==0;
      },
    }
  }
</script>
<style lang="less" scoped>
  .sub-tab-strategy-2_2{
    padding:0 50px;
    .nav{
      font-size: 20px;
      padding: 20px 0 20px 100px;
      .strategy-bread {
        display: inline-block;
        float: right;
        font-size: 15px;
        margin-right: 100px;
        .bread-item.active{
          color: rgb(87, 163, 243);
        }
        .bread-item{
          cursor: pointer;
        }
      }
    }
    .card-box{
      border-bottom: 1px solid #288aca;
    }
    .strategy-list-item {
      position: relative;
      width: 278px;
      height: 310px;
      border: 1px solid rgba(0, 0, 0, .2);
      float: left;
      margin: 10px;
      //
      &:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        border-color: rgba(0, 0, 0, .2);
      }
      img {
        width: 100%;
        height: 230px;
      }
    }
  }
</style>
