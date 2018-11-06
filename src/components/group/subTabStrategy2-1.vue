<template>
  <div class="sub-tab-strategy-2_1">
    <h3>表格全选，并且离线状态设置disabled,下发按钮设置加载效果防止多次点击,以及表格的筛选和排序</h3>
    <i-table stripe class="lightBlue-header-table" :columns="syncColumns" :data="syncData"
             @on-select="tableSelect" @on-select-all="tableSelect"></i-table>
    <div class="footer">
      <Button type="primary" :loading="allSyncLoading" @click="allSync">
        <span v-if="!allSyncLoading">下发</span>
        <span v-else>下发中...</span>
      </Button>
    </div>
  </div>
</template>
<script>
  export default {
    name:'subTabStrategy2-1',
    data(){
      return{
          //表格数据
        syncColumns: [
          {
            title: '选择',
            align: 'center',
            type: 'selection',
          },
          {
            title: '状态',
            align: 'center',
            minWidth: 20,
            sortable: true,
            key: 'status',
            render: (h, params) => {
              let statusColor = '';
              let statusStr = "在线";
              if (params.row.status === 1) {//正常
                statusColor = '#63be34';
                params.row._disable = false;
              } else {
                statusColor = 'grey';
                statusStr = "离线";
                params.row._disable = true;
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
            title: '名称',
            align: 'center',
            key: 'id',
            minWidth: 100,
            filters: [
              {
                label: '1',
                value: 1
              },
              {
                label: '2',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.id === 1;
              } else if (value === 2) {
                return row.id === 2;
              }
            }
          }
        ],
        syncData: [],
        //选中的设备数据
        deviceSelect: [],
        //下发操作loading效果
        allSyncLoading:false
      }
    },
    methods:{
      // 表格的选中事件
      tableSelect(selection) {
        this.deviceSelect = selection;
      },
      // 批量下发
      allSync() {
        if(this.deviceSelect.length !== 0){
          this.$Modal.confirm({
            content: '确定要下发吗？',
            onOk: () => {
              this.allSyncLoading = true;
            }
          })
        }else {
          this.$Modal.error({
            content: '未选择'
          })
        }

      },
      init(){
        let _syncData= [
            {
              status:0,
              id: 2
            },
            {
              status:1,
              id: 1
            }
            ];
        for(let i=0;i<_syncData.length;i++){
          if(_syncData[i].status !== 1){
            _syncData[i]._disabled=true;
          }
        }
        this.syncData=_syncData;
      }
    },
    mounted(){
      this.init();
    }
  }
</script>
<style scoped>
  .sub-tab-strategy-2_1{
    padding:0 50px;
  }
  .lightBlue-header-table{
    margin:10px 0;
  }
  .footer{
    text-align: center;
  }
</style>
