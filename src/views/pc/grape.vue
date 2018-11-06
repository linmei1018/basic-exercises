<template>
  <div class="add-data-com">
    <div class="wall-lamp-nav">
      <Icon type="merge"></Icon>
      XXXXXX列表
      <Button type="primary" size="small" class="nav-add" @click="addWall">
        添加
      </Button>
    </div>
    <div class="wall-lamp-content">
      <i-table stripe class="lightBlue-header-table" :columns="wallLampColumns" :data="wallLampData"></i-table>
    </div>

    <!--XX添加和编辑弹出框begin-->
    <Modal v-model="wall_Lamp_Mode" @on-cancel="wallLampCancel" style="width: 540px">
      <p slot="header">
        <span class="modal-header">{{title}}</span>
      </p>
      <Row type="flex" justify="center" align="top">
        <i-col span="22">
          <Form ref="chipLampCustom" :model="chipLampCustom" :rules="chipLampRules" :label-width="120">
            <FormItem label="XX名称：" prop="name">
              <i-input v-if="isEditFlag" type="text" v-model.trim="chipLampCustom.name" readonly ></i-input>
              <i-input v-else type="text" v-model.trim="chipLampCustom.name" :maxlength="20"
                       placeholder="请输入XX名称"></i-input>
            </FormItem>
            <FormItem label="XXX数量：" prop="chip_num">
              <i-input type="text"
                       v-model.trim="chipLampCustom.chip_num"
                       @on-change="toChipType(chipLampCustom.chip_num)"
                       placeholder="请输入XX数量"
                       number
                       :maxlength="1"></i-input>
            </FormItem>
            <FormItem label="XX类型:"
                      prop="chip_type">
              <div v-for="(chipItem,chipIndex) in chipInfo"
                   style="margin-bottom: 5px;position:relative;">
                <Select  v-model.trim="chipItem.count"
                         :placeholder="'第'+ (chipIndex + 1) + '个XX类型'"
                         :maxlength="3" number
                         style="width:290px;">
                  <Option v-for="typeItem in chipTypeList" :value="typeItem.id" :key="typeItem.id">
                    {{ typeItem.name }}
                  </Option>
                </Select>
                <span v-if="chipIndex!==0"
                      @click="removeChip(chipIndex)"
                      style="cursor: pointer;position:absolute;top:4px;right:5px;">
                                    <Icon type="md-close-circle" size="24" />
                                </span>
              </div>
              <div>
                <Button type="dashed" long
                        v-if="chipInfo.length!==8"
                        @click="addChipType()"
                        icon="plus-round" style="width:290px;">添加XX类型</Button>
              </div>
            </FormItem>
          </Form>
        </i-col>
      </Row>
      <div slot="footer" align="center">
        <Button @click="wallLampCancel">取消</Button>
        <Button  v-if="isEditFlag" @click="saveWallLampEdit" type="primary" :loading="lampLoading">保存</Button>
        <Button v-else @click="saveWallLampAdd" type="primary" :loading="lampLoading">保存</Button>
      </div>
    </Modal>
    <!--XX添加和编辑弹出框end-->
  </div>
</template>

