'use strict';
/**
 * 用户角色与随机字母的映射，在其他地方可以使用 this.$roleMap['1'] 这种方式使用，其this对象是Vue实例，切记！！！！
 * @type {{"1": string, "2": string, "3": string}}
 */
const roleMap = {
  '1': 'wpoeriutwreioutk',//超级管理员
  '2': 'alh2324adadfasdf',//管理员
  '3': 'aijgdsadrf52'//操作员
};

export default roleMap;
