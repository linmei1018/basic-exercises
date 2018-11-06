<template>
  <Modal v-model="sliderModel"
         :title="'调光值'"
         @on-cancel="cancelSliderModal"
         width="520">
    <Slider v-model="controlDimmer"
            :tip-format="formatDimmer"></Slider>
    <div class="slider-dim">
                    <span v-for="n in dimmerTipBtn" class="sliderBtn" @click.stop="controlDimmer = n"
                          :class="controlDimmer === n ? 'active':''">{{n === 0 ? '关' : n + '%'}}</span>
    </div>
    <div slot="footer" align="center">
      <i-button @click="cancelSliderModal">取消</i-button>
      <i-button type="primary" @click="saveSliderModal">保存</i-button>
    </div>
  </Modal>
</template>
<script>
  export default {
    name:'slider-modal',
    props: {
      LightSliderModel: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return{
        sliderModel:this.LightSliderModel,
        controlDimmer: 0, //调光值
        dimmerTipBtn: [0, 20, 40, 60, 80, 100], // 调光按钮
      }
    },
    methods:{
      formatDimmer(val) {
        return '调光: ' + val + '%';
      },
      cancelSliderModal(){
        this.sliderModel = false;
      },
      saveSliderModal(){
        this.sliderModel = false;
      }
    },
    watch: {
      //打开模态框 父传子
      LightSliderModel(val) {
        this.sliderModel = val;
      },
      //关闭模态框 子传父
      sliderModel(val) {
        if (!val) {
          this.$emit('modal-cancel', val);
        }
      },
    }
  }
</script>
<style lang="less">
  .slider-dim {
    display: flex;
    .sliderBtn {
      flex: 1;
      width: 40px;
      height: 30px;
      line-height: 30px;
      display: block;
      background: #fff;
      margin: 10px 5px;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
    }
    .active {
      background: #2B85E4;
      color: #fff;
    }
  }
</style>
