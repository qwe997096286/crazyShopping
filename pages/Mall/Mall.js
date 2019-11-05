// pages/Mall/Mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://www.sxscott.com/agriculture',
    color1: 'rgba(0,0,0,0.5)',
    color2: 'rgba(0,0,0,0.5)',
    color3: 'rgba(0,0,0,0.5)',
    flag1: false,
    flag2: false,
    flag3: false,
    fujinlist: [],
    ys: [],
    leixing:'',
    key:'',
  },
  //销量排序
  xiaoliangpx: function () {
    let that = this;
    if (that.data.flag1 == false) {
      that.setData({
        color1: 'red',
        color2: 'rgba(0,0,0,0.5)',
        color3: 'rgba(0,0,0,0.5)',
        flag1: true,
        flag2: false,
        flag3: false,
      })
      that.xiaoliang();
    } else {
      that.setData({
        color1: 'rgba(0,0,0,0.5)',
        // color2: 'rgba(0,0,0,0.5)',
        // color3: 'rgba(0,0,0,0.5)',
        flag1: false,
        flag2: true,
        flag3: true,
      })
    }


  },
  dianjia: function (event) {
    console.log(event.currentTarget.id);
    wx.navigateTo({
      url: '../shangjia/shangjia?id=' + event.currentTarget.id
    })
  },
  // 附近商家
  funjin: function () {
    let that = this;

    console.log(that.data.leixing);
    // if (that.data.leixing == 1 || that.data.leixing==2)
    wx.request({
      url: that.data.url+'/agro/getShopList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        key:that.data.leixing
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        that.setData({
          fujinlist: []
        })
        var returnArr = that.data.fujinlist;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          returnArr.push(res.data.itemShop[i]);
          console.log(returnArr[i].stype);
          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
        }
        that.setData({
          fujinlist: returnArr
        })
        console.log(that.data.fujinlist);
      }
    })
  },

  //价格排序
  jiagepx: function () {
    let that = this;
    if (that.data.flag2 == false) {
      that.setData({
        color2: 'red',
        color1: 'rgba(0,0,0,0.5)',
        color3: 'rgba(0,0,0,0.5)',
        flag2: true,
        flag1: false,
        flag3: false,
        
      })
      that.jiage();
    } else {
      that.setData({

        color2: 'rgba(0,0,0,0.5)',
        flag1: true,
        flag3: true,
        flag2: false,
      })
    }

  },
  //评价排序
  pingjiapx: function () {
    let that = this;
    if (that.data.flag3 == false) {
      that.setData({
        color3: 'red',
        color2: 'rgba(0,0,0,0.5)',
        color1: 'rgba(0,0,0,0.5)',
        flag3: true,
        flag1: false,
        flag2: false,

      })
      that.pingjia();
    } else {
      that.setData({
        color3: 'rgba(0,0,0,0.5)',
        flag3: false,
        flag1: true,
        flag2: true,
      })
    }

  },
  // 评价好
  pingjia: function () {

    let that = this;
    wx.request({
      url:that.data.url+'/agro/getShopList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        key: that.data.leixing
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        that.setData({
          fujinlist:[]
        })
        var returnArr = that.data.fujinlist;
        var ys = that.data.ys;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          if (returnArr.length < res.data.itemShop.length) {
            returnArr.push(res.data.itemShop[i]);
          }

          if (ys.length < res.data.itemShop.length) {
            ys.push(res.data.itemShop[i]);
          }


          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          switch (returnArr[i].stype) {
            case 1:
              returnArr[i].stype = '水果商铺';
              break;
            case 2:
              returnArr[i].stype = '蔬菜商铺';
              break;
            case 3:
              returnArr[i].stype = '畜牧商铺';
              break;
            case 4:
              returnArr[i].stype = '旅游商铺';
              break;
            case 5:
              returnArr[i].stype = '学农商铺';
              break;
            case 6:
              returnArr[i].stype = '聚点商铺';
              break;
            case 7:
              returnArr[i].stype = '散户商铺';
              break;
            case 8:
              returnArr[i].stype = '其他商铺';
              break;
          }

        }

        // that.setData({
        //   fujinlist: returnArr
        // })
        var ys2 = that.data.ys;

        for (var i = 0; i < res.data.itemShop.length; i++) {
          ys2[i].stype = returnArr[i].stype;


        }
        for (let i = 0; i < ys2.length - 1; i++) {

          for (let j = 0; j < ys2.length - 1 - i; j++) {
            if (ys2[j].sgrade < ys2[j + 1].sgrade) {
              let tmp = ys2[j + 1];
              ys2[j + 1] = ys2[j];
              ys2[j] = tmp;
            }
          }
        }

        that.setData({
          fujinlist: ys2
        })


      }
    })
  },
  //价格低
  jiage: function () {

    let that = this;
    console.log(that.data.latitude1);
    console.log(that.data.longitude1);
    wx.request({
      url: that.data.url +'/agro/getShopList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        key: that.data.leixing
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        that.setData({
          fujinlist: []
        })
        var returnArr = that.data.fujinlist;
        var ys = that.data.ys;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          if (returnArr.length < res.data.itemShop.length) {
            returnArr.push(res.data.itemShop[i]);
          }

          if (ys.length < res.data.itemShop.length) {
            ys.push(res.data.itemShop[i]);
          }


          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          switch (returnArr[i].stype) {
            case 1:
              returnArr[i].stype = '水果商铺';
              break;
            case 2:
              returnArr[i].stype = '蔬菜商铺';
              break;
            case 3:
              returnArr[i].stype = '畜牧商铺';
              break;
            case 4:
              returnArr[i].stype = '旅游商铺';
              break;
            case 5:
              returnArr[i].stype = '学农商铺';
              break;
            case 6:
              returnArr[i].stype = '聚点商铺';
              break;
            case 7:
              returnArr[i].stype = '散户商铺';
              break;
            case 8:
              returnArr[i].stype = '其他商铺';
              break;
          }

        }

        // that.setData({
        //   fujinlist: returnArr
        // })
        var ys2 = that.data.ys;

        for (var i = 0; i < res.data.itemShop.length; i++) {
          ys2[i].stype = returnArr[i].stype;
          // ys2[i].distance = returnArr[i].distance.toFixed(1);


        }
        for (let i = 0; i < ys2.length - 1; i++) {

          for (let j = 0; j < ys2.length - 1 - i; j++) {
            if (ys2[j].perCapita > ys2[j + 1].perCapita) {
              let tmp = ys2[j + 1];
              ys2[j + 1] = ys2[j];
              ys2[j] = tmp;
            }
          }
        }

        that.setData({
          fujinlist: ys2
        })


      }
    })
  },
  //销量高
  xiaoliang: function () {

    let that = this;
 
    wx.request({
      url: that.data.url +'/agro/getShopList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        key: that.data.leixing
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          fujinlist: []
        })
        console.log(res.data.itemShop);
        var returnArr = that.data.fujinlist;
        var ys = that.data.ys;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          if (returnArr.length < res.data.itemShop.length) {
            returnArr.push(res.data.itemShop[i]);
          }

          if (ys.length < res.data.itemShop.length) {
            ys.push(res.data.itemShop[i]);
          }


          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          switch (returnArr[i].stype) {
            case 1:
              returnArr[i].stype = '水果商铺';
              break;
            case 2:
              returnArr[i].stype = '蔬菜商铺';
              break;
            case 3:
              returnArr[i].stype = '畜牧商铺';
              break;
            case 4:
              returnArr[i].stype = '旅游商铺';
              break;
            case 5:
              returnArr[i].stype = '学农商铺';
              break;
            case 6:
              returnArr[i].stype = '聚点商铺';
              break;
            case 7:
              returnArr[i].stype = '散户商铺';
              break;
            case 8:
              returnArr[i].stype = '其他商铺';
              break;
          }

        }

        // that.setData({
        //   fujinlist: returnArr
        // })
        var ys2 = that.data.ys;

        for (var i = 0; i < res.data.itemShop.length; i++) {
          ys2[i].stype = returnArr[i].stype;
          // ys2[i].distance = returnArr[i].distance.toFixed(1);


        }
        for (let i = 0; i < ys2.length - 1; i++) {

          for (let j = 0; j < ys2.length - 1 - i; j++) {
            if (ys2[j].monthlySale < ys2[j + 1].monthlySale) {
              let tmp = ys2[j + 1];
              ys2[j + 1] = ys2[j];
              ys2[j] = tmp;
            }
          }
        }

        that.setData({
          fujinlist: ys2
        })


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.setNavigationBarTitle({
      title: options.id
    })
    console.log(options.id);
    let key=options.id;
    switch (key) {
    
      case '新品':
      
        that.setData({
          leixing: '新品',
           key: key,
        })
        break;
      case '畜牧农场':
        that.setData({
          leixing: '畜牧',
           key: key,
        })
        break;
      case '旅游产业':
        that.setData({
          leixing: '旅游',
           key: key
        })
        break;
      case '学农商品':
        
        that.setData({
          leixing: '学农',
          key: key
        })
        break;
      case '农庄农场':
        that.setData({
          leixing: '农庄',
          key: key,
        })
        break;
      case '聚点商铺':
        that.setData({
          leixing: '聚点',
          key: key
        })
        break;
      case '散户商铺':
      
        that.setData({
          leixing: '散户',
          key: key,
        })
        break;
      case '其他商品':
        that.setData({
          leixing: '其他',
          key: key,
        })
        break;
    }
     that.funjin();
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
      fujinlist: [],
      ys: [],
      key: '',
    })
    that.funjin();
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