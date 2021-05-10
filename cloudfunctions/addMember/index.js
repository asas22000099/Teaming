// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  db.collection('Member').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      team_id: event.team_id,
      member_id: event.member_id,
      isLeader: event.isLeader
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch(console.error)

  return {
    
  }
}