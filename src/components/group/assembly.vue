<template>
  <div class="assembly">
    <div class="strategy-draw-nav">
      <div class="draw-details-tab">
        <div class="tab-strategy"
             v-for="(item,index) in tabList"
             v-if="item.show==='1'"
             :key="index"
             @click='changeTabStrategy(item,index)'>
          <Icon type="checkmark-round" v-if="index===tabChecked"></Icon>
          <span class="name">{{ item.name }}</span>
          <ul class="sub-tab-catalog" v-if="item.children.length>0">
            <li class="sub-item" v-for="(subItem,subIndex) in item.children"
                :key="subIndex"
                @click="changeSubTab(subItem,index)">
              {{ subItem.subName }}
            </li>
          </ul>
        </div>
      </div>
      <span class="back-img-btn" @click="goBack"></span>
    </div>
    <div class="draw-tab-content">
      <component v-bind:is="currentTabComponent" @turnTabComponent="turnTabComponent"></component>
    </div>
  </div>
</template>

<script>
  import TabStrategy1 from './tabStrategy1'
  import SubTabStrategy1 from './subTabStrategy2-1'
  import SubTabStrategy2 from './subTabStrategy2-2'
  import TabStrategy3 from './tabStrategy3'
  export default {
    name:'assembly',
    data(){
      return{
        tabChecked:0,
        currentTabComponent: null,
        tabList:[
          {   name: '组件一',
            children: [],
            component: TabStrategy1,
            key:'TabStrategy1',
            show:'1'
          },
          {
            name: '组件二',
            children: [
              {subName: '子组件1', component: SubTabStrategy1, key:'SubTabStrategy1'},
              {subName: '子组件2', component: SubTabStrategy2,key:'SubTabStrategy2'},
            ],
            show: '1'
          },
          {
            name: '组件三',
            children: [],
            component: TabStrategy3,
            key:'TabStrategy3',
            show: '1'
          },
        ]
      }
    },
    methods:{
      //tab切换
      changeTabStrategy(tabItem,tabIndex){
        if (tabItem.children.length > 0) {
          //无二级目录直接切换
          return;
        }
        if (tabItem.component) {
          this.currentTabComponent = tabItem.component;
          this.tabChecked = tabIndex;
          sessionStorage.currentTabComponent = tabItem.key;
        }
      },
      //tab二级目录切换
      changeSubTab(subTabItem,tabIndex){
        if (subTabItem.component) {
          this.currentTabComponent = subTabItem.component;
          this.tabChecked = tabIndex;
          sessionStorage.currentTabComponent = subTabItem.key;
        }
      },
      turnTabComponent(name){
        let componentObj = { TabStrategy1,SubTabStrategy1,SubTabStrategy2,TabStrategy3 };
        if (componentObj[name]) {
          this.currentTabComponent = componentObj[name];
          sessionStorage.currentTabComponent = name;
        }
        if (name.includes('TabStrategy1')){
          this.tabChecked = 0;
        } else if (name.includes('TabStrategy3')){
          this.tabChecked = 2;
        } else{
          this.tabChecked = 1;
        }
      },
      goBack(){
        this.$router.go(-1);
      }
    },
    mounted(){
      if (sessionStorage.currentTabComponent){
        this.turnTabComponent(sessionStorage.currentTabComponent);
      }else{
        this.turnTabComponent('TabStrategy1');
      }
    }
  }
</script>
<style lang="less">
  .assembly {
    width: 100%;
    height: auto;
    .strategy-draw-nav {
      font-size: 20px;
      width: 1240px;
      margin: 20px auto;
      padding: 20px 0 10px 0;
      position: relative;
      .back-img-btn{
        width: 40px;
        height: 40px;
        display: inline-block;
        background: url("../../images/back.png");
        background-size: cover;
        position: absolute;
        right: 5px;
        top: 15px;
        cursor: pointer;
        border-radius: 50%;
        &:hover {
          box-shadow: 0 1px 6px #2DB7F5;
          border-color: #2DB7F5;
        }
      }
      Button {
        float: right;
      }
    }
    .draw-details-tab {
      position: absolute;
      top: 15px;
      left: 180px;
      width: 920px;
      height:38px;
      .tab-strategy {
        width: 280px;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        text-align: center;
        margin-right: 40px;
        float: left;
        color: #fff;
        cursor: pointer;
        background-color: #3598DC;
        position: relative;
        &:nth-of-type(2) {
          background-color: #3598DC;
          .sub-item {
            background-color: #3598DC;
          }
        }
        &:nth-of-type(3) {
          background-color: #3598DC;
          .sub-item {
            background-color: #3598DC;
          }
        }
        &:hover {
          box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
          border-color: #0eade7;
          .name {
            font-size: 17px;
          }
          .sub-tab-catalog {
            display: block;
          }
        }
        &:last-child {
          margin-right: 0;
        }
        .sub-tab-catalog {
          color: #fff;
          display: none;
          position: absolute;
          top: 36px;
          left: 0;
          width: 280px;
          z-index: 20;

          .sub-item:hover {
            font-weight: bolder;
          }
        }
      }
    }
    .draw-tab-content{
      width: 100%;
      height: auto;
      background: #fff;
      margin-top:100px;
    }
  }
</style>
