/* eslint-disable no-console */
<template>
    <div class="bottom-cart" ref="cart" :class="[follow ? 'follow' : '']">
      <div class="container">
        <span class="bar-text">您已选择了</span>
        <div class="product-info">
          <span class="name">{{productInfo.name + ' x ' + productInfo.num}}</span>
          <br>
          <span class="size">{{productInfo.size}}</span>
        </div>
        <div class="bar-btn-price">
          <span class="price">{{productInfo.price * productInfo.num | rmbPrice}}</span>
          <div class="buy-btn">现在购买</div>
          <div class="add-to-cart-btn">加入购物车</div>

        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BottomCart',
  props: {
    productInfo: Object
  },
  data: function () {
    return {
      follow: false
    }
  },
  filters: {
    rmbPrice: function (price) {
      return '￥' + price.toFixed(2)
    }
  },
  updated: function () {

  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll)
    //页面刚进来时, 会自动触发handleScroll方法， 但是商品信息还未填充完毕，导致页面的高度不够
    // 就导致误以为已经下拉到最下面
    setTimeout(this.handleScroll, 1000)
  },
  methods: {
    handleScroll: function () {
      // 页面高度 - 滚动条收齐高度 = 剩余的页面高度
      // eslint-disable-next-line no-debugger
      const leaveHeight = document.documentElement.scrollHeight - document.documentElement.scrollTop
      const footerHeight = 336

      if (leaveHeight - window.innerHeight <= footerHeight) {
        // 页脚出现在可视区， 修改购物车的定位
        this.follow = true
      } else {
        this.follow = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .bottom-cart {
    position: fixed;
    width: 100%;
    height: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fafafa;
    border-top: 1px solid #e3e3e3;
    &.follow {
      position: absolute;
      bottom: 336px;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .container {
    position: relative;
    width: 1220px;
    margin: 12px auto 0;
    .bar-text {
      vertical-align: super;
      color: #707070;
      font-size: 12px;
      font-weight: 500;
      margin-right: 20px;
    }
    .product-info {
      display: inline-block;
      .name {
        color: #707070;
        font-weight: 700;
      }
      .size {
        font-weight: 400;
        font-size: 12px;
        color: #9d9d9d;
      }
    }
  }
  .bar-btn-price {
    position: absolute;
    right: 0;
    top: 0;
    .price {
      font-size: 20px;
        font-family: Arial;
        color: #d44d44;
        font-weight: 700;
    }
    .buy-btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 0 10px;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      cursor: pointer;
      height: 20px;
      &:hover {
        background-color: #eee;
      }
    }
    .add-to-cart-btn {
      display: inline-block;
      text-align: center;
      color: #fff;
      cursor: pointer;
      border-radius: 6px;
      background-color: #6383c6;
      padding: 10px 20px;
      margin: 0 0 0 10px;
      border: 1px solid #e5e5e5;
      height: 20px;
    }
  }
</style>
