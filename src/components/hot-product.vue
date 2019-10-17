<template>
  <div class="hot-product">
    <div class="header">
      <span>热门商品</span>
      <div class="switch">
        <a @click="lastPage" class="left" :disabled="leftDisabled"></a>
        <a @click="nextPage" class="right" :disabled="rightDisabled"></a>
      </div>
    </div>
    <div class="content" ref="content">
      <ProductDemo v-for="(product, index) in productListIncludeColorList" :key="index" :product="product">
       </ProductDemo>
    </div>
  </div>
</template>

<script>
import ProductDemo from '../components/product-demo'
export default {
  name: 'HotProduct',
  props: {
    productList: Array
  },
  computed: {
    productListIncludeColorList: function () {
      // eslint-disable-next-line no-debugger

      for (let i = 0; i < this.productList.length; i++) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.productList[i].color_info = []

        // 商品根据颜色排序, 后面好过滤
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.productList[i].spu.sku_info.sort((pre, next) => {
          if (parseInt(pre.color_id, 10) > parseInt(next.color_id, 10)) {
            return 1
          }
          if (parseInt(pre.color_id, 10) === parseInt(next.color_id, 10)) {
            return 0
          }
          if (parseInt(pre.color_id, 10) < parseInt(next.color_id, 10)) {
            return -1
          }
        })
        for (let j = 0; j < this.productList[i].spu.sku_info.length; j ++) {
          if (j === 0) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.productList[i].color_info.push(this.productList[i].spu.sku_info[0]) //颜色是按照顺序排列的，简单选取即可
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            continue
          }
          if (this.productList[i].spu.sku_info[j].color_id !== this.productList[i].spu.sku_info[j - 1].color_id) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.productList[i].color_info.push(this.productList[i].spu.sku_info[j]) //颜色是按照顺序排列的，简单选取即可
          }
        }
      }

      return this.productList
    }
  },
  filters: {
    rmbPrice: function (price) {
      return '￥' + price.toFixed(2)
    }
  },
  methods: {
    changeColor: function (product, ix) {
      // eslint-disable-next-line no-debugger
      let itemIndex = 0

      for (let i = 0; i < this.productListIncludeColorList.length; i++) {
        if (this.productListIncludeColorList[i].spu_id === product.spu_id) {
          itemIndex = i
          break
        }
      }
      product.color_index = ix
      this.$set(this.productListIncludeColorList, itemIndex, product)

    },
    nextPage: function () {
      if (this.rightDisabled) return
      this.translateX -= 1220
      this.updateTracslateX()
    },
    lastPage: function () {
      if (this.leftDisabled) return
      this.translateX += 1220
      this.updateTracslateX()
    },
    updateTracslateX: function () {
      this.$refs.content.style.transform = `translateX(${this.translateX}px)`
      let num = this.productList.length / 4

      if (this.productList.length % 4 > 0) {
        num++
      } // 最大页数
      if (num === 1) {
        this.leftDisabled = true
        this.rightDisabled = true
        return
      }

      if (Math.abs(this.translateX / 1220) + 1 === num) {
        this.leftDisabled = false
        this.rightDisabled = true
      } else if (Math.abs(this.translateX / 1220) + 1 === 1) {
        this.leftDisabled = true
        this.rightDisabled = false
      } else if ((Math.abs(this.translateX / 1220) + 1) > 1 && (Math.abs(this.translateX / 1220) + 1) < num) {
        this.rightDisabled = false
        this.leftDisabled = false
      }
    }
  },
  data () {
    return {
      translateX: 0,
      leftDisabled: true,
      rightDisabled:false,
      maxPage: 1
    }
  },
  components: {
    ProductDemo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hot-product {
    margin-top: 25px;
    position: relative;
    border-radius: 8px;
    background-color: #fff;
    overflow: hidden;
  }
  .header {
    position: relative;
    font-size: 18px;
    line-height: 60px;
    color: #666;
    background: #fafafa;
    border-bottom: 1px solid rgba(0,0,0,.1);
    span {
      margin-left: 25px;
      font-weight: 700;
    }
    .switch {
      position: absolute;
      top: 5px;
      right: 10px;
      .left {
        display: inline-block;
        background-image: url("../assets/images/left.png");
        background-size: contain;
        width: 24px;
        height: 24px;
        border-radius: 12px;
        background-color: #fff;
        border: none;
        border: 1px solid #eee;
        margin-right: 20px;
        &[disabled] {
          opacity: .3;
          cursor: not-allowed;
        }
      }
      .right {
        display: inline-block;
        background-image: url("../assets/images/right.png");
        background-size: contain;
        width: 24px;
        height: 24px;
        border-radius: 12px;
        background-color: #fff;
        border: none;
        border: 1px solid #eee;
        &[disabled] {
          opacity: .3;
          cursor: not-allowed;
        }
      }
    }
  }
  .content {
    transition: all 0.5s;
    display: flex;
    flex-flow: row nowrap;
  }
</style>
