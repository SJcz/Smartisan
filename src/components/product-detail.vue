<template>
      <div class="product-detail" >
        <div class="left" v-if="productList.length > 0">
          <div class="small-image"  v-for="(image, index) in productList[selectedProductIndex].shop_info.ali_images" :key="index"
          @click="changeImage(index)" :class="[selectedProductImageIndex === index ? 'active' : '']"><img :src="image" alt=""></div>
        </div>
        <div class="middle" v-if="productList.length > 0">
          <div class="normal-image" ><img :src="productList[selectedProductIndex].shop_info.ali_images[selectedProductImageIndex]" alt=""></div>
        </div>
        <div class="right" v-if="productList.length > 0">
          <div class="title">
            <h1>{{productList[selectedProductIndex].shop_info.title}}</h1>
            <h2>{{productList[selectedProductIndex].shop_info.sub_title}}</h2>
            <div class="price" ref="price">{{productList[selectedProductIndex].spu.price | rmbPrice}}</div>
          </div>
          <div class="floor" v-for="(item, index) in productList[selectedProductIndex].shop_info.spec_v2" :key="index">
            <div class="floor-title">{{item.spec_name}}选择</div>
            <div  class="floor-select">
              <div v-for="(elem, ix) in item.spec_values" :key="ix" class="elem-item"
              @click="changeProduct(item.spec_id, elem.id)" :class="[productList[selectedProductIndex].shop_info.spec_json[index].spec_value_id == elem.id ? 'active' :'']">{{elem.item_value}}</div>
            </div>
          </div>
          <div class="num-select">
            <div class="floor-title">数量选择</div>
            <div class="operation">
              <button class="reduce" @click="reduceProductNum" :disabled="reduceDisabled">-</button>
              <span class="num">{{selectedProductNum}}</span>
              <button class="add" @click="addProductNum">+</button>
            </div>
          </div>
          <div class="service">
            <div class="floor-title">服务说明</div>
            <div class="content">* 满 99 元包邮</div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    productList: Array
  },
  data () {
    return {
      selectedProductImageIndex: 0,
      selectedProductNum: 1,
      reduceDisabled: true,
      selectedProductIndex: 0,
      productInfo: {}
    }
  },
  mounted: function () {

  },
  filters: {
    rmbPrice: function (price) {
      return '￥' + price.toFixed(2)
    }
  },
  methods: {
    updateProductInfo: function () {
      // eslint-disable-next-line no-debugger
      this.productInfo.name = this.productList[this.selectedProductIndex].shop_info.title
      this.productInfo.price = this.productList[this.selectedProductIndex].spu.price
      this.productInfo.num = this.selectedProductNum
      this.productInfo.size = this.productList[this.selectedProductIndex].shop_info.spec_json.map(item => {
        return item.show_name
      }).join(' | ')
      this.$emit('updateProductInfo', this.productInfo)
    },
    // product的类型id和对应的值id， 比如 尺寸: S 就是 8: 124
    changeProduct: function (specId, valueId) {
      // eslint-disable-next-line no-debugger
      //获取当前产品的尺寸型号信息
      const filter = new Map()

      this.productList[this.selectedProductIndex].shop_info.spec_json.forEach(spec => {
        filter.set(spec.spec_id, spec.spec_value_id)
      })

      // 获取最终需要的产品尺寸型号信息
      filter.set(specId, valueId)

      // 获取最终需要的产品
      for (let i = 0; i < this.productList.length; i++) {
        let j = 0

        for (; j < this.productList[i].shop_info.spec_json.length; j++) {
          if (filter.get(this.productList[i].shop_info.spec_json[j].spec_id) != this.productList[i].shop_info.spec_json[j].spec_value_id) {
            break
          }
        }

        if (j == this.productList[i].shop_info.spec_json.length) {
          this.selectedProductIndex = i
          this.updateProductInfo()
          return
        }
      }
    },
    changeImage: function (index) {
      this.selectedProductImageIndex = index
    },
    addProductNum: function () {
      this.selectedProductNum++
      this.updatebtnStatus()
      this.updateProductInfo()
    },
    reduceProductNum: function () {
      if (this.selectedProductNum > 1) this.selectedProductNum--
      this.updatebtnStatus()
      this.updateProductInfo()
    },
    updatebtnStatus: function () {
      if (this.selectedProductNum === 1) {
        this.reduceDisabled = true
      } else {
        this.reduceDisabled = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .product-detail {
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    padding: 60px;
    background-color: #fff;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .small-image {
      width: 54px;
      height: 54px;
      padding: 12px;
      border: 1px solid rgba(0,0,0,.06);
      border-radius: 5px;
      background-color: #fff;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
      &.active {
        border: 3px solid rgba(0,0,0,.2);
        padding: 10px;
      }
    }
  }
  .middle {
    .normal-image {
      margin: 0 20px;
      width: 440px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    width: 610px;
    .title {
      position: relative;
      border-bottom: 1px solid rgba(0,0,0,.08);
      h1 {
        width: 420px;
        font-size: 24px;
        line-height: 30px;
        color: #000;
        padding: 0 0 20px;
      }
      h2 {
        width: 420px;
        color: #999;
        font-size: 14px;
        line-height: 18px;
        padding-bottom: 28px
      }
      .price {
        font-size: 24px;
        font-family: Arial;
        color: #d44d44;
        font-weight: 700;
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
    }
  }
  .floor {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px dashed rgba(0,0,0,.08);
    .floor-title {
      width: 85px;
      height: 39px;
      line-height: 39px;
      color: #666;
      font-size: 14px;
    }
    .floor-select {
      padding-bottom: 30px;
      .elem-item {
        display: inline-block;
        padding: 10px 20px;
        margin: 5px 10px 5px 0;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        cursor: pointer;
        &.active {
          border: 1px solid #6a8fe6;
        }
      }
    }
  }
  .service  {
    padding: 30px 0;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(0,0,0,.08);
    .floor-title {
      width: 85px;
      height: 39px;
      line-height: 39px;
      color: #666;
      font-size: 14px;
    }
    .content {
      color: #999;
      font-size: 12px;
      line-height: 39px;
    }
  }
  .num-select {
    padding: 30px 0;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(0,0,0,.08);
    .floor-title {
      width: 85px;
      height: 36px;
      line-height: 36px;
      color: #666;
      font-size: 14px;
    }
    .operation {
      .reduce, .add {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        font-size: 15px;
        color: #666;
        font-weight: 700;
        border-radius: 13px;
        border: 1px solid #b2b2b2;
        box-shadow: 0 0 3px 4px #eee;
        background-color: #fff;
        outline: none;
        &:hover {
          background-color: #eee;
        }
        margin-right: 20px;
        cursor: pointer;
        &[disabled] {
          opacity: .3;
          cursor: not-allowed;
        }
      }
      .num {
        font-size: 14px;
        font-weight: 700;
        color: #454549;
        margin-right: 20px;
      }

    }
  }
</style>
