const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const templeMsg = require('../../utils/templeMsg.js')
Page({
  data: {
    currentTab: 0,
    status: '',
    pageNo: 1,
    pageSize: 5,
    orderList: [],
    refundOrderId: '',
    hiddenRefund: true,
    input_refund: '',
    openId: null,
    platUserInfoMap:{},
    url: 'https://www.sxscott.com/agriculture',
  },
  onLoad: function (options) {

    var that = this
    wx.getStorage({
      key: 'pmap',
      success(res) {
        console.log(res.data)
        that.setData({
          platUserInfoMap: res.data
        })
      }
    })
    var userId = wx.getStorageSync('userinfo').accessToken;
    that.setData({
      openId: userId,
      status:''
    })
    that.getOrderList();
    
  },
  //单击导航栏
  clickMenu: function (e) {

    var current = e.currentTarget.dataset.current; //获取当前tab的index
    var status = e.currentTarget.dataset.status;
    this.setData({
      currentTab: current,
      status: status,
      orderList: [],
    })
    console.log(this.data.status)
    this.getOrderList();
  },

  toView:function(e){
    var orderId = e.currentTarget.dataset.orderid;
    console.log(orderId)


    var that = this;
    console.log(that.data.openId)
    wx.showModal({
      title: '提示',
      content: '确认已经收到了吗',
      success(res) {
        if (res.confirm) {
          wx.request({

            url: that.data.url + '/agro/resetOrderState',

            method: 'post',
            data: {
              state: 2,
              logistics: 1,
              openId: that.data.openId,
              id: orderId
            },
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              console.log(res)
              if (res.data.code == 200) {
                wx.showModal({
                  title: '提示',
                  content: '确认成功',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      that.getOrderList()
                    }
                  }
                })

              }
            }

          })

        } else if (res.cancel) { }
      }
    })
  },

  //跳转订单详情
  toOrderDetail: function (e) {
    var orderId = e.currentTarget.id;
    console.log(orderId)
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId=' + orderId,
    })
  },
  //获取订单列表
  getOrderList: function () {
    var that = this;
    wx.request({
      url: that.data.url+'/agro/getOrderList',
      method: 'post',
      data: {
        'openId': this.data.openId,
         status:this.data.status
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          orderList: res.data.itemOrder
        })

      }
    })
  },
  //取消订单
  cancelOrder: function (e) {
    var orderId = e.currentTarget.dataset.orderid;
    console.log(orderId)


    var that = this;
    console.log(that.data.openId)
    wx.showModal({
      title: '提示',
      content: '确认取消该订单吗',
      success(res) {
        if (res.confirm) {
          wx.request({

            url: that.data.url + '/agro/resetOrderState',

            method: 'post',
            data: {
              state:5,
              logistics:1,
              openId:that.data.openId,
              id: orderId
            },
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              console.log(res)
              if (res.data.code == 200) {
                wx.showModal({
                  title: '提示',
                  content: '取消成功',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      that.getOrderList()
                    }
                  }
                })

              }
            }

          })
        
        } else if (res.cancel) { }
      }
    })
  },
  //去付款
  toPay: function (e) {
    var that = this;
    var price = e.currentTarget.dataset.price;
    var goodsId = e.currentTarget.dataset.goodsid;
    var orderId=e.currentTarget.dataset.orderid;
    console.log(goodsId)
    console.log(orderId)
    console.log(price)
    wx.login({
      success: resp => {
        var that = this;
        console.log(resp)
        console.log(that.data.platUserInfoMap)
        console.log(resp.code)
        console.log(price)
        wx.request({
          url: that.data.url+'/agro/recharge', // 仅为示例，并非真实的接口地址     
         
          data: {
             platCode: resp.code,
             fee:price,
             orderId:orderId,
             type:1,
            platUserInfoMap:that.data.platUserInfoMap
           
          },
          method: 'post',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.pkg,
              signType: 'MD5',
              paySign: res.data.paySign,
              success(res) {
                console.log(res)
                wx.request({
                  url: that.data.url + '/agro/recharge', // 仅为示例，并非真实的接口地址
                  method: 'post',
                  data: {
                   
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                 console.log("cg")
                    wx.request({
                      url: that.data.url + '/agro/resetOrderState', // 仅为示例，并非真实的接口地址
                      method: 'post',
                      data: {
                        state: 1,
                        logistics: 0,
                        openId: that.data.openId,
                        orderId: orderId
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success(res) {
                        console.log(res);
                        console.log("cg")
                      

                      }
                    })
                 that.getOrderList()
                  
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
  //申请退款输入
  // input_refund: function (e) {
  //   var val = e.detail.value;
  //   this.setData({
  //     input_refund: val
  //   })
  // },
  //申请退款
  refundOrder: function (e) {
    var orderid = e.currentTarget.dataset.orderid;
    var ordersum = e.currentTarget.dataset.ordersum;

    console.log(orderid)
    console.log(ordersum)
    let t=this;
    wx.request({
      url: t.data.url + '/agro/refund', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        orderId: orderid,
        type:1,
        totalFee:ordersum,
        refundFee: ordersum
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(t.data.openId)
        console.log(orderid)
        wx.request({
        url: t.data.url + '/agro/resetOrderState', // 仅为示例，并非真实的接口地址
        method: 'post',
        data: {
          state: 5,
          logistics: 1,
          openId: t.data.openId,
          orderId: orderid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res);
          console.log("cg")
          wx.showToast({
            title: '退款成功',
            icon: 'success',
            duration: 2000
          })
          t.getOrderList();


        }
      })
      }
    })
    // let infoOpt = {
    //   url: '/agro/refund',
    //   type: 'post',
    //   data: {
    //     orderId: orderid,
    //     type:1,
    //     totalFee:ordersum,
    //     refundFee: ordersum
    //   }
    // }
    // let infoCb = {}
    // infoCb.success = function (res) {
    //   wx.request({
    //     url: t.data.url + '/agro/resetOrderState', // 仅为示例，并非真实的接口地址
    //     method: 'post',
    //     data: {
    //       state: 5,
    //       logistics: 1,
    //       openId: t.data.openId,
    //       orderId: orderid
    //     },
    //     header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     success(res) {
    //       console.log(res);
    //       console.log("cg")
    //       wx.showToast({
    //         title: '退款成功',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //       t.getOrderList();
         

    //     }
    //   })
 
    // }
    // infoCb.beforeSend = () => { }
    // infoCb.complete = () => {

    // }
    // sendAjax(infoOpt, infoCb, () => {
    // });
  },
  //确认申请退款
  // confirmRefund: function (e) {
  //   var that = this;
  //   var input_refund = this.data.input_refund;
  //   var refundOrderId = this.data.refundOrderId;
  //   if (input_refund == '') {
  //     wx.showToast({
  //       title: '请输入退款原因',
  //       icon: 'none'
  //     })
  //   } else {
  //     let infoOpt = {
  //       url: '/secondary/order/orderApply',
  //       type: 'PUT',
  //       data: {
  //         orderId: refundOrderId,
  //         content: input_refund
  //       },
  //       header: {
  //         'content-type': 'application/json',
  //       },
  //     }
  //     let infoCb = {}
  //     infoCb.success = function (res) {
  //       console.log(res);
  //       if (res.message == '已成功申请，请耐心等待结果！') {
  //         that.setData({
  //           hiddenRefund: true
  //         })
  //         wx.showModal({
  //           title: '提示',
  //           content: '已申请退款，请耐心等待',
  //           showCancel: false,
  //           success(res) {
  //             if (res.confirm) {
  //               that.onPullDownRefresh();
  //             }
  //           }
  //         })

  //       }
  //     }
  //     infoCb.beforeSend = () => { }
  //     sendAjax(infoOpt, infoCb, () => { });
  //   }

  // },
  // cancelRefund: function () {
  //   this.setData({
  //     hiddenRefund: true
  //   })
  // },
  //收集formId
  getFormId: function (e) {
    var formId = e.detail.formId;
    var userId = wx.getStorageSync('userinfo').userId;
    var openId = wx.getStorageSync('userinfo').openId;
    if (formId != 'the formId is a mock one') {
      var that = this;
      let infoOpt = {
        url: '/user/insertForm',
        type: 'POST',
        data: {
          userId: userId,
          openId: openId,
          formId: formId
        },
        header: {
          'content-type': 'application/json',
        },
      }
      let infoCb = {}
      infoCb.success = function (res) {
      }
      infoCb.beforeSend = () => { }
      sendAjax(infoOpt, infoCb, () => { });
    }
  },
  onReady: function () { },
  onShow: function () {
    this.setData({
      orderList: [],
      pageNo: 1,
    })
    this.getOrderList();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.getStorage({
      key: 'pmap',
      success(res) {
        console.log(res.data)
        that.setData({
          platUserInfoMap: res.data
        })
      }
    })
    var userId = wx.getStorageSync('userinfo').accessToken;
    that.setData({
      openId: userId,
 
    })
    that.getOrderList();

    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    wx.stopPullDownRefresh();
  },
  // onReachBottom: function () {
  //   var pageNo = this.data.pageNo;
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   this.setData({
  //     pageNo: pageNo + 1,
  //   })
  //   this.getOrderList();

  // },
  onShareAppMessage: function () { }
})