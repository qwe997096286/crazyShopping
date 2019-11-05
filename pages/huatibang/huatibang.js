// pages/huatibang/huatibang.js
var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    huati:[],
    flag:false
  },
  huati: function () {
    let that = this;
    var returnArr = that.data.huati;
    var paihang =[];
    let infoOpt = {
      url: '/agro/getTopicList',
      type: 'POST',
      data: {

      }
    }
    let infoCb = {}
    infoCb.success = function (res) {

      console.log(res.itemTopic)

      for (var i = 0; i < res.itemTopic.length; i++) {
        res.itemTopic[i].index = i;
        returnArr.push(res.itemTopic[i]);
        
      }

      console.log(returnArr)
      that.setData({
        huati: returnArr,
        flag:true
      })
    }
    infoCb.beforeSend = () => { }
    infoCb.complete = () => {

    }
    sendAjax(infoOpt, infoCb, () => {
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
let that=this;
that.huati();
 
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

  }
})