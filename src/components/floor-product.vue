<template>
  <div class="floor-product">
    <div class="header">
      <span>{{title}}</span>
      <div v-for="(tab, index) in rightTabs" :key="index" class="right-tab">{{tab.tab_name + ' >'}}</div>
    </div>
    <div class="content" ref="content">
      <div class="cover-image">
        <img :src="coverImage.image" alt="">
      </div>
      <ProductDemo v-for="(product, index) in productListIncludeColorList" :key="index" :product="product">
       </ProductDemo>
    </div>
  </div>
</template>

<script>
import ProductDemo from '../components/product-demo'
export default {
  name: 'FloorProduct',
  props: {
    rightTabs: Array,
    coverImage: Object,
    productList: Array,
    title: String
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

    }
  },
  data () {
    return {
    }
  },
  components: {
    ProductDemo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .floor-product {
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
    .right-tab {
      float: right;
      padding: 0 15px;
      line-height: 34px;
      background: #fafafa;
      border: 1px solid #e1e1e1;
      border-radius: 4px;
      margin: 12px 20px 0 0;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      background-image: linear-gradient(180deg,#fff,#fafafa);
    }
  }
  .content {
    transition: all 0.5s;
    display: flex;
    flex-flow: row wrap; // 需要换行
    .cover-image {
      display: inline-grid;
      flex: 0 0 609px;
      border-right: 1px solid #efefef;
      border-bottom: 1px solid #efefef;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
