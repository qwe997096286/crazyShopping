var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    show: false,
    number: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    // this.test();
    console.log(this.data.userInfo);
    console.log(111);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toMyMoney: function () { //我的资产
    wx.navigateTo({
      url: 'Money/Money',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tomember: function () { //我的资产
    wx.navigateTo({
      url: 'member/member',

    })
  },
  toStoreEnter: function () { //商家入驻
    wx.navigateTo({
      url: 'Store/Store',
    })
  },
  toMyCard: function () { //我的卡劵
    wx.navigateTo({
      url: 'Card/Card',
    })
  },
  toAddress: function () { //我的地址
    wx.navigateTo({
      url: 'Address/Address',
    })
  },
  toideaBack: function () { //意见反馈
    wx.navigateTo({
      url: 'ideaBack/ideaBack',
    })
  },
  toNewsEnter: function () {
    wx.navigateTo({
      url: 'newsEnter/newsEnter',
    })
  },

  number: function (e) { //获取手机号码
    this.setData({
      number: e.detail.value
    })
  },
  sumbit: function () { //提交
    var that = this;
    var phone = that.data.number;
    if (phone == null || phone == '') {
      wx.showModal({
        title: '提示',
        content: '手机号码不能为空',
      })
    } else if (!(/^1[34578]\d{9}$/.test(phone))) { //判断手机号码是否正确
      wx.showToast({
        title: '请输入正确的手机',
        duration: 2000
      })
    } else {
      let infoOpt = {
        url: '/agro/binding',
        type: 'POST',
        data: {
          'openId': that.data.userInfo.accessToken,
          'phone': that.data.number
        },
      }
      let infoCb = {}
      infoCb.success = function (res) {
        console.log(res)
        wx.showModal({
          title: '绑定成功',
          showCancel: false,
          content: '欢迎进入在疯鸟',
          success: function (res) {
            that.setData({
              show: false
            })
            that.onLoad();
          }
        })
      }
      infoCb.beforeSend = () => { }
      infoCb.complete = () => {

      }
      sendAjax(infoOpt, infoCb, () => {
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    app.login()
    that.setData({
      userInfo: wx.getStorageSync('userinfo')
    })
    console.log(that.data.userInfo);
    if (wx.getStorageSync("isBinding") === '2') { //未绑定弹出框
      that.setData({
        show: true
      })
    } else {
      that.setData({
        show: false
      })
    }
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