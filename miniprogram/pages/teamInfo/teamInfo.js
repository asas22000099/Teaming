// miniprogram/pages/teamInfo/teamInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[{"id":1,"name":2,"content":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},{"id":3,"name":4,"content":"bbbbb"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取所有与自己相关的队伍存到data，待实现
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //判断是否还有未显示的队伍，动态改变底部内容
  },

  edit: function(e){
    wx.navigateTo({
      url: '../editPage/editPage?id=' + e.currentTarget.id,
    })
  },

  filter: function(){
    //根据条件更改显示的队伍
  }
})