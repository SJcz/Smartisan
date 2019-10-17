<template>
      <div class="product-item" @mouseover = "activeProduct" @mouseleave="deactiveProduct" :class="{'active': active}" @click="switchToDetailProduct(product.spu_id)">
        <div class="basic">
          <img :src="product.color_info[colorIndex].ali_image">
          <h4>{{product.spu.sku_info[0].title}}</h4>
          <h6>{{product.spu.sku_info[0].sub_title}}</h6>
        </div>
        <div class="color">
          <ul>
            <li v-for="(item, index) in product.color_info " :key="index" @click.stop="changeColor(index)" :class="[colorIndex === index ? 'active' : '']">
              <img src="../assets/images/point.png">
            </li>
          </ul>
        </div>
        <div class="price" ref="price">{{product.spu.price | rmbPrice}}</div>
        <div class="tips"></div>
        <div class="button-comtainer" v-if="active">
          <a class="detail">查看详情</a>
          <a class="add-to-cart" v-if="product.color_info[colorIndex].direct_to_cart">加入购物车</a>
        </div>
      </div>
</template>

<script>
export default {
  name: 'ProductDemo',
  props: {
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
      this.$refs.price.style.opacity = 0
    },
    deactiveProduct: function () {
      this.active = false
      this.$refs.price.style.opacity = 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .product-item {
      text-align: center;
      cursor: pointer;
      display: inline-block; // 不知道为什么，两个并列的div高度不一致，一个偏上一个偏下， 这里使用inline-grid
      flex: 0 0 304px;
      border-right: 1px solid #efefef;
      border-bottom: 1px solid #efefef;
      transition: all 0.3s;
      height: 429px;
      position: relative;
      &.active{
        box-shadow: inset 0 0 38px rgba(0,0,0,.08);
      }
      .basic {
        img {
          display: block;
          width: 216px;
          height: 216px;
          margin: 0 auto;
          padding: 45px 0 20px;
        }
        h4 {
          line-height: 1.2;
          font-size: 14px;
          color: #333;
          font-weight: 700;
          margin: 0 8px;
        }
        h6 {
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

      .button-comtainer {
        margin-top: 20px;
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        .detail {
          display: inline-block;
          color: #333;
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 20px;
        }
        .add-to-cart {
          display: inline-block;
          color: #fff;
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background: #567ce6 linear-gradient(#799cea,#567ce6);
        }
      }
    }
</style>
