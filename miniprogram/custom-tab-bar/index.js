// miniprogram/pages/custom-tab-bar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:0,
    tabList:[
      {
        "pagePath": "pages/index/index",
        "text": "广场"
      },
      {
        "pagePath": "pages/teamInfo/teamInfo",
        "text": "发布"
      },
      {
        "pagePath": "pages/center/center",
        "text": "我的"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  switchTab: function (e) {
    let k = Number(e.currentTarget.dataset.index);
    let tab = this.data.tabList;
    let selected = this.data.selected;
    if(selected !== k){
      this.setData({
        selected: k
      });
      wx.switchTab({
        url: `/${tab[k].pagePath}`,
      })
    }
  }
})