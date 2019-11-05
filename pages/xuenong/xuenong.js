// pages/xuenong/xuenong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
    openId:'',
    xuenonglist: [],
    space:' ',
  },
  xuenong:function(){
  let that=this
    wx.request({
      url: that.data.url + '/agro/getEducationList', // 仅为示例，并非真实的接口地址

      method: 'post',

     
      data: {
        openId:that.data.openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.items);
        var returnArr = that.data.xuenonglist;
        for (var i = 0; i < res.data.items.length; i++) {
          returnArr.push(res.data.items[i]);
          


        }
        console.log(returnArr)
        that.setData({
          xuenonglist:returnArr
        })
      }
    })
  },
  detail:function(event){
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../xuenongDetail/xuenongDetail?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = wx.getStorageSync('userinfo').accessToken;
    this.setData({
      openId: userId
    })
    this.xuenong()
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