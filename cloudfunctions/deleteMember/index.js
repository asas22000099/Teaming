// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var db = cloud.database();

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('Member').where({
      team_id: event.team_id,
      member_id: _.in(event.deleteList)
    }).remove()
  } catch(e) {
    console.error(e)
  }
}