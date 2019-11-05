// pages/user/Store/StoreDetail/StoreDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo1: 0,//营业执照没有上传标记
    arr_img1: [],
    business: '',
    idcard: '',
    licence: '',
    pass:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pass;
    wx.getStorage({
      key: 'pass',
      success(res) {
        console.log(res.data)
         pass=res.data
      }
    })
    this.setData({
      pass:pass
    })
    console.log(this.data.pass)
  },


  toBLphoto: function () {

    wx.navigateTo({
      url: '../BLphoto/BLphoto',
    })
  },


  toIDphoto: function () {
    wx.navigateTo({
      url: '../IDphoto/IDphoto',
    })
  },
  toLicese: function () {
    wx.navigateTo({
      url: '../Licese/Licese',
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
  sumbitBtn: function () {
    var storeInfo = wx.getStorageSync('storeInfo');
    var business = wx.getStorageSync('business');
    var licence = wx.getStorageSync('licence');
    var idcard = wx.getStorageSync('idcard')
    console.log(storeInfo)
    console.log(storeInfo.simage)
    // if (business == null || business == '') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请上传营业执照',
    //   })
    // }
    // else if (licence == null || licence == '') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请上传许可证',
    //   })
    // }
    // else if (idcard == null || idcard == '') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请上传身份证照',
    //   })
    // }
    // else {
 
    console.log(this.data.pass)
      wx.request({
        url: 'https://www.sxscott.com/agriculture/agro/shopInput',
        header: {
          'content-type': 'application/json',
        },
        method: 'post',
        data: {
          'shopName': storeInfo.shopName,
          'stype': storeInfo.stype,
          'saddress': storeInfo.saddress,
          'phone': storeInfo.phone,
          'name': storeInfo.name,
          'simage': storeInfo.simage,
          'location': storeInfo.location,
          'openId': storeInfo.openId,
          'initial': 0,
          'business': business.business,
          'licence': licence.licence,
          'idcard': idcard.idcard,
           'password':this.data.pass
        },
        success(res) {
          if (res.data.code == 200) {
            wx.showModal({
              title: '消息',
              content: '审核成功',
              showCancel: false,
            })
          }
        },
        fail(res){
          wx.showModal({
            title: '消息',
            content: '审核异常，请稍后重试',
            showCancel: false,
          })
        },
        complete(res) {
          wx.navigateBack({
            delta: 2
          })
        }

      })
    // }

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