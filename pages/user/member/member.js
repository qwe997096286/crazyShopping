// pages/user/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: 'wx',
        value: '微信',
        checked: 'true'
      },
      {
        name: 'zfb',
        value: '支付宝',
        checked: 'false'
      }
    ],
    items1: [{
        name: '月卡',
        value: '1',
        prise: '15',
        priseadd: '9.8',
        checked: "true"
      },
      {
        name: '季卡',
        value: '2',
        prise: '60',
        priseadd: '55',
        checked: "false"
      },
      {
        name: '年卡',
        value: '3',
        prise: '120',
        priseadd: '100',
        checked: "false"
      },
    ],
    pmc: 'pay-money-content1',
    pmc1: 'pay-money-content'
  },
  chageClass: function(e) {
    console.log(e);
  },



  changevip: function(e) {
    var openid = wx.getStorageSync('userinfo').accessToken
  var that=this;
    wx.request({
          url: 'https://www.sxscott.com/agriculture/agro/upVIP',
          method: 'post',
          data: {
            openId: openid,

          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data);
            wx.showToast({


              title: '充值成功！',
              success: function () {
                setTimeout(function () {
                  that.backIndex();
                }, 2000);
              }
              
            })

           
            // var pages=getCurrentPages()
            // var prevPage = pages[pages.length - 2];
            // console.log(prevPage)
            // var info = wx.getStorageSync('userinfo');
            // info.vip=true;
            // prevPage.setData({
            //   userInfo:info

          }
      })

  },
  backIndex:function(){

    wx.navigateBack({
      url: '../index',
    })
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var index = e.detail.value;
    console.log(index - 1);

    var change = this.data.items1;
    for (var i = 0; i <= 2; i++) {
      change[i].checked = false;
    }

    change[index - 1].checked = true;




    this.setData({
      items1: change
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log(123465);
    wx.navigateTo({

      url: "../index"

    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})