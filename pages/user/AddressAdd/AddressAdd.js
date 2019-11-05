Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
    openId: null,
    name: '',
    phone: '',
    address: '',
    buttonShow:"block",
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //采用同步获取userId
  onLoad: function (options) {
    var userId = wx.getStorageSync('userinfo').accessToken;
    this.setData({
      openId: userId
    })
  },


  NameInput:function(e){
     this.setData({
       name:e.detail.value
     })
  },

  phoneInput:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

dizhi:function(){
  var that = this;
  wx.chooseLocation({
    success: function (res) {
      console.log(res)
      that.setData({
        buttonShow: 'none',
        address: res.name,
      })
    }
  })
},

save:function(){
  var  that=this;
  var name = this.data.name;
  var phone = this.data.phone;
  var address = this.data.address;
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (name == '' || name == null) {
    wx.showToast({
      title: '请输入姓名',
      icon: 'none',
      duration: 1000
    })
  } else if (phone == '' || phone == null) {
    wx.showToast({
      title: '请输入手机号码',
      icon: 'none',
      duration: 1000
    })
  } else if (!myreg.test(phone)) {
    wx.showToast({
      title: '请填写正确的手机号码',
      icon: "none",
      duration: 3000
    })
  } else if (address == '' || address == null) {
    wx.showToast({
      title: '请输入选择地址',
      icon: 'none',
      duration: 1000
    })
  }
  else {
    wx.request({

      url: that.data.url +'/agro/addUserAddress',

      method: 'post',
      data: {
        'address': that.data.address,
        'phone': that.data.phone,
        'name': that.data.name,
        'openId': that.data.openId,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showModal({
            title: '提示',
            content: '添加成功',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({})
              }
            }
          })

        }
      }

    })
  }
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