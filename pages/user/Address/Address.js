Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
    openId: '',
    addressList: [],
    isshow:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //采用同步获取userId,不然后面的getAddressList得不到userId
  onLoad: function (options) {
    var userId = wx.getStorageSync('userinfo').accessToken;
    this.setData({
      openId: userId
    })
    this.getAddressList();
  },
  //跳转添加地址页面
  toAddAddress: function () {
    wx.navigateTo({
      url: '../AddressAdd/AddressAdd',
    })
  },
  //跳转修改地址页面
  toAddressEdit: function (e) {
    console.log(e)
    var detail = JSON.stringify(e.currentTarget.dataset.detail);
    wx.navigateTo({
      url: '../AddressEdit/AddressEdit?detail=' + detail,
    })
  },

  //获取地址列表数据
  getAddressList: function () {
    var that = this;
    console.log(that.data.openId)
    wx.request({
      url: that.data.url + '/agro/getUserAddressList',

      method: 'post',
      data: {
        openId: that.data.openId
      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        console.log(res);
      
        that.setData({
          addressList: res.data.itemAddress
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
    this.onLoad()//再次加载，实现返回上一页页面刷新

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