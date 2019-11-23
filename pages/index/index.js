var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
import { $wuxFilterBar } from '../../components/wuxfilterbar'
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://www.sxscott.com/agriculture',
    items: [
      {
        type: 'filter',
        label: '筛选',
        value: 'filter',
        children: [
          {
            type: 'checkbox',
            label: '请选择商铺类型',
            value: 'query',
            children: [{
              label: '配送快',
              value: '1',
            },
            {
              label: '启农专送',
              value: '2',
            },
            {
              label: '满减优惠',
              value: '3',
            },
              {
                label: '进店领劵',
                value: '4',
              },
              {
                label: '首单立减',
                value: '5',
              },
              {
                label: '减配送费',
                value: '6',
              },
              {
                label: '折扣商品',
                value: '7',
              },
              {
                label: '进店领券',
                value: '8',
              },
           
      
            ],
          }
        ],
        groups: ['001', '002', '003'],//判断元素是否同组
      },
    ],

    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    //位置数据
    location: '加载中',
    latitude1: '',
    longitude1: '',
    //选项卡颜色数据
    color1: 'rgba(0,0,0,0.5)',
    color2: 'rgba(0,0,0,0.5)',
    color3: 'rgba(0,0,0,0.5)',
    flag1: false,
    flag2: false,
    flag3: false,
    youxuanlist: [],
    fujinlist: [],
    ys: [],
    flag:false,
    isshow:false,
    isshow2:false
    // userinfo: wx.getStorageSync('userinfo')
  },
  //隐藏底部导航栏
  test: function () {
    var that = this;
    wx.request({
      url: 'https://www.sxscott.com/agriculture/agro/getHide',
      method: "post",
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (res.data == 1 ) {
        that.setData({
          isshow:false,
          isshow2:true,
          latitude1: 0,
          longitude1: 0,
          
        })
          wx.hideTabBar({

          })
        that.funjin()
        } else {
          that.setData({
            isshow: true,
            isshow2:false
          })
          wx.showTabBar({

          })
          that.funjin()
        }
      }
    })
  },
