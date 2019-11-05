const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const templeMsg = require('../../utils/templeMsg.js')
Page({
  data: {
    url:'https://www.sxscott.com/agriculture',
    userId: null,
    goodsDetail: [{
      'pic': '',
      'name': '',
      'price': 0,
      'label': '',
      'number': 1,
    }],
    canPay: 1,
    addressList: [],
    isNeedAddress: null,
    addressId: '',
    address: '',
    addressName: '',
    addressPhone: '',
    isSelect: 0,
    lodingHidden: true,

    openId:'',
    spid:0,
    spinfo:[],
    gimage:'',
    price:0,
    name:'',
    jieshao:'',
    shopId:0,
    sname:'',
    platUserInfoMap:{},
    orderId:'',
    
  },
  onLoad: function (options) {
    var userId = wx.getStorageSync('userinfo').accessToken;
    this.setData({
      openId: userId,
    
    })
    console.log(this.data.canPay)
    console.log(options.id)
    this.setData({
      spid:options.id
    })
    // var detail = JSON.parse(options.detail);
    // console.log(detail)
    // var userId = wx.getStorageSync('userinfo').userId;
    // this.setData({
    //   userId: userId,
    //   goodsDetail: detail
    // })
     this.getAddressList();
     this.spinfo()
    this.getshopname()
  },
  spinfo: function () {
    let that = this;
    console.log(that.data.spid)
    wx.request({
      url: that.data.url + '/agro/getGoodsList', // 仅为示例，并非真实的接口地址

      method: 'post',

      type: 'get',
      data: {
        id: that.data.spid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemGoods);
        var returnArr = that.data.spinfo;
        for (var i = 0; i < 1; i++) {
          returnArr.push(res.data.itemGoods[i]);

        }
        console.log(returnArr)
        that.setData({
          spinfo: returnArr
        })
        that.setData({
          gimage: that.data.spinfo[0].gimage,
          name: that.data.spinfo[0].name,
          jieshao: that.data.spinfo[0].content,
          price: that.data.spinfo[0].price,
          shopId:that.data.spinfo[0].sid
        })
        console.log(that.data.spinfo);
      }
    })
  },

getshopname:function(){
  var that = this;
  let infoOpt = {
    url: '/agro/getShopList',
    type: 'post',
    data: {
      id:that.data.shopId
    },
    header: {
      'content-type': 'application/json',
    },
  }
  let infoCb = {}
  infoCb.success = function (res) {
    console.log(res.itemShop[0].shopName)
    that.setData({
      sname: res.itemShop[0].shopName
    })
    // console.log(res.itemAddress[0])
    // that.setData({
    //   address: res.itemAddress[0].address,
    //   addressName: res.itemAddress[0].name,
    //   addressPhone: res.itemAddress[0].phone
    // })




  }
  infoCb.beforeSend = () => {
    that.setData({
      lodingHidden: false
    })
  }
  sendAjax(infoOpt, infoCb, () => { });
},
  //获取用户的地址
  getAddressList: function () {

    var that = this;
    wx.getStorage({
      key: 'pmap',
      success(res) {
        console.log(res.data)
        that.setData({
          platUserInfoMap:res.data
        })
      }
    })
   
    console.log(that.data.platUserInfoMap)
    let infoOpt = {
      url:  '/agro/getUserAddressList',
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
      console.log(res)
    console.log(res.itemAddress[0])
      if (res.itemAddress == ""){
        wx.showToast({
          title: '请先前往添加地址',
          icon: 'none',
          duration: 2000
        })
        wx.navigateTo({
          url: '../user/AddressAdd/AddressAdd'
        })
    }
    that.setData({
      address: res.itemAddress[0].address,
      addressName: res.itemAddress[0].name,
      addressPhone: res.itemAddress[0].phone
    })
  
   
  
      
    }
    infoCb.beforeSend = () => {
      that.setData({
        lodingHidden: false
      })
    }
    sendAjax(infoOpt, infoCb, () => { });
  },
  // addAddress: function () {
  //   wx.navigateTo({
  //     url: '../secondHandAddressSelect/secondHandAddressSelect',
  //   })
  // },
  // selectAddress: function () {
  //   wx.navigateTo({
  //     url: '../secondHandAddressSelect/secondHandAddressSelect',
  //   })
  // },
  //支付
   payBtn: function (e) {
     
     var that = this;
     that.setData({
       canPay: 2
     })
     wx.login({
       success: resp => {
         var that = this;

         console.log(resp)
         console.log(resp.code)
         wx.request({
           url: that.data.url+'/agro/createOrder', // 仅为示例，并非真实的接口地址
           data: {
             platCode: resp.code,
             goodsId: that.data.spid,
             openId: that.data.openId,
             shopId: that.data.shopId,
             shopName: that.data.sname,
             fee: parseFloat(that.data.price),
             platUserInfoMap: that.data.platUserInfoMap,
             num: 1,
             state: 0,
             sum: that.data.price,
             consignee: that.data.addressName,
             receivePhone: that.data.addressPhone,
             receiveAddress: that.data.address
           },
           method:'post',
           header: {
             'content-type': 'application/json' // 默认值
           },
           success(res) {
             console.log(res.data)
             that.setData({
               orderId:res.data.orderId,
           
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
                 let t=that;
                 console.log(t.data.orderId)
                 console.log(t.data.openId)
                 t.setData({
                   canPay: 1,
             
                 })
                 wx.request({
                   url: t.data.url + '/agro/resetOrderState', // 仅为示例，并非真实的接口地址
                   method: 'post',
                   data: {
                   state:1,
                   logistics:0,
                   openId:t.data.openId,
                   orderId:t.data.orderId
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
  onReady: function () { },
  onShow: function () {

    this.getAddressList();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
})