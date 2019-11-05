Page({
  data: {
  },
  onLoad: function (options) {
  },
  backSec:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  toOrder:function(){
    wx.navigateTo({
      url: '../order/order',
    })
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  }
})