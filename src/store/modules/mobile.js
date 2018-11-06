/**
 * 手机页面
 * @type {{state: {}, mutations: {}, actions: {}}}
 */


const mobile = {
  state: {
  //   mMenuList:[...mobileRouter],
  //   mRoadMenuList:[...mobileRouter2],
    mActiveName:'',
  //   sseMData:''
  },
  mutations: {
    // updateMMenuList(state){
    //   state.mMenuList = mobileRouter
    // },
    // updateMRoadMenuList(state){
    //   state.mRoadMenuList = mobileRouter2
    // },
    updateMActiveName(state,name){
      state.mActiveName = name
    },
    // updateMSSeData(state,data){
    //   state.sseMData = data
    // },
  },
  actions: {}
};

export default mobile;
