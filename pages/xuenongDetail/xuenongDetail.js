// pages/xuenongDetail/xuenongDetail.js
const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const templeMsg = require('../../utils/templeMsg.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
    openId: '',
    xuenonglist: [],
    xuenongId:0,
    space:" ",
    
    address:'',
    addressName:'',
    addressPhone:'',
    platUserInfoMap: {},
    orderId:'',
  },
  xuenongDetail:function(){
      let that = this
     
      wx.request({
        url: that.data.url + '/agro/getEducationList', // 仅为示例，并非真实的接口地址

        method: 'post',


        data: {
          openId: that.data.openId,
          id:that.data.xuenongId,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data.items);
          var returnArr = that.data.xuenonglist;
          for (var i = 0; i < 1; i++) {
            returnArr.push(res.data.items[i]);



          }
          console.log(returnArr)
          that.setData({
            xuenonglist: returnArr
          })
        }
      })
    
  },
  //获取用户的地址
  getAddressList: function () {

    var that = this;
  
    let infoOpt = {
      url: '/agro/getUserAddressList',
      type: 'post',
      data: {
        openId: that.data.openId
      },
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      console.log(res.itemAddress[0])
      that.setData({
        address: res.itemAddress[0].address,
        addressName: res.itemAddress[0].name,
        addressPhone: res.itemAddress[0].phone
      })
      console.log(that.data.address)
      console.log(that.data.addressName)
      console.log(that.data.addressPhone)




    }
    infoCb.beforeSend = () => {
      // that.setData({
      //   lodingHidden: false
      // })
    }
    sendAjax(infoOpt, infoCb, () => { });
  },
  buy:function(e){
    var currentid = e.currentTarget.dataset.id;
    var currentname = e.currentTarget.dataset.name; 
    var currentprice = e.currentTarget.dataset.price; 
    console.log(currentid)
    console.log(currentname) 
    console.log(currentprice);
    var that = this;
    console.log(that.data.platUserInfoMap)
    console.log(that.data.openId)
    wx.login({
      success: resp => {
        var that = this;
        console.log(resp)
        console.log(resp.code)
        wx.request({
          url: that.data.url + '/agro/createOrder', // 仅为示例，并非真实的接口地址
          data: {
            platCode: resp.code,
            // goodsId: that.data.spid,
            openId: that.data.openId,
            shopId: currentid,
            shopName: currentname,
            fee: parseFloat(currentprice),
            platUserInfoMap: that.data.platUserInfoMap,
            num: 1,
            state: 0,
            sum: parseFloat(currentprice),
            consignee: that.data.addressName,
            receivePhone: that.data.addressPhone,
            receiveAddress: that.data.address
          },
          method: 'post',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            that.setData({
              orderId: res.data.orderId
            })
             console.log(that.data.orderId)
            wx.requestPayment({
              timeStamp: res.data.orderInfo.timeStamp,
              nonceStr: res.data.orderInfo.nonceStr,
              package: res.data.orderInfo.pkg,
              signType: 'MD5',
              paySign: res.data.orderInfo.paySign,
              success(res) {
                console.log(res)
                 let t = that;
                console.log(t.data.orderId)
                console.log(t.data.openId)
                wx.request({
                  url: t.data.url + '/agro/resetOrderState', // 仅为示例，并非真实的接口地址
                  method: 'post',
                  data: {
                    state: 1,
                    logistics: 0,
                    openId: t.data.openId,
                    id: t.data.orderId
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    console.log(res);
                    console.log("cg")
                    wx.navigateTo({
                      url: '../secondHandPaySuccess/secondHandPaySuccess',
                    })

                  }
                })






              },
              fail(res) {
                console.log(res)
              }
            })
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.id)
  let that=this;
    var userId = wx.getStorageSync('userinfo').accessToken;

    wx.getStorage({
      key: 'pmap',
      success(res) {
        console.log(res.data)
        that.setData({
          platUserInfoMap:res.data
        })
       
      }
    })
   
    that.setData({
      xuenongId: options.id,
      openId: userId
    })

    
    console.log(that.data.openId)

  that.xuenongDetail()
    that.getAddressList();
 
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