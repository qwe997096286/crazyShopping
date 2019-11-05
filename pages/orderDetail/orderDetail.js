// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    url: 'https://www.sxscott.com/agriculture',
    item:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var userId = wx.getStorageSync('userinfo').accessToken;
    this.setData({
      openId: userId
    })
      this.setData({
        orderId:options.orderId
      })
      this.getOrderList();
  },
  getOrderList: function () {
    var that = this;
    console.log(that.data.orderId)
    wx.request({
      url: that.data.url + '/agro/getOrderList',
      method: 'post',
      data: {
        'key': that.data.orderId,
         'openId':that.data.openId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          item: res.data.itemOrder[0]
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

  }
})