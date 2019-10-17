<template>
  <div>
    <HeaderNav :selectedIndex="navIndex"></HeaderNav>
    <ContentNav ></ContentNav>
    <div class="content">
      <div class="main-div">
        <ProductDetail :productList="productList" @updateProductInfo="getProductInfo"></ProductDetail>
        <ProductIntro :imageUrl="productionIntroImageUrl" ></ProductIntro>
      </div>
    </div>

    <div class="footer">
      <BottomCart :productInfo="productInfo"></BottomCart>
      <HomeFooter></HomeFooter>
    </div>
  </div>


</template>

<script>
import axios from 'axios'
import HeaderNav from '../components/header-nav'
import ContentNav from '../components/content-nav'
import HomeFooter from '../components/home-footer'
import ProductDetail from '../components/product-detail'
import ProductIntro from '../components/product-intro'
import BottomCart from '../components/bottom-cart'


export default {
  name: 'Product',
  data: function () {
    return {
      productionIntroImageUrl: '', //商品介绍也得图片
      productList: [],
      navIndex: 0, // 导航栏的选项卡下标
      sunNavIndex: 0, // 内容区导航栏的选项卡下标
      productInfo: {}
    }
  },
  methods: {
    getProductInfo: function (productInfo) {
      // eslint-disable-next-line no-debugger

      // 这里不是很明白
      this.productInfo = Object.assign({}, productInfo)
    }
  },
  // 初始化页面请求
  mounted: function () {
    const self = this
    const productId = this.$route.params.productId

    // 获取商品这类信息, 有可能直接获取到详细商品的id
    axios.get(`https://shopapi.smartisan.com/product/spus?ids=${productId}`).then(result => {
      console.log(result)
      if (result.data.code === 0) {
        self.productionIntroImageUrl = result.data.data.list[0].shop_info.tpl_content.base.images.ali_mobile.url[0]
        const sku_ids = result.data.data.list[0].sku_info.map(item => {
          return item.sku_id
        })

        // 获取具体商品详细信息
        return axios.get(`https://shopapi.smartisan.com/product/skus?ids=${sku_ids.join(',')}&with_stock=true&with_spu=true`)
      }
    }).then(result => {
      if (result.data.code === 0) {
        self.productList = result.data.data.list
        self.productInfo.name = this.productList[0].shop_info.title
        self.productInfo.price = this.productList[0].spu.price
        self.productInfo.num = 1
        self.productInfo.size = this.productList[0].shop_info.spec_json.map(item => {
          return item.show_name
        }).join(' | ')
        // 因为对象属性的增加和删除是不会检测到的， 也就无法触发dom更新
        self.productInfo = Object.assign({}, self.productInfo)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    HeaderNav,
    ContentNav,
    HomeFooter,
    ProductDetail,
    ProductIntro,
    BottomCart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    background-color: #ededed;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .main-div {
    width: 1220px;
    margin: 0 auto;
  }
  .footer {
    background-color: #fafafa;
    padding-top: 20px;
    position: relative;
  }


</style>
