import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    teaminfo:[],
    // 输入框的值
    inpValue:"",
    value:"",
    searched:false,
    loading:false,
    searchover:false,

    tabs:[{
      _id: "",
      name: "全部",
      isActive: true
    }]
  },
  TimeId:-1,
  // 输入框的值改变 就会触发的事件
  handleInput(e){
    // 1 获取输入框的值
    const {value}=e.detail;
    // 2 检测合法性
    // if(!value.trim()){
    //   this.setData({
    //     teaminfo:[],
    //     value:value
    //   })
    //   // 值不合法
    //   return;
    // }
    this.setData({
      value: e.detail.value.replace(/\s+/g, '')
    })
    
  },
  //取消
  cancelinput(){
    this.setData({
      inpValue:""})
  },
  //处理搜索
  handlesearch(){
    this.setData({searched:true});
    // 3 准备发送请求获取数据
    var that=this;
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      console.log(that.data.value)
      var value=that.data.value;
      console.log(value);
      this.formSubmit(value);
    }, 1000);

  },
  //模糊搜索
  async formSubmit(e) {
    const db = wx.cloud.database()
    const team = db.collection('Team');
    const _ =db.command;
    var code = e
    console.log(code);
    this.setData({loading:true});
    if (code == "") {
      await team.where({
        isOver: false
      })
      .get().then(res=>{
        console.log(res);
        for(var a=0;a<res.data.length;a++)
          {
            //日期转换
            if(res.data[a].deadline != null)
              res.data[a].deadline=res.data[a].deadline.toLocaleDateString();
          }
        this.setData({teaminfo:res.data})
      })
    }
    else {
      await team.where(
        _.or([
        {
          team_name: db.RegExp({
            regexp: '.*' + code+".*",
            options: 'i',
          }),
          isOver: false
        },
        {
          information: db.RegExp({
            regexp: '.*' + code+".*",
            options: 'i',
          }),
          isOver: false
        }
      ]))
      .get().then(res=>{
        console.log(res);
        for(var a=0;a<res.data.length;a++)
          {
            //日期转换
            if(res.data[a].deadline != null)
              res.data[a].deadline=res.data[a].deadline.toLocaleDateString();
          }
        this.setData({teaminfo:res.data})
      })
    }
    
    this.setData({loading:false,searchover:true});
  },

  onLoad: function(e) {
    const db = wx.cloud.database()
    db.collection("Label").aggregate()
    .addFields({
      isActive: false
    })
    .end()
    .then(res=>{
      this.setData({
        tabs: this.data.tabs.concat(res.list)
      })
      console.log(this.data.tabs)
      db.collection('Team').where({
        isOver: false
      })
      .get().then(res=>{
        console.log(res);
        for(var a=0;a<res.data.length;a++)
          {
            //日期转换
            if(res.data[a].deadline != null)
              res.data[a].deadline=res.data[a].deadline.toLocaleDateString();
          }
        this.setData({teaminfo:res.data})
      })
    })
    .catch(console.error)

    
  }
    
})