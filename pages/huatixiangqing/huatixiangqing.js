// pages/huatixiangqing/huatixiangqing.js
var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
huatiId:0,
    brow:"",
    title:'',
    imgurl:'',
    daoyu:'',
    tiezi:[]
  },
// 查询当前话题
huati:function(){
let that=this;
var id=that.data.huatiId;
  let infoOpt = {
    url: '/agro/getTopicList',
    type: 'POST',
    data: {
      id:id
    }
  }
  let infoCb = {}
  infoCb.success = function (res) {

    console.log(res.itemTopic)
    that.setData({
      brow: res.itemTopic[0].brow,
      title: res.itemTopic[0].title,
      imgurl: res.itemTopic[0].imgurl,
      daoyu: res.itemTopic[0].phrase
    })
    // for (var i = 0; i < res.itemTopic.length; i++) {
    //   res.itemTopic[i].index = i;
    //   returnArr.push(res.itemTopic[i]);

    // }

    // console.log(returnArr)
    // that.setData({
    //   huati: returnArr,
    //   flag: true
    // })
  }
  infoCb.beforeSend = () => { }
  infoCb.complete = () => {

  }
  sendAjax(infoOpt, infoCb, () => {
  });
},
// 查询当前话题下的帖子
tiezi:function(){
  let that = this;
  var id = that.data.huatiId;
  wx.request({
    url: that.data.url + '/agro/getForumList', // 仅为示例，并非真实的接口地址
    method: 'post',
    data: {
      topicId: id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data.itemForum)
      that.setData({
        tiezi:[]
      })
      var returnArr = that.data.tiezi;
      for (var i = 0; i < res.data.itemForum.length; i++) {
        returnArr.push(res.data.itemForum[i]);
        returnArr[i].year = returnArr[i].year + ' ';
      }
      // if (res.data.itemForum.length < 3) {

      //   that.setData({
      //     flag: true
      //   })

      // }
      console.log(returnArr)
      that.setData({
        tiezi: returnArr
      })
    }
  })
  
},
  torelease: function () {
    let that=this;
    var userId = wx.getStorageSync('userinfo').id;
    if (userId == "") {
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../huatitie/huatitie?huatiId='+that.data.huatiId+"&huatititle="+that.data.title
      })
    }

  },
  detailPage: function (event) {
    wx.navigateTo({
      url: '../xiangqing/xiangqing?id=' + event.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options.id)
let that=this;
that.setData({
  huatiId:options.id
})
that.huati();
that.tiezi()
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
    let that=this;
  
    that.tiezi()
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

  }
})