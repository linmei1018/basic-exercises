<style lang="less" scoped>
  @import '../../style/HelloWorld.less';
</style>
<template>
  <div class="main">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1" >
              <div @click="changeTopMenu('apple')">
                <Icon type="ios-folder" />
                苹果
              </div>
            </MenuItem>
            <MenuItem name="2">
              <div @click="changeTopMenu('pear')">
                <Icon type="md-list-box" />
                梨子
              </div>
            </MenuItem>
          </div>
          <div class="layout-goLogin">
            <div @click="goLogin">
              <Icon type="md-person" size="30" style="color:#fff;" />
            </div>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-book" />
                水果
              </template>
              <MenuItem name="1-1">
                <div @click="changeTopMenu('banana')">香蕉</div>
              </MenuItem>
              <MenuItem name="1-2">
                <div @click="changeTopMenu('grape')">葡萄</div>
              </MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                组件
              </template>
              <MenuItem name="2-1">
                <div @click="changeTopMenu('assembly')">组件集合</div>
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>{{ ActiveName }}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', height: '100%', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <div class="main-container">
      <p class="ceshi">全局样式</p>
    </div>
  </div>
</template>

<script>
  import {HelloWorldInit} from '@/common/HelloWorld';
  export default {
    name: 'HelloWorld',
    data () {
      return {
          ActiveName: ''
      }
    },
    methods:{
      // toApple(){
      //   $('.main-container').css('background','yellow')
      //   this.$router.push({ name: 'apple' });
      // },
      changeTopMenu(name){
        sessionStorage.activeName = name;
        this.ActiveName = name;
        this.$router.push({
          name,
          query: {
            t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
          }
        });
      },
      //退出
      goLogin(){
        this.$router.push({ path: '/' });
        sessionStorage.clear();
        localStorage.clear();
        this.$Cookies.remove('JSESSIONID');
      },
    },
    mounted(){
      this.$router.push({ name: 'banana' });
      this.ActiveName = 'banana';
    }
  }
</script>


