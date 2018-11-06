<template>
  <div class="tab-strategy-1">
    <div class="checkboxNav">
      <h3>各种功能组件弹窗</h3>
    </div>
    <div style="text-align: center;font-size:16px;">
      <ul>
        <li @click="checkboxShow">
          <a>checkbox全选/全不选/单选/横选/竖选</a>
        </li>
        <li @click="timeModalShow">
          <a>时间段跨天和不跨天不能重复的判断</a>
        </li>
        <li @click="sliderModalShow">
          <a>调光滑块</a>
        </li>
        <li @click="GOERROR">
          <a>500</a>
        </li>
      </ul>
    </div>
    <!--选择设备回路弹出框begin-->
    <strategy-loop-modal :LoopModel="LoopModel"
                         :LoopModalData="LoopModalData"
                         @modal-cancel="cancelStrategyLoop">
    </strategy-loop-modal>
    <!--时间方案模态框-->
    <time-plan-modal :modalShow="modalShow"
                     :TimeForm="TimeForm"
                     @modal-cancel="cancelTimePlan">
    </time-plan-modal>
    <!--滑块模态框-->
    <slider-modal :LightSliderModel="LightSliderModel"
                  @modal-cancel="cancelSliderModal"></slider-modal>
  </div>
</template>
<script>
  import timePlanModal from '../time-plan-modal/time-plan-modal';
  import strategyLoopModal from '../strategy-loop-model/strategy-loop-model';
  import sliderModal from '../slider-modal/slider-modal';
  export default {
    name:'tabStrategy1',
    components:{ timePlanModal,strategyLoopModal,sliderModal },
    data(){
      return {
        LoopModel:false,
        LoopModalData:[],//回路弹窗数据
        deviceList: [
          {
            deviceId: "105",
            deviceName: "百花洲道路测试控制器",
            id: 1850,
          },
          {
            deviceId: "106",
            deviceName: "",
            id: 2070
          },
          {
            deviceId: "107",
            deviceName: "控制器",
            id: 2071
          }
        ],
        modalShow: false, //时间方案模态框
        TimeForm:{
          time1_open: '',
          time1_close: '',
          time2_open: '',
          time2_close: '',
          time3_open: '',
          time3_close: '',
        },
        LightSliderModel: false, //滑块模态框
      }
    },
    methods:{
      //设备回路模态框打开
      checkboxShow(){
        this.LoopModel = true;
        let data = this.deviceList;
        let loopArr = [];
        for (let i = 0; i < data.length; i++) {
          let loopObj = {
            deviceId: data[i].deviceId,
            id: data[i].id,
            deviceName: data[i].deviceName,
            loopList: [false,false,false,false,false,false]
          };
          loopArr.push(loopObj);
        }
        this.LoopModalData = loopArr;
      },
      //设备回路模态框关闭
      cancelStrategyLoop(val){
        this.LoopModel = val;
      },

      //时间方案弹窗打开
      timeModalShow(){
        this.modalShow = true;
      },
      // 关闭模态框
      cancelTimePlan(val, form) {
        this.modalShow = val;
        this.TimeForm = form;
      },
      //滑块弹窗打开
      sliderModalShow(){
        this.LightSliderModel = true;
      },
      //滑块模态框关闭
      cancelSliderModal(val){
        this.LightSliderModel = val;
      },
      //
      GOERROR(){
        this.$router.push({ name:'error-500' })
      }
    },


  }
</script>
<style lang="less" scoped>
  .tab-strategy-1{
    margin:50px auto;
    padding:0 200px;
    width:100%;
    height:100%;
  }
  .checkboxNav{
    height:60px;
    line-height: 60px;
  }
  li{
    list-style: none;
  }


</style>
