// miniprogram/pages/teamInfo/teamInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"队伍信息",
        isActive:true
      },
      {
        id:1,
        value:"队伍成员",
        isActive:false
      }
    ],
    teaminfo:[],
    teammembers:[],

    memberList:[],
    team:{},
    message: "sss",
    delteID: 0,
    isManage: false,
    userID: '28ee4e3e60867cd612781c4e6bd0ae26',  //公共信息
    teamID: "b00064a760867de4117130e9399892fe",
    deleteList: []

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取所有与自己相关的队伍存到data，待实现
    const {team_id}=options;
    // console.log(team_id);
    this.getteaminfo(team_id);
    this.getteammember(team_id);
    this.setData({
      teamID: team_id
    })
    var that = this;

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getMember',
      // 传给云函数的参数
      data: {
        team_id:  team_id
      },
      success: function(res) {
        console.log(res.result) // 3
        that.setData({
          memberList: res.result.member.list,
          team: res.result.team.data
        })
        if (that.data.team.leader == that.data.userID) {
          that.setData({
            isManage: true
          })
        }
        else {
          that.setData({
            isManage: false
          })
        }
      },
      fail: console.error
    })
  },

  handleTabsItemChange(e)
  {
    // 这里有传过来的参数index
    // console.log(e);
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData(
      {tabs}
    )
  },
  getteaminfo(team_id)
  {
    const db = wx.cloud.database()
    // const teams = db.collection('Team');
    db.collection('Team').doc(team_id).get().then(res => {
      // res.data 包含该记录的数据
      // console.log("aaa");
      res.data.deadline=res.data.deadline.toLocaleDateString();
      res.data.create_time=res.data.create_time.toLocaleDateString();
      this.setData(
        {
          teaminfo:res.data
        }
      )
    })
  },

  getnickname: function (member_id)
  {
    var that=this;
    // console.log("ok");
    console.log(member_id);
    const db = wx.cloud.database()
          //获取队伍member
          const persons = db.collection('Person');
            persons.where({
              _id:member_id
            }).get({
              success:function(res){
                // console.log(res.data);
                let memberlist=that.data.teammembers;
                memberlist.push(res.data[0]);
                that.setData({teammembers:memberlist});


              }})
  },
  getteammember: function (options)
  {
    var that = this;
    const db = wx.cloud.database()
    //获取队伍member
    const members = db.collection('Member');
      members.where({
        team_id:options
      }).get({
        success:function(res){
          // console.log(res.data);
          var member_id_list=res.data;
          // console.log(member_id_list);
          for(var b=0;b<member_id_list.length;b++)
          {
            // console.log(member_id_list[b].member_id);
            
            that.getnickname(member_id_list[b].member_id);

          }
        }
      }
      )


    },

    showModal(e) {
      var idx = e.currentTarget.dataset.idx
      let memberList = this.data.memberList;
      let message = this.data.message;
      let deleteID = this.data.delteID;
      // this.setData({
      //   modalName: e.currentTarget.dataset.target,
      //   message: "确定将队员 " + memberList[idx].name + " 移除队伍吗？",  
      //   deleteID: idx
      // })  
      if (e.currentTarget.dataset.target == "DialogModal1") {
        this.setData({
          modalName: e.currentTarget.dataset.target,
          message: "确定将队员 " + memberList[idx].name + " 移除队伍吗？",  
          deleteID: idx
        }) 
      }
      else if (e.currentTarget.dataset.target == "DialogModal2") {
        let team = this.data.team
        this.setData({
          modalName: e.currentTarget.dataset.target,
          message: "确定退出队伍 " + team.name + " 吗？",  
          deleteID: idx
        }) 
      }
    },
  
    hideModal(e) {
      this.setData({
        modalName: null
      })
      var res = e.currentTarget.dataset.res
      // 根据传参键值，获取点击事件传来的image值
      if (res == "1") {
        let memberlist = this.data.memberList;
        memberlist[this.data.deleteID].isDelete = true
        var op = e.currentTarget.dataset.op
        if (op == "remove") {
          this.setData({
            memberList: memberlist,
            deleteID: 0,
            modalName: "Modal1",
            deleteList: this.data.deleteList.concat(memberlist[this.data.deleteID].member_id)
          }) 
          console.log(this.data.deleteList)
        }
        else if (op == "quit") {
          this.setData({
            memberList: memberlist,
            deleteID: 0,
            modalName: "Modal2",
            deleteList: this.data.deleteList.concat(memberlist[this.data.deleteID].member_id)
          }) 
          console.log(this.data.deleteList)
        }
        console.log("删除")
  
        var that = this;
        wx.cloud.callFunction({
          // 云函数名称
          name: 'deleteMember',
          // 传给云函数的参数
          data: {
            team_id:  this.data.teamID,
            deleteList: this.data.deleteList
          },
          success: function(res) {
            that.setData({
              deleteList: []
            })
          },
          fail: console.error
        })
        
      } else {
        console.log("不删除")
      }
    },
    
})