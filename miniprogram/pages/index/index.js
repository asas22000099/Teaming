//index.
import{request} from "../../request/index.js"
const app = getApp()


Page({
  data: {
    // 队伍信息
    teaminfo:[],
    // 用户的地理位置
    // userglobe:"",
  },
  //加载时发生：判断本地存储，获取队伍信息
  onLoad: function() {
    // console.log("ddddddddddd");
    this.getteaminfo();

   
  },
  // 获取队伍信息的函数
  getteaminfo()
  {
    const db = wx.cloud.database()
    const teams = db.collection('Team');
    var team_ids=[];
    teams.get().then(res=>{
      // console.log(res.data[0].deadline);
      // console.log(res.data[0].deadline.toLocaleDateString());
      for(var a=0;a<res.data.length;a++)
      {
        res.data[a].deadline=res.data[a].deadline.toLocaleDateString();
        team_ids.push(res.data[a]._id);
      }

      // this.setData({team_ids:team_ids});
      // console.log(team_ids);
      this.setData({
          teaminfo:res.data,
        })
    })
    console.log(team_ids);
    // .catch(err=>{
    //   console.log(err);
    // })
  //   //获取队伍member
  //   const members = db.collection('Member');
  //   console.log(team_ids);
  //   for(var a=0;a<team_ids.length;a++){
  //    console.log(team_ids[a]);
  //    var membernumber=0;
  //    members.where({
  //      team_id:team_ids[a]
  //    }).get({
  //      success:function(res){
  //        console.log(res.data);
  //      }
  //    }
  //    )


  //  }



  },
      


  // 页面下拉刷新，即执行getteaminfo
  onPullDownRefresh:function()
  {
    this.getteaminfo();
  },
})



