<template>
  <Modal v-model="strategyLoopModel"
         :title="'选择设备回路'"
         @on-cancel="closeLoopModel"
         width="520">
    <ul class="addLoop-modal default-style-scroll">
      <li class="header">
        <ul>
          <li class="loop-item-header">
            <span class="control-name control-name-header">设备名称</span>
            <span class="loop-number-header" style="width:70px;">回路编号</span>
          </li>
          <li class="loop-item-header">
            <Checkbox class="all-loop front-checkbox"
                      :value="checkboxAllLoop"
                      @on-change="selectAllLoop()"></Checkbox>
            <ul class="checkbox-number">
              <li v-for="(verticalItem,index) in checkboxEachLoop"
                  class="checkboxList"
                  @click="selectVerticalLoop(index)">
                <checkbox :value="verticalItem"></checkbox>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="loop-item" v-for="(loopItem,index) in LoopModalData">
        <Checkbox class="single-all-loop front-checkbox"
                  :value="!LoopModalData[index].loopList.includes(false)"
                  @on-change="selectHorizonLoop(index)"></Checkbox>
        <span class="control-name"
              :key='loopItem.deviceId'>({{ loopItem.deviceId }}) {{ loopItem.deviceName||'' }}</span>
        <ul class="loop-item-list loop-number">
          <li v-for="(unitItem,unitIndex) in LoopModalData[index].loopList"
              :class="unitItem?'loop-list-checked':'loop-list'"
              @click="selectSingleLoop(index,unitIndex)">K{{ unitIndex+1 }}
          </li>
        </ul>
      </li>
    </ul>
    <div slot="footer" align="center">
      <i-button @click="cancelLoopModal">取消</i-button>
      <i-button type="primary" @click="saveLoopModal">保存</i-button>
    </div>
  </Modal>
</template>

<script>
    export default {
        name: "strategy-loop-model",
      props:{
        LoopModel:{
          type: Boolean,
          default: false
        },
        LoopModalData:{
          type:Array,
        }
      },
        data(){
          return{
            strategyLoopModel:this.LoopModel,
            checkboxAllLoop:false,//头部checkbox全选所有设备回路
            checkboxEachLoop:[false,false,false,false,false,false],//头部checkbox单个回路竖选集合
          }
        },
      methods:{
        //取消选择设备回路
        cancelLoopModal() {
          this.strategyLoopModel = false;
          this.checkboxAllLoop = false;
          this.LoopModalData.forEach((item) => {
            item.loopList = new Array(6).fill(false);
          });
          this.checkboxEachLoop = new Array(6).fill(false);
        },
        //关闭选择设备模态框
        closeLoopModel(){
          this.strategyLoopModel = false;
        },
        //全选所有设备回路
        selectAllLoop() {
          this.checkboxAllLoop = !this.checkboxAllLoop;
          let checked = this.checkboxAllLoop;
          this.LoopModalData.forEach((item) => {
            item.loopList = new Array(6).fill(checked)
          });
          this.checkboxEachLoop = new Array(6).fill(checked);
        },
        //竖选设备回路
        selectVerticalLoop(index) {
          this.checkboxEachLoop[index] = !this.checkboxEachLoop[index];
          let checked = this.checkboxEachLoop[index];
          this.checkboxAllLoop = !this.checkboxEachLoop.includes(false);
          this.LoopModalData.forEach((item) => {
            item.loopList.splice(index,1,checked);
          });
        },
        //横选设备回路
        selectHorizonLoop(index) {
          let checked = this.LoopModalData[index].loopList.includes(false);
          this.LoopModalData[index].loopList =new Array(6).fill(checked);
          //判断某个回路是否竖全选
          let hasEachLoop = [];
          this.LoopModalData.forEach((item) => {
            if (item.loopList.includes(false)){
              item.loopList.findIndex(function(value, listIndex) {
                if (!value&&!hasEachLoop.includes(listIndex)){
                  hasEachLoop.push(listIndex);
                }
              })
            }
          });
          for(let i = 0; i < 6; i++){
            this.checkboxEachLoop[i] = !hasEachLoop.includes(i)
          }
          //判断回路是否全选
          this.checkboxAllLoop = !this.checkboxEachLoop.includes(false);
        },
        //单选回路 deviceIndex设备索引，loopIndex回路索引
        selectSingleLoop(deviceIndex, loopIndex) {
          let checked = !this.LoopModalData[deviceIndex].loopList[loopIndex];
          this.LoopModalData[deviceIndex].loopList.splice(loopIndex,1,checked);
          let verticalCheck = true;
          this.LoopModalData.forEach((item) => {
            if (!item.loopList[loopIndex]){
              verticalCheck = false
            }
          });
          this.checkboxEachLoop[loopIndex] = verticalCheck;
          //判断回路是否全选
          this.checkboxAllLoop = !this.checkboxEachLoop.includes(false);
        },
        //保存选择设备回路操作
        saveLoopModal() {
          let isChoose = false;
          let i = 0;
          while (i < this.LoopModalData.length)
          {
            if (this.LoopModalData[i].loopList.includes(true)){
              isChoose = true;
              break
            }
            i++;
          }
          if (!isChoose){
            this.$Message.info('请选择设备回路');
          } else{
            this.strategyLoopModel = false;
          }

        },
      },
      watch: {
        LoopModel(val) {
          this.strategyLoopModel = val;
        },
        strategyLoopModel(val) {
          if (!val) {
            this.$emit('modal-cancel', val);
          }
        },
      }
    }
</script>

<style lang="less" scoped>
  //设备模态框
  li{
    list-style: none;
  }
  .addLoop-modal {
    margin: -16px;
    height: 500px;
    overflow: auto;
    .loop-item, .header {
      padding: 0 16px;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
    }
    .header {
      padding: 0 16px;
      height: 60px;
      font-size: 12px;
      font-weight: bold;
      background-color: #f8f8f9;
      .loop-item-header {
        height: 30px;
        line-height: 30px;
      }
    }
    .time-header {
      padding: 0 32px;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      font-weight: bold;
      background-color: #f8f8f9;
    }
    .front-checkbox {
      width: 12px;
    }
    .all-loop {
      margin-left: 25px;
    }
    .control-name {
      width: 200px;
      display: inline-block;
    }
    .control-name-header {
      margin-left: 10px;
    }
    .loop-number-header {
      width: 58px;
      text-align: center;
      display: inline-block;
      margin-left: 10px;
    }
    .loop-item {
      height: 40px;
      line-height: 40px;
      clear: both;
    }
  }

  .time-modal .control-name {
    width: 250px;
    display: inline-block;
  }

  .checkbox-number {
    padding-left: 234px;
  }

  .checkbox-number li {
    float: left;
    margin-right: 15px;
  }

  .addLoop-modal .front-checkbox,
  .loop-item .control-name,
  .loop-item-list {
    float: left;
  }

  .loop-item .control-name, .loop-item-list {
    padding-left: 5px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }

  .addLoop-modal .loop-item-list .loop-list,
  .addLoop-modal .loop-item-list .loop-list-checked {
    width: 32px;
    height: 20px;
    border-radius: 3px;
    line-height: 20px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    margin-right: 5px;
  }

  .addLoop-modal .loop-item-list .loop-list-checked {
    background: #2d8cf0;
    color: #fff;
    border: 1px solid #2d8cf0;
  }

  .addLoop-modal .loop-item-list .loop-list {
    background: #fff;
    color: #000;
    border: 1px solid #ccc;
  }
</style>
