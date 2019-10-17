<template>
      <div class="product-item" @mouseover = "activeProduct" @mouseleave="deactiveProduct" :class="{'active': active}" @click="switchToDetailProduct(product.spuInfo.spuId)">
        <div class="basic">
          <img :src="product.skuList[colorIndex].images">
          <h4>{{product.spuInfo.spuTitle}}</h4>
          <h6>{{product.spuInfo.spuSubTitle}}</h6>
        </div>
        <div class="color">
          <ul>
            <li v-for="(item, index) in product.skuList " :key="index" @click.stop="changeColor(index)" :class="[colorIndex === index ? 'active' : '']">
              <img src="../assets/images/point.png">
            </li>
          </ul>
        </div>
        <div class="price" ref="price">{{product.spuInfo.price | rmbPrice}}</div>
      </div>
</template>

<script>
export default {
  name: 'ProductDemoSmall',
  props: {
    // {skuList: [], skuInfo: {}}
    product: Object
  },
  data () {
    return {
      colorIndex: 0,
      active: false
    }
  },
  filters: {
    rmbPrice: function (price) {
      return '￥' + price.toFixed(2)
    }
  },
  methods: {
    switchToDetailProduct: function (productId) {
      this.$router.push({path: `/item/${productId}`})
    },
    changeColor: function (index) {
      this.colorIndex = index
    },
    activeProduct: function () {
      this.active = true
    },
    deactiveProduct: function () {
      this.active = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .product-item {
      background-color: #fff;
      padding-bottom: 20px;
      text-align: center;
      cursor: pointer;
      display: inline-block; // 不知道为什么，两个并列的div高度不一致，一个偏上一个偏下， 这里使用inline-grid
      flex: 0 0 243px;
      border-right: 1px solid #efefef;
      border-bottom: 1px solid #efefef;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
      &.active{
        box-shadow: inset 0 0 38px rgba(0,0,0,.08);
      }
      .basic {
        img {
          display: block;
          width: 204px;
          height: 204px;
          margin: 0 auto;
          padding: 20px 0 20px;
        }
        h4 {
          display: inline-block;
          width: 204px;
          line-height: 1.2;
          font-size: 14px;
          color: #333;
          font-weight: 700;
          margin: 0 8px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        h6 {
          display: inline-block;
          width: 204px;
          overflow: hidden;
          padding-top: 15px;
          font-size: 12px;
          line-height: 1.2;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #999;
        }
      }

      .color {
        margin-top: 15px;
        ul {
          list-style: none;
        }
        li {
          display: inline-block;
          border: 1px solid #e5e5e5;
          border-radius: 50%;
          cursor: pointer;
          margin: 0 5px;
          width: 8px;
          height: 8px;
          padding: 2px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
          transition: all 0.5s;
          &.active{
            box-shadow: inset 0 0 0 1px #b2b2b2;
            border-color: #b2b2b2;
          }
        }
      }

      .price {
        font-family: Arial;
        color: #d44d44;
        font-weight: 700;
        margin-top: 20px;
      }
    }
</style>
