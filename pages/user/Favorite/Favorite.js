Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.sxscott.com/agriculture',
    currentTab: 0,
    status: '',
    pageNo: 1,
    pageSize: 5,
    orderList: [],
    refundOrderId: '',
    hiddenRefund: true,
    input_refund: ''
  },
  onLoad: function (options) {
    // this.getOrderList();
  },
  //单击导航栏
  clickMenu: function (e) {
    console.log(11)
    var current = e.currentTarget.dataset.current; //获取当前tab的index
    console.log(e)
    var status = e.currentTarget.dataset.status;
    this.setData({
      currentTab: current,
      status: status,
      orderList: [],
      pageNo: 1
    })
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