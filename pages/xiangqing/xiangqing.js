// pages/xiangqing/xiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
   id:0,
   brow:0,
    content1:'',
   day:0,
    minute:0,
    name:'',
   year:0,
    titlePic:'',
   huifu:[],
   number:0,
    openId:'',
    fid: '',
    space: " ",
    nul:"",
    sid:"",
    maohao:": ",
    focus:false,
    placeholder:"想说点什么：",
 
  },
  // 获取回复框内容
  comment_input:function(e){
    let that = this;
    that.setData({
      content: e.detail.value
    })
  },
  //显示回复的所有内容
  huifu: function () {
    let that = this;
    console.log(that.data.openId);
    wx.request({
      url: that.data.url + '/agro/getAgroComment', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        forumId: that.data.fid,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          huifu: [],
          son: []
        })
        var returnArr = that.data.huifu;
        var sonArr = that.data.son;

        for (var i = 0; i < res.data.items.length; i++) {
          returnArr.push(res.data.items[i]);

          //  console.log(res.data.items[i].item);
          sonArr.push(res.data.items[i].item);
        }



        that.setData({
          huifu: returnArr,
          number: res.data.items.length,
          son: sonArr,

        })

        console.log(that.data.son);

        console.log(that.data.huifu);

        // console.log(ket);
      }
    })
  },
  comment_send: function () {
    let that = this;
    console.log(that.data.id)
    console.log(that.data.placeholder);
    console.log(that.data.content)
    console.log(that.data.openId);
    console.log(that.data.sid);
    if (that.data.placeholder =="想说点什么："){
      that.setData({
        placeholder:""
      })
    }
    if (that.data.content == '') {
      wx.showToast({
        title: '请在回复之前填写内容!',
        icon: 'none',
        duration: 2000
      })
    } else {

      wx.request({
        url: that.data.url + '/agro/agroCommentIn', // 仅为示例，并非真实的接口地址
        method: 'post',
        data: {
          forumId: that.data.fid,
          comment: that.data.placeholder+" "+that.data.content,
          openId: that.data.openId,
          commentId: that.data.sid,
          replyId:that.data.id

        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
 
          wx.showToast({
            title: '回复成功!',
            icon: 'success',
            duration: 2000
          })
          const app = getApp();
          app.globalData.flag = true;
          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad();
            app.globalData.flag = false;
          }
        }
      })
    }

  },
  zihuifu: function (event) {
    let that = this;
    let name = event.currentTarget.dataset.name;
    let id = event.currentTarget.id;
    console.log(id)
    console.log(event)
    that.setData({
      id: event.currentTarget.id,
      focus: true,
      sid: id,
      placeholder: "回复"+"  " + name+"  :"
    })
  },
  zihuifu2:function(event){
    let that=this;
    let name = event.currentTarget.dataset.name;
    let id=event.currentTarget.dataset.sid;
    console.log(event)
   that.setData({
     id:event.currentTarget.id,
     focus:true,
     sid:id,
     placeholder: "回复" + " " + name + ":"
   })
  },
  louzhu:function() {
    let that = this;
    wx.request({
      url: that.data.url +'/agro/forumDetails/' + that.data.fid, // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
          console.log(res.data.details);
          that.setData({
            fid: res.data.details.id,
            brow: res.data.details.brow,
            content1: res.data.details.content,
            day: res.data.details.day,
            minute: res.data.details.minute,
            name: res.data.details.name,
            year: res.data.details.year+' ',
            titlePic: res.data.details.titlePic,
          })
  


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = wx.getStorageSync('userinfo').accessToken;
    console.log(userId);
    this.setData({
      openId: userId,
      nul:"",
      placeholder:"想说点什么："
    })
  let that=this;
    var flag= getApp().globalData.flag;
    if (flag==false){
    that.setData({
      fid: options.id
    })
  }
  if(that.data.placeholder=="想说点什么："){
    that.setData({
      hui:""
    })
  }else{
    that.setData({
      hui:that.data.placeholder
    })
  }
 
  

  that.louzhu();
  that.huifu();
  },
  // 获取楼主帖子内容

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
      brow: 0,
      content: '',
      day: 0,
      minute: 0,
      name: '',
      year: 0,
      titlePic: '',
      huifu: []
    })
    that.louzhu();
    that.huifu();

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