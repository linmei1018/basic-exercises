<style lang="less">
  @import "./mobileMain.less";
</style>
<template>
  <div class="m-main">
    <div class="m-main-header">
      <div class="project-header">
        <span class="name">{{ currentProject.projectName }}</span>
        <span style="float:right;padding-right:10px;" @click="showProject = !showProject"><Icon type="md-add" size="22"></Icon></span>
      </div>
      <ul class="projectMenu" v-if="showProject">
        <li class="list" v-for="(item,index) in userProject"
            :key="item.projectId" @click="chooseProject(item.id,item.projectName,index)">{{ item.projectName }}</li>
      </ul>
    </div>
    <div class="m-main-container">
      <router-view></router-view>
    </div>
    <div class="m-main-footer">
      <Row class="m-menu">
        <i-col span="11" v-for="item in mMenuList.children" :key="item.name">
          <div class="list"
          :class="item.name=== mActiveName?'active':''" @click="clickMenu(item.name)">
            <Icon size="24"  :type="item.icon"></Icon>
            <p>{{ item.title }}</p>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mobileMain",
    components: {},
    data() {
      return{
        currentProject:{projectName:'名称',id:'',projectType:''}, //当前项目
        userProject:[
          {
            projectId: 1,
            projectName:'名称法定洒',

          },
          {
            projectId: 2,
            projectName:'发达了Greg',

          },
          {
            projectId: 3,
            projectName:'放大噶呃呃呃呃呃呃而',

          }
        ],//用户项目集
        showProject:false//是否显示用户项目列表
      }
    },
    computed:{
      mMenuList(){
          return {children:[
              {
                name:'home',
                icon:'md-home',
                title:'首页'
              },
              {
                name:'person',
                icon:'md-person',
                title:'我'
              },
            ]};
      },
      mActiveName(){
        return this.$store.state.mobile.mActiveName;
      }
    },
    methods:{
      goPerson(){

      },
      //点击菜单栏选项
      clickMenu(name){
        //sessionStorage只存菜单栏选项
        sessionStorage.activeName = name;
        this.$store.commit('updateMActiveName',name);
        this.$router.push({name:name});
      },
      chooseProject(id,name,index){
        this.showProject = false;
        this.currentProject.projectName = name;
      },

    },
    mounted(){
      this.$router.push({ name: 'home' });
      this.$store.commit('updateMActiveName','home');
    }
  }

</script>