// 跳转商店
dianjia:function(event){
  console.log(event.currentTarget.id);
  wx.navigateTo({
    url: '../shangjia/shangjia?id='+event.currentTarget.id
  })
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
        flag1: false,
        flag2: true,
        flag3: true,
      })
    }


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

  //轮播图
  setImgBroadcast: function () {
    let that = this;
    let infoOpt = {
      url: '/affaris/broad',
      type: 'GET',
      data: {
      }
    }
    let infoCb = {}
    infoCb.success = function (res) {
      that.setData({
        imgUrls: res.tags
      })
    }
    infoCb.beforeSend = () => { }
    infoCb.complete = () => {

    }
    sendAjax(infoOpt, infoCb, () => {
    });
  },
  // 评价好
  pingjia: function () {

    let that = this;
    console.log(that.data.latitude1);
    console.log(that.data.longitude1);
    wx.request({
      url: that.data.url +'/agro/getNearShopList', // 仅为示例，并非真实的接口地址
      method:"post",
      data: {
        longitude: that.data.longitude1,
        latitude: that.data.latitude1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
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
          // switch (returnArr[i].stype) {
          //   case 1:
          //     returnArr[i].stype = '水果商铺';
          //     break;
          //   case 2:
          //     returnArr[i].stype = '蔬菜商铺';
          //     break;
          //   case 3:
          //     returnArr[i].stype = '畜牧商铺';
          //     break;
          //   case 4:
          //     returnArr[i].stype = '旅游商铺';
          //     break;
          //   case 5:
          //     returnArr[i].stype = '学农商铺';
          //     break;
          //   case 6:
          //     returnArr[i].stype = '聚点商铺';
          //     break;
          //   case 7:
          //     returnArr[i].stype = '散户商铺';
          //     break;
          //   case 8:
          //     returnArr[i].stype = '其他商铺';
          //     break;
          // }

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
      url: url.host +'/agro/getNearShopList', // 仅为示例，并非真实的接口地址
      method: "post",
      data: {
        longitude: that.data.longitude1,
        latitude: that.data.latitude1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
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
          // switch (returnArr[i].stype) {
          //   case 1:
          //     returnArr[i].stype = '水果商铺';
          //     break;
          //   case 2:
          //     returnArr[i].stype = '蔬菜商铺';
          //     break;
          //   case 3:
          //     returnArr[i].stype = '畜牧商铺';
          //     break;
          //   case 4:
          //     returnArr[i].stype = '旅游商铺';
          //     break;
          //   case 5:
          //     returnArr[i].stype = '学农商铺';
          //     break;
          //   case 6:
          //     returnArr[i].stype = '聚点商铺';
          //     break;
          //   case 7:
          //     returnArr[i].stype = '散户商铺';
          //     break;
          //   case 8:
          //     returnArr[i].stype = '其他商铺';
          //     break;
          // }

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
    console.log(that.data.latitude1);
    console.log(that.data.longitude1);
    wx.request({
      url: url.host +'/agro/getNearShopList', // 仅为示例，并非真实的接口地址
      method: "post",
      data: {
        longitude: that.data.longitude1,
        latitude: that.data.latitude1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
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

          // console.log();

          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          // switch (returnArr[i].stype) {
          //   case 1:
          //     returnArr[i].stype = '水果商铺';
          //     break;
          //   case 2:
          //     returnArr[i].stype = '蔬菜商铺';
          //     break;
          //   case 3:
          //     returnArr[i].stype = '畜牧商铺';
          //     break;
          //   case 4:
          //     returnArr[i].stype = '旅游商铺';
          //     break;
          //   case 5:
          //     returnArr[i].stype = '学农商铺';
          //     break;
          //   case 6:
          //     returnArr[i].stype = '聚点商铺';
          //     break;
          //   case 7:
          //     returnArr[i].stype = '散户商铺';
          //     break;
          //   case 8:
          //     returnArr[i].stype = '其他商铺';
          //     break;
          // }
        
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
  // 附近商家
  funjin: function () {

    let that = this;
    console.log(that.data.latitude1);
    console.log(that.data.longitude1);
    wx.request({
      url: url.host +'/agro/getNearShopList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        longitude: that.data.longitude1,
        latitude: that.data.latitude1
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
        if (res.data.itemShop.length<=0){
          that.setData({
            flag:true
          })
        }else{
          that.setData({
            flag: false
          })
        }
        for (var i = 0; i < res.data.itemShop.length; i++) {
          returnArr.push(res.data.itemShop[i]);
          console.log(returnArr[i].stype);
          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          // switch (returnArr[i].stype) {
          //   case 1:
          //     returnArr[i].stype = '水果商铺';
          //     break;
          //   case 2:
          //     returnArr[i].stype = '蔬菜商铺';
          //     break;
          //   case 3:
          //     returnArr[i].stype = '畜牧商铺';
          //     break;
          //   case 4:
          //     returnArr[i].stype = '旅游商铺';
          //     break;
          //   case 5:
          //     returnArr[i].stype = '学农商铺';
          //     break;
          //   case 6:
          //     returnArr[i].stype = '聚点商铺';
          //     break;
          //   case 7:
          //     returnArr[i].stype = '散户商铺';
          //     break;
          //   case 8:
          //     returnArr[i].stype = '其他商铺';
          //     break;
          // }
        }
        that.setData({
          fujinlist: returnArr,
          
        })
        console.log("成功了");
        console.log(that.data.fujinlist);
      }
    })
  },
  //为你优选
  youxuan: function () {
    // console.log("我已经执行了");
    let that = this;
    wx.request({
      url: url.host +'/agro/getShopList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        typeId: 3
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        var returnArr = that.data.youxuanlist;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          returnArr.push(res.data.itemShop[i]);
        }
        that.setData({
          youxuanlist: returnArr
        })
        console.log(returnArr);
      }
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  vote: function (event) {
    console.log(event.currentTarget.id);
    let key = event.currentTarget.id;
    if (key == "水果超市") {
      wx.navigateTo({
        url: '../Mall/Mall?id=水果超市'
      })
    } else if (key == "新品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=新品'
      })
    }
    else if (key == "服饰商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=服饰商品'
      })
    }
    else if (key == "家居商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=家居商品'
      })
    }
    else if (key == "果蔬商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=果蔬商品'
      })
    }
    else if (key == "数码商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=数码商品'
      })
    }
    else if (key == "运动商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=运动商品'
      })
    }
    else if (key == "生鲜商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=生鲜商品'
      })
    }
    else if (key == "其他商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=其他商品'
      })
    }

  },
  vote2: function () {

      wx.navigateTo({
        url: '../xuenong/xuenong'
      })
    

  },
  sp:function(){
    wx.showToast({
      title: '功能施工中，敬请期待！',
      icon: 'none',
      duration: 2000
    })
  },
  tolocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {

        // that.setData({
        //   latitude1: res.latitude,
        //   longitude1: res.longitude,
        // })
        that.setData({
          latitude1: 0,
          longitude1: 0,
        })
        that.setData({
          location: res.name
        })
        that.funjin();


      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  getLocation: function (e) {
    var that = this;
    //初始化
    qmapSDK = new qqMap({
      key: 'AKPBZ-LS6WV-PXWPE-UE2NV-YGZIV-ARBMI'
    })
    //获取地址
    wx.getLocation({
      success: function (res) {
        type: 'wgs84'
        qmapSDK.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (e) {


            var location = e.result.address;
            console.log(location);
            that.setData({
              location: location
            })
          }
        })
      },
    })
  },





  // },
  // vote: function () {
  //     wx.navigateTo({
  //       url: '../vote/index',
  //     })
  // },
  // currentaffairs: function () {
  //   // console.log('123123');
  //   wx.switchTab({
  //     url: '../currentaffairs/currentaffairs',
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.$wuxFilterBar = $wuxFilterBar.init({
      items: this.data.items,
      onChange: (checkedItems, items) => {
        console.log(this, checkedItems, items)
        const params = {}
        checkedItems.forEach((n) => {
          if (n.value === 'filter') {
            console.log("选中的标题内容为：" + n.value);
            n.children.filter((n) => n.selected).forEach((n) => {
              if (n.value === 'query') {
                console.log("选中的具体内容为：" + n.value);

                const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                params.query = selected;
                var arr = params.query;
                var newarr = arr.split(" ");
                console.log(typeof params.query);
                console.log("最终选中的内容为：" + newarr);
                // wx.showToast({
                //   title: '筛选功能开发中，敬请期待！',
                //   icon: 'none',
                //   duration: 2000
                // })
              }
            })
          }
        })
      },
    })
    let that = this;
   that.test()
    that.setImgBroadcast();
    that.youxuan();
    console.log(that.data.youxuanlist)
    qqmapsdk = new QQMapWX({
      key: 'AKPBZ-LS6WV-PXWPE-UE2NV-YGZIV-ARBMI'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let vm = this;
    vm.test();
    vm.getUserLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  let that=this;
  that.test();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        vm.setData({
          latitude1: latitude,
          longitude1: longitude,
        })
        vm.funjin();
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res.result.address)
        vm.setData({
          location: res.result.address
        })
        console.log(vm.data.location)

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
      }
    });
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
      imgUrls: [],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
      //位置数据
      location: '加载中',
      latitude1: '',
      longitude1: '',
      //选项卡颜色数据
      color1: 'rgba(0,0,0,0.5)',
      color2: 'rgba(0,0,0,0.5)',
      color3: 'rgba(0,0,0,0.5)',
      flag1: false,
      flag2: false,
      flag3: false,
      youxuanlist: [],
      fujinlist: [],
    })
  that.test();
    that.setImgBroadcast();
    that.youxuan();
    qqmapsdk = new QQMapWX({
      key: 'AKPBZ-LS6WV-PXWPE-UE2NV-YGZIV-ARBMI'
    });
    that.getUserLocation();
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

  },
  toSearch: function () {
    console.log("dasas");
    wx.navigateTo({
      url: '../secondHand/secondHandSearch',
    })
  },
})