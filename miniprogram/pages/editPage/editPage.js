// miniprogram/pages/editPage/editPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    needAddress:false,
    amountLimit:false,
    dateLimit:false,
    date:null,
    curDate:null,
    teamid:null,
    title:null,
    member:-1,
    content:'',
    address:'',
    monthDay:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    picker:['a', 'b'],
    index:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    d = d.getDate();
    d += 1;
    if(d > this.data.monthDay[m - 1]){
      if(m != 2 || !((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) || d == 30){
        d = 1;
        m += 1;
      }
    }
    if(m > 12){
      y += 1;
      m = 1;
    }
    this.setData({
      curDate: y + '-' + m + '-' + d,
      teamid: options.id
    })
    console.log(this.data.teamid)
    var that = this
    const db = wx.cloud.database()
    db.collection("Team").doc(options.id).get({
      success:function(res){
        console.log(res)
        var indexi = -1;
        for(var i = 0;i < that.data.picker.length;i++){
          if(res["data"]["label_id"] === that.data.picker[i]){
            indexi = i;
            break;
          }
        }
        console.log(indexi)
        let data = res["data"]
        that.setData({
          needAddress: data["address"] !== "",
          amountLimit: data["max"] !== -1,
          dateLimit: data["deadline"].getFullYear() != data["create_time"].getFullYear() || data["deadline"].getMonth() != data["create_time"].getMonth() || data["deadline"].getDate() != data["create_time"].getDate(), 
          date: (data["deadline"].getFullYear() != data["create_time"].getFullYear() || data["deadline"].getMonth() != data["create_time"].getMonth() || data["deadline"].getDate() != data["create_time"].getDate()) ? data["deadline"].getFullYear() + '-' + (data["deadline"].getMonth() + 1) + '-' + data["deadline"].getDate() : that.data.curDate,
          teamid: data["_id"],
          title: data["team_name"],
          member:data["max"],
          content: data["information"],
          address: data["address"],
          index: indexi
        })
      }
    })
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

  switchAddress: function(e){
    this.setData({
      needAddress: e.detail.value
    })
  },

  switchAmount: function(e){
    this.setData({
      amountLimit: e.detail.value
    })
  },

  dateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },

  switchEndDate: function(e){
    this.setData({
      dateLimit: e.detail.value
    })
  },

  pickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  fill: function(e){
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
  },

  commit:function(e){
    var regNum = new RegExp('(^[1-9][0-9]*)|^0$','g')
    if(this.data.title === null){
      wx.showToast({
        title: '请输入队伍名称',
        icon: 'error'
      })
    }else if(this.data.needAddress && this.data.address === ''){
      wx.showToast({
        title: '请输入详细地址',
        icon: 'error'
      })
    }else if(this.data.amountLimit && regNum.exec(this.data.member) === null){
      wx.showToast({
        title: '请输入有效数字',
        icon: 'error'
      })
    }else if(this.data.index === -1){
      wx.showToast({
        title: '请选择队伍分类',
        icon: 'error'
      })
    }else{
      var that = this
      var now = null
      const db = wx.cloud.database()
      const team = db.collection("Team")
      team.doc(that.data.teamid).get({
        success:function(res){
          now = res["data"]["create_time"]
          team.doc(that.data.teamid).update({
            data:{
              address:that.data.address,
              max:that.data.member,
              label_id:that.data.picker[that.data.index],
              create_time:now,
              deadline:that.data.dateLimit ? new Date(that.data.date) : now,
              information:that.data.content,
              team_name:that.data.title,
              status:1
            },
            success:function(res){
              wx.showToast({
                title: '提交成功！',
                icon:"success"
              })
              wx.redirectTo({
                url: '../teamInfo/teamInfo',
              })
            },
            fail:function(res){
              wx.showToast({
                title: '提交失败！',
                icon:"error"
              })
            }
          })
        }
      })
    }
  }
})