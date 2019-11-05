// pages/Mall/Mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
    searchlist: [],
    likelist:[],
    ys: [],
    leixing:'',
    key:'',
    search:'',
    isshow:false
  },
 
  // 跳转商店
  dianjia: function (event) {
    console.log(event.currentTarget.id);
    wx.navigateTo({
      url: '../shangjia/shangjia?id=' + event.currentTarget.id
    })
  },
  // 搜索结果
  search: function () {
    let that = this;

    console.log(that.data.search);
    wx.request({
      url: that.data.url +'/agro/getShopList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        key:that.data.search
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        that.setData({
          searchlist: []
        })
        if (res.data.itemShop.length <= 0) {
          wx.showToast({
            title: '没有搜索到你想要的哦,请重新检索!',
            icon: 'none',
            duration: 3000
          })
          that.setData({
            isshow: false
          })
        }
         var returnArr = that.data.searchlist;
        
        if (res.data.itemShop.length >= 3) {
         for (var i = 0; i < 3; i++) {
           returnArr.push(res.data.itemShop[i]);
            returnArr[i].distance=returnArr[i].distance.toFixed(1);
         }
          that.setData({
            isshow: true
          })

        } else {
          for (var i = 0; i < res.data.itemShop.length; i++) {
            returnArr.push(res.data.itemShop[i]);
            returnArr[i].distance = returnArr[i].distance.toFixed(1);
          }
          that.setData({
            isshow:false
          })
        }
         that.setData({
           searchlist: returnArr
         })
         console.log(that.data.searchlist);
      }
    })
  },


  // 猜你喜欢
  like: function () {
    let that = this;

    console.log(that.data.search);
    wx.request({
      url: that.data.url + '/agro/getShopList', // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
        key: that.data.search
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        that.setData({
          likelist:[]
        })
        if(res.data.itemShop.length<=0){
          that.setData({
            isshow:false
          })
        }else{
          that.setData({
            isshow: true
          })
        }
        var returnArr = that.data.likelist;
        for (var i = 3; i < res.data.itemShop.length; i++) {
          returnArr.push(res.data.itemShop[i]);
          
           
        }
        for (var i = 0; i < res.data.itemShop.length-3; i++){
          returnArr[i].distance = returnArr[i].distance.toFixed(1);
        }
        console.log(returnArr);
        that.setData({
          likelist: returnArr
        })
        // console.log(that.data.fujinlist);
      }
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    that.setData({
      search:options.content
    })
    that.search();
    that.like();
    // wx.setNavigationBarTitle({
    //   title: options.id
    // })
    // console.log(options.id);
    // let key=options.id;
    // switch (key) {
    //   case '水果超市':
    //     that.setData({
    //       leixing: 1,
    //       key:key,
    //     })
    //     break;
    //   case '蔬菜农场':
      
    //     that.setData({
    //       leixing: 2,
    //        key: key,
    //     })
    //     break;
    //   case '畜牧农场':
    //     that.setData({
    //       leixing: 3,
    //        key: key,
    //     })
    //     break;
    //   case '旅游产业':
    //     that.setData({
    //       leixing: 4,
    //        key: key
    //     })
    //     break;
    //   case '学农商品':
        
    //     that.setData({
    //       leixing: 5,
    //       key: key
    //     })
    //     break;
    //   case '聚会商品':
    //     that.setData({
    //       leixing: 6,
    //       key: key
    //     })
    //     break;
    //   case '散户商品':
      
    //     that.setData({
    //       leixing: 7,
    //       key: key,
    //     })
    //     break;
    //   case '其他商品':
    //     that.setData({
    //       leixing: 8,
    //       key: key,
    //     })
    //     break;
    // }
    //  that.funjin();
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
      color1: 'rgba(0,0,0,0.5)',
      color2: 'rgba(0,0,0,0.5)',
      color3: 'rgba(0,0,0,0.5)',
      flag1: false,
      flag2: false,
      flag3: false,
      searchlist: [],
      likelist: [],
      ys: [],
      leixing: '',
      key: '',
      isshow:false
    })
    that.search();
    that.like();
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