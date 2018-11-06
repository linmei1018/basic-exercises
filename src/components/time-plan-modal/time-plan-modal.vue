<template>
  <Modal v-model="timeModal" :mask-closable=false :width="500" title="添加方案"
         @on-cancel="cancelTimePlan">
    <!--{{thisTimeForm}}-->
    <Form ref="thisTimeForm" :model="thisTimeForm" :rules="TimeValidate" :label-width=145
          label-position="right">
      <FormItem label="时间" prop="time">
        <TimePicker :editable='false'
                    :value="thisTimeForm.time1_open"
                    @on-change="thisTimeForm.time1_open=$event"
                    format="HH:mm"
                    placeholder="打开时间"
                    style="width: 110px;margin-right:16px;"></TimePicker>
        <TimePicker :editable='false'
                    :value="thisTimeForm.time1_close"
                    @on-change="thisTimeForm.time1_close=$event"
                    format="HH:mm"
                    placeholder="关闭时间"
                    style="width: 110px"></TimePicker>
      </FormItem>
      <FormItem label="时间">
        <TimePicker :editable='false'
                    :value="thisTimeForm.time2_open"
                    @on-change="thisTimeForm.time2_open=$event"
                    format="HH:mm"
                    placeholder="打开时间"
                    style="width: 110px;margin-right:16px;"></TimePicker>
        <TimePicker :editable='false'
                    :value="thisTimeForm.time2_close"
                    @on-change="thisTimeForm.time2_close=$event"
                    format="HH:mm"
                    placeholder="关闭时间"
                    style="width: 110px"></TimePicker>
      </FormItem>
      <FormItem label="时间">
        <TimePicker :editable='false'
                    :value="thisTimeForm.time3_open"
                    @on-change="thisTimeForm.time3_open=$event"
                    format="HH:mm"
                    placeholder="打开时间"
                    style="width: 110px;margin-right:16px;"></TimePicker>
        <TimePicker :editable='false'
                    :value="thisTimeForm.time3_close"
                    @on-change="thisTimeForm.time3_close=$event"
                    format="HH:mm"
                    placeholder="关闭时间"
                    style="width: 110px"></TimePicker>
      </FormItem>

    </Form>
    <div slot="footer" style="text-align: center">
      <Button type="primary" @click="saveTimePlan">保存</Button>
    </div>
  </Modal>
</template>

<script>
  import {checkConflictTime} from '@/common/checkTime';
    export default {
        name: "time-plan-modal",
        props: {
          modalShow: {
            type: Boolean,
            default: false
          },
          TimeForm:{
            type: Object,
          }

        },
        data(){
          //时间校验
          const validateTime = (rule, value, callback) => {
            callback();
          };
          return {
            timeModal: this.modalShow,        //模态框显示
            thisTimeForm: this.TimeForm,
            TimeValidate: {
              time: [
                {required: true, validator: validateTime, trigger: 'change'}
              ]
            }
          }
        },
        methods:{
          // 保存时间方案
          saveTimePlan() {
            let timeChecked = true;
            let time_1 =this.thisTimeForm[`time${1}_open`];
            let time_2 =this.thisTimeForm[`time${1}_close`];
            let time_3 =this.thisTimeForm[`time${2}_open`];
            let time_4 =this.thisTimeForm[`time${2}_close`];
            let time_5 =this.thisTimeForm[`time${3}_open`];
            let time_6 =this.thisTimeForm[`time${3}_close`];
            Array.prototype.notempty = function() {
              let arr = [];
              this.map(function(val) {
                if (val !== "" && val !== undefined) {
                  arr.push(val);
                }
              });
              return arr;
            };

            let ary = [time_1,time_2,time_3,time_4,time_5,time_6].notempty();
            let ayn = Array.from(new Set(ary)).notempty();
            if(ary.length !== ayn.length){
              this.$Message.info('时间发生冲突');
              return;
            }
            //根据类型判断是否选择时间
            if (time_1 === '' || time_2 === '' || time_1 === undefined || time_2 === undefined) {
              //定时开定时关
              this.$Message.info('请选择时间');
              return;
            }
            let param = {};
            this.$refs['thisTimeForm'].validate((valid) => {
              if (valid) {

                //定时开定时关
                for (let i = 0; i < 3; i++) {
                  let time_open = this.thisTimeForm[`time${i + 1}_open`];
                  let time_close = this.thisTimeForm[`time${i + 1}_close`];
                  if (time_open !== '' && time_close !== '') {
                    let val1 = this.thisTimeForm[`time${i}_open`];
                    let val2 = this.thisTimeForm[`time${i}_close`];

                    if (!checkConflictTime(val1, val2, time_open, time_close) && i > 0) {
                      timeChecked = false;
                    }
                    if (i === 2 && !checkConflictTime(this.thisTimeForm[`time${1}_open`], this.thisTimeForm[`time${1}_close`], time_open, time_close)) {
                      timeChecked = false;
                    }
                    else {
                      param[`time${i + 1}`] = `${time_open}&${time_close}`;
                    }

                  }
                }
                if (!timeChecked) {
                  this.$Message.info('时间发生冲突');
                  return;
                }
              }
            })

          },
          // 关闭模态框
          cancelTimePlan() {
            this.thisTimeForm = {
              time1_open: '', time1_close: '',
              time2_open: '', time2_close: '',
              time3_open: '', time3_close: '',
            };
            this.timeModal = false;
            this.$refs['thisTimeForm'].resetFields();
          },
        },
      watch: {
        modalShow(val) {
          this.timeModal = val;
        },
        timeModal(val) {
          if (!val) {
            this.$emit('modal-cancel', val, this.thisTimeForm);
          }
        },
        TimeForm(val) {
          this.thisTimeForm = val;
        }
      },

    }
</script>

<style scoped>

</style>
