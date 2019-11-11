const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
Page({
  data: {
    currentTab: 0,
    status: 1,
    goodsList: [], //商品列表
    pageNo: 1,
    pageSize: 4,
    isBottom: false //是否到底
  },
  onLoad: function(options) {
    this.getCollectionList();
    this.setData({
      pageNo:1
    })
  },
  onShow: function () {
    this.onLoad();
    // if (wx.getStorageSync('userinfo').isbound == 1) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请先绑定学号后再进行操作',
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {
    //         wx.navigateTo({
    //           url: '../../user/binding/binding',
    //         })
    //       }
    //     }
    //   })
    // }else{
    //   this.setData({
    //     goodsList:[]
    //   })
    //   this.getCollectionList();
    // }
   },
  //单击导航栏
  clickMenu: function(e) {
    var current = e.currentTarget.dataset.current; //获取当前tab的index
    var status = e.currentTarget.dataset.status;
    this.setData({
      currentTab: current,
      status: status,
      goodsList: [],
      pageNo: 1,
      isBottom: false
    })
    this.getCollectionList();
  },
  //获取收藏的列表
  getCollectionList: function() {
    var that = this;
    var pageNo = this.data.pageNo;
    var pageSize = this.data.pageSize;
    // var status = this.pageParam.status;
    var openid = wx.getStorageSync("userinfo").accessToken;
    console.log(openid);
    let infoOpt = {
      url: '/cart/cartList',
      type: 'POST',
      data: {
        // status: status,
        openID:openid,
        pageNo: pageNo,
        pageSize: pageSize
      },
      header: {
        'content-type': 'application/json',
        // 'authorization': wx.getStorageSync('userinfo').authorization
      },
    }
    let infoCb = {}
    infoCb.success = function(res) {
      console.log(res);
      var goodsNewList = res.list;
      var goodsList = that.data.goodsList;
      if (goodsNewList.length == 0 && goodsList.length != 0) {
        that.setData({
          isBottom: true
        })
        wx.hideLoading();
      } else {
        for (var i = 0; i < goodsNewList.length; i++) {
          var arr = goodsNewList[i].goodsImg;
          // goodsNewList[i]['gimage'] = JSON.parse(arr);
          goodsList.push(goodsNewList[i]);
        }
        console.log(goodsList)
        that.setData({
          goodsList: goodsList,
        })
        wx.hideLoading();
      }
    }
    infoCb.beforeSend = () => {
      wx.showLoading({
        title: '加载中',
      })
    }
    sendAjax(infoOpt, infoCb, () => {});
  },
  cancel:function(e){
    var id=e.currentTarget.dataset.id;
    var index=e.currentTarget.dataset.index;
    let that=this;
    wx.request({
      url: url.host + '/cart/delete', // 仅为示例，并非真实的接口地址
      method: 'DELETE',
      data: {
        openId: wx.getStorageSync("userinfo").accessToken,
        id:id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        var arr=that.data.goodsList;
        arr.splice(index,1)
        that.setData({
          goodsList: arr
        })
        wx.showToast({
          title: '移出成功',
          icon:'none',
          duration: 300
        })
      }
    })
  },
  pay:function(e){
    var gid = e.currentTarget.dataset.gid;
    wx.navigateTo({
      url: '../daifukuan/daifukuan?id=' + gid,
    })
  },
  //跳转详情
  toDetail: function(e) {
    
    var id = e.currentTarget.dataset.gid;
    console.log(id)
    wx.navigateTo({
      url: '../shangpin/shangpin?id=' + id
    })
  },
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
  onReady: function() {},

  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
    var pageNo = this.data.pageNo;
    console.log(this.data.isBottom)
    if (this.data.isBottom == false) {
      this.setData({
        pageNo: pageNo + 1,
      })
      this.getCollectionList();
    }

  },
  onShareAppMessage: function() {}
})