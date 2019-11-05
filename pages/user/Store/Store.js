const uploadimgs = require('../../../utils/uploadimg.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
    array: [{
        value: '蔬果',
        check: 'true'
      }, {
        value: '农庄'
      }, {
        value: '畜牧'
      },
      {
        value: '旅游'
      }, {
        value: '学农'
      }, {
        value: '聚点'
      }, {
        value: '散户'
      }, {
        value: '其他'
      }
    ],
    openId: '',
    shopName: null,
    stype: '蔬果',
    saddress: '点击选择',
    name: '',
    phone: '',
    simage: '/images/addpic.png',
    buttonShow: 'block',
    location: '',
    index: 0,
    arr_img: [],
    type:null,
    userpass:''
  },
  //获取主营项目
  checkboxChange: function(e) {
    var a = e.detail.value.join(',')
    console.log(a)
    this.setData({
      stype: a
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取openId
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success(res) {
        that.setData({
          openId: res.data.accessToken
        })
      }
    })

  },
  passInput:function(e){
    let pass = e.detail.value;
    wx.setStorage({
      key: 'pass',
      data: e.detail.value
    })
  },
  shopNameInput: function(e) {
    let name = e.detail.value;
    console.log(name)
    this.setData({
      shopName: e.detail.value
    })
  },
  hostNameInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  //获取地址
  dizhi: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        that.setData({
            buttonShow: 'none',
            saddress: res.name,
            location: res.longitude + ',' + res.latitude,
          }),
          console.log(that.data.saddress)
        console.log(that.data.location)
      },
    })
  },
  //上传图片
  shangChuang: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          simage: tempFilePaths[0]
        })
        console.log(that.data.simage)
        wx.getImageInfo({ 
       src: tempFilePaths[0], 
        success: function (res) { 
        console.log(res.type)
          that.setData({
            type:res.type
          }) 
         
      } 
        })
        console.log(that.data.type)
        wx.uploadFile({
          url: 'https://www.sxscott.com/agriculture/upload/avatar',
          filePath: tempFilePaths[0],
          name:'file',
          formData: {
            picType: 'jpg'
          }, //这里是上传图片时一起上传的数据
          success: (resp) => {
            console.log(JSON.parse(resp.data))
            that.setData({
              arr_img: JSON.parse(resp.data).urlList[0]
            })
          },
        });
      }
    })
  },
  SumbitBtn: function () { //提交数据
    console.log(this.data)
    var that = this;
    var phone = that.data.phone;
    var shopName = that.data.shopName;
    var saddress = that.data.saddress;
    var name = that.data.name;
    var simage = that.data.arr_img[0];
    var stype = that.data.stype;
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    console.log(simage)
    if (shopName === "" || shopName == null) {
      console.log(shopName)
      wx.showToast({
        title: '请输入商户名称',
        icon: 'none',
        duration: 3000
      })
    } else if (that.data.simage == "../../../../images/addpic.png") {
      wx.showToast({
        title: '请上传商标',
        icon: 'none',
        duration: 3000
      })

    } else if (stype == '请点击选择') {
      wx.showToast({
        title: '请选择主营项目',
        icon: 'none',
        duration: 3000
      })
    } else if (name == '' || name == null) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 3000
      })
    } else if (!myreg.test(phone)) {
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: "none",
        duration: 3000
      })
    } else if (saddress == '点击选择') {
      wx.showToast({
        title: '请输入地址',
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.navigateTo({
        url: 'StoreDetail/StoreDetail',
      })

      wx.setStorage({
        key: 'storeInfo',
        data: {
          'shopName': that.data.shopName,
          'stype': that.data.stype,
          'saddress': that.data.saddress,
          'phone': that.data.phone,
          'name': that.data.name,
          'simage': that.data.arr_img,
          'location': that.data.location,
          'openId': that.data.openId,
          'initial': 0,
         
        }
      })
   
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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