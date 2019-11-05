// pages/shangpin/shangpin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
  spid:0,
  spinfo:[],
  openid:'',
  },

  spinfo:function(){
    let that = this;
    console.log(that.data.spid)
    wx.request({
      url: that.data.url +'/agro/getGoodsList', // 仅为示例，并非真实的接口地址

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
         for (var i = 0; i < res.data.itemGoods.length; i++) {
           returnArr.push(res.data.itemGoods[i]);

         }
         console.log(returnArr)
         that.setData({
           spinfo: returnArr
         })
         console.log(that.data.spinfo);
      }
    })
  },
  buy: function () {
    wx.navigateTo({
      url: '../daifukuan/daifukuan?id=' + this.data.spid,
    })
  },
  // qianggou:function(){
  //   let that = this;
  //   console.log(that.data.spid)
  //   wx.request({
  //     url: that.data.url +'/agro/createOrder', // 仅为示例，并非真实的接口地址
  //     type: 'POST',
  //     data: {
  //       goodsId: that.data.spid,
          
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       console.log(res.data.itemGoods);
  //       var returnArr = that.data.spinfo;
  //       for (var i = 0; i < res.data.itemGoods.length; i++) {
  //         returnArr.push(res.data.itemGoods[i]);

  //       }
  //       console.log(returnArr)
  //       that.setData({
  //         spinfo: returnArr
  //       })
  //       console.log(that.data.spinfo);
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
  console.log(options.id);
  that.setData({
    spid:options.id
  })
  that.spinfo();
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
    let that = this;

    that.setData({

      spinfo: [],
      openid: '',
    })
    that.spinfo();

    wx.stopPullDownRefresh();
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