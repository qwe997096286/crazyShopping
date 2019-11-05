
Page({
  data: {
    url: 'https://www.sxscott.com/agriculture',
    id: null,
    userId: null,
    name: '',
    phone: '',
    postion: '',
  },
  onLoad: function(options) {
    var detail = JSON.parse(options.detail);
    console.log(detail)
    this.setData({
      id: detail.id,
      userId:detail.openId,
      name: detail.name,
      phone: detail.phone,
      postion: detail.address,
    })
  },
  save: function() {
    var id = this.data.id;
    var userId = this.data.userId;
    var name = this.data.name;
    var phone = this.data.phone;
    var postion = this.data.postion;
    if (name == '' || name == null) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000
      })
    } else if (name.length > 10) {
      wx.showToast({
        title: '请输正确的姓名',
        icon: 'none',
        duration: 1000
      })
    } else if (phone == '' || phone == null) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 1000
      })
    } else if (phone.length != 11) {
      wx.showToast({
        title: '请输入11位的手机号码',
        icon: 'none',
        duration: 1000
      })
    } else if (postion == '' || postion == null) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 1000
      })
    }
    var that = this;
 wx.request({   
   url: that.data.url +'/agro/resetAddress',
   method: 'post',
   data: {
     'id': id,
     'openId': userId,
     'name': name,
     'phone': phone,
     'address': postion,
   },
   header: {
     'content-type': 'application/json',
   },
   success(res) {
     console.log(res);
     if (res.data.code == 200) {
       wx.showModal({
         title: '提示',
         content: '修改成功',
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
 },

delete:function() {
  var that = this;
  var id = this.data.id;
  wx.request({
    url: that.data.url +'/agro/deleteAddress/' + id,
    method: 'get',
    data: {
    },
    header: {
      'content-type': 'application/json',
    },
    success(res) {
      console.log(res);
      if (res.data.code == 200) {
        wx.showModal({
          title: '提示',
          content: '删除成功',
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

},
input_name: function(e) {
  this.setData({
    name: e.detail.value
  })
},
input_phone: function(e) {
  this.setData({
    phone: e.detail.value
  })
},
input_postion: function(e) {
  this.setData({
    postion: e.detail.value
  })
},
onReady: function() {},
onShow: function() {},
onHide: function() {},
onUnload: function() {},
onPullDownRefresh: function() {},
onReachBottom: function() {},
onShareAppMessage: function() {}
})