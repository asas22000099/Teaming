// miniprogram/pages/newTeam/newTeam.js
Page({

  // 需要获取表单中的所有信息存储到数据库，其他没有需要实现的内容
  /**
   * 页面的初始数据
   */
  data: {
    userid:null,
    title:null,
    member:null,
    content:null,
    ddl:null
  },

  //将表单中的所有信息存放进数据库，待实现
  commit: function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:1
      })
    }
  }
})