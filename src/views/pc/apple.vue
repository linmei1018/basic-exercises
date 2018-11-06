<template>
  <div class="apple">
    <div class="super-user-nav">
      <h3>第一个弹窗</h3>
      <div class="add-btn" @click="closeModal">
        <Icon size="20" type="md-close" />
      </div>
    </div>
    <div style="text-align:center;">
      <Row type="flex" justify="center" align="top">
        <i-col span="20">
          <Form ref="formCustom" :model="formCustom" :label-width="80">
            <FormItem label="Password" prop="passwd">
              <i-input type="password" v-model="formCustom.passwd"></i-input>
            </FormItem>
            <FormItem label="Confirm" prop="passwdCheck">
              <i-input type="password" v-model="formCustom.passwdCheck"></i-input>
            </FormItem>
            <FormItem label="Age" prop="age">
              <i-input type="text" v-model="formCustom.age" number></i-input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="modal2=true">跳转</Button>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </div>
    <Modal v-model="modal2" title="第二个弹窗" width="1000" class-name="vertical-center-modal" @on-cancel="modal2=false">
      <Row type="flex" justify="center" align="top">
        <i-col span="20">
          <p>内容</p>
        </i-col>
      </Row>
      <div class="footer" slot="footer" style="text-align: center">
        <i-button type="primary" @click="modal2=false" >取消</i-button>
        <i-button type="primary" @click="save" >保存</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'apple',
    data(){
      return{
        modal2:false,
        formCustom:{
          passwd: '',
          passwdCheck: '',
          age: ''
        },
      }
    },
    methods:{
      //保存
      save(){

      },
      //关闭弹窗
      closeModal(){
        this.$router.push({ name: 'HelloWorld' });
      }
    }
  };

</script>

<style lang="less">
.apple{
  padding:20px;
  width:600px;
  .super-user-nav{
    height:40px;
    line-height:40px;
    margin-bottom:20px;
    h3{
      float:left;
    }
    .add-btn{
      float:right;
      cursor:pointer;
    }
  }
}
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal{
    top: 0;
  }
}
</style>
