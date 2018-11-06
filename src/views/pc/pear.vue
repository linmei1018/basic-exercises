<template>
  <div class="pear">
    <h3>折叠面板加checkbox单选，勾选哪个就展开哪个</h3>
    <Collapse v-model="colValue">
      <Panel :name="item.id" :key="item.id" v-for="(item, index) in timePlanData" >
        <span class="lamp-time-title">{{item.name}}</span>
        <div @click.stop="" style="overflow: hidden; float: right">
          <Checkbox :value="timeChoose === item.id"
                    @on-change="timeChoose = (timeChoose === item.id ? '' : item.id); colValue = timeChoose"
                    class="rel-org-check"></Checkbox>
        </div>
        <div slot="content" style="overflow: hidden">
          <p v-for="timeItem in item" v-if="timeItem !== item.name && timeItem !== item.id">
            {{timeItem}}</p>
        </div>
      </Panel>
    </Collapse>
    <Button style="margin:10px" @click="goback" type="primary">退出</Button>
  </div>
</template>

<script>
  export default {
    name: 'pear',
    data(){
      return{
        colValue: '',
        timeChoose:'',
        timePlanData:[
          {
            id:'DLJFEDW',
            name:'史蒂夫·乔布斯',
            text:'1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人'
          },
          {
            id:'FEWPTN',
            name:' 斯蒂夫·盖瑞·沃兹尼亚克',
            text:'美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国'
          },
          {
            id:'MKPFOE',
            name:'乔纳森·伊夫',
            text:'现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果'
          }
        ]
      }
    },
    methods:{
      goback(){
        this.$router.push({ name: 'HelloWorld' });
      }
    }
  };

</script>
<style>
  .pear{
    width:1000px;
  }
</style>