<script>
  export default {
    name: "grape",
    data() {
      //片选器数量校验
      const validateChipNum = (rule, value, callback) => {
        if (!value||Number(value)<=0) {
          return callback(new Error('请选择XX数量'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('必须是纯数字，不包含小数和负数'));
        }else{
          if (value>8||value<0){
            callback(new Error('XX数量不能大于8个'));
          }else{
            callback()
          }
        }
      };
      const validateChipType = (rule, value, callback) => {
        callback()
      };
      return {
        title:'', //弹出框标题、
        isEditFlag: false,//是否为编辑
        currentProjectName: sessionStorage.projectName, // 项目名称
        // 模态框表单验证
        chipLampRules: {
          name: [{required: true, message: 'XX名称不能为空', trigger: 'blur'}],
          chip_num: [{ required: true, validator: validateChipNum, trigger: 'blur' }],
          chip_type: [{ required: true, validator: validateChipType, trigger: 'change' }],
        },
        wall_Lamp_Mode: false, // 模态框控制
        // XX类型
        chipTypeList: [],
        // XX信息
        chipInfo: [],
        lampLoading: false, // 保存按钮的禁用状态
        //模态框数据
        chipLampCustom: {
          name: '',
          chip_type: '',
          chip_num: '',
          num: 1,
        },
        wallLampColumns: [
          {
            title: '序号',
            align: 'center',
            type: 'index'
          },
          {
            title: 'XX名称',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              let name = `(${params.row.id})${params.row.name || ''}`;
              return h('span', {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              }, name);
            }
          },
          {
            title: 'XX数量',
            key: 'deviceNum',
            align: 'center',
          },
          {
            title: '设备状态',
            align: 'center',
            minWidth: 20,
            sortable: true,
            key: 'status',
            render: (h, params) => {
              let statusColor = '';
              let statusStr = "在线";
              if (params.row.status === 1) {//正常
                statusColor = '#63be34'
              } else {
                statusColor = 'grey';
                statusStr = "离线"
              }
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'ios-radio-button-on',
                    color: statusColor
                  }
                }),
                h('span', {
                  style: {
                    color: 'grey',
                    marginRight: '10px',
                    marginLeft: '5px'
                  }
                }, statusStr)
              ])
            },
          },
          {
            title: 'XX下发',
            align: 'center',
            render: (h, param) => {
              let that = this;
              let syncClass = 'release-btn controlBtn';
              return h('div', [
                h('Button', {
                  'class': syncClass,
                  on: {
                    click: function () {
                      that.$Modal.confirm({
                        content: '确定要下发吗？',
                      })
                    }
                  }
                }, '下发')
              ])
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              let that = this;
              return h('div', [
                h('a',
                  {
                    style: {
                      marginRight: '12px'
                    },
                    on: {
                      click: function () {
                        that.wall_Lamp_Mode = true;
                        that.title='编辑XX';
                        that.isEditFlag = true;
                        that.chipLampCustom.name = params.row.name;
                        that.chipLampCustom.chip_num = params.row.deviceNum;
                        sessionStorage.WallGateWayId = params.row.id;
                        //填充XX类型数据
                        let arr = params.row.deviceData.split('&');
                        let chipInfoArr = [];
                        for(let i=0;i<arr.length;i++){
                          let obj ={
                            num:i+1,
                            count:arr[i],
                          };
                          chipInfoArr.push(obj)
                        }
                        that.chipInfo = chipInfoArr;
                      }
                    }
                  }, '编辑'),
              ])
            }
          }
        ],
        // XX数据
        wallLampData: [
          {
            name:'FDSAF',
            deviceNum: 2 ,
            status: 0,
            id: '1',
            deviceData: "21H74549682MH59F&21H74549682MH59F"
          },
          {
            name:'LIOES',
            deviceNum: 1 ,
            status: 0,
            id: '201',
            deviceData: "21H74549682MH59F"
          }
        ]
      }
    },
    methods: {
      // 模态框关闭
      wallLampCancel() {
        this.wall_Lamp_Mode = false;
        this.$refs['chipLampCustom'].resetFields();
        this.chipInfo.length=1;
      },
      //添加
      addWall(){
        this.wall_Lamp_Mode=true;
        this.title='添加XX';
        this.isEditFlag=false;
        let arr =[];
        let obj= {
          num: 1,
          count: ''
        };
        arr.push(obj);
        this.chipInfo = arr;
      },
      //XX数量对应类型数量
      toChipType(num){
        this.chipInfo.length=1;
        for(let i=0;i<num-1;i++){
          let num = (i+2);
          let chipArr = {
            num: num,
            count: ''
          };
          this.chipInfo.push(chipArr);
        }
      },
      //添加保存
      saveWallLampAdd(){
        this.$refs['chipLampCustom'].validate((valid) => {
          if (valid) {
            let that = this;
            for(let i=0;i<this.chipInfo.length;i++){
              if(this.chipInfo[i].count===''){
                this.$Message.info('请选择XX');
                return;
              }
            }
          }
        })

      },
      //编辑保存
      saveWallLampEdit(){
        this.$refs['chipLampCustom'].validate((valid) => {
          if (valid) {
            let that = this;
            for(let i=0;i<this.chipInfo.length;i++){
              if(this.chipInfo[i].count===''){
                this.$Message.info('请选择XX类型');
                return;
              }
            }
          }
        })

      },
      // 删除XX类型
      removeChip(index) {
        if(index!==0){
          this.chipInfo.splice(index,1);
          this.chipLampCustom.chip_num = this.chipInfo.length;
        }
      },
      //添加XX类型
      addChipType(){
        if (this.chipInfo.length!==8){
          this.chipInfo.push({
            num: this.chipInfo.length,
            count: ''
          });
          this.chipLampCustom.chip_num = this.chipInfo.length;
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  .add-data-com {
    .wall-lamp-nav {
      font-size: 20px;
      padding: 20px 100px;
      .nav-add {
        margin-left: 15px;
        font-size: 11px;
      }
      .nav-back {
        float: right;
      }
    }
    .wall-lamp-content {
      padding: 0 100px;
      clear: both;
    }
  }
  .release-btn {
    padding: 0 !important;
    font-size: 11px;
    width: 45px;
    height: 22px;
    line-height: 22px;
    background: #fff;
    border-radius: 4px;
    margin: 0 5px;
    cursor: pointer;
    vertical-align: middle;
    outline: none;
    &.controlBtn {
      border: 1px solid #2C9EE8;
      color: #2C9EE8;
      &:hover {
        color: #fff;
        background: #2C9EE8;
      }
    }
  }
</style>
