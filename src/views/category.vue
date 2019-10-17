<template>
  <div>
    <HeaderNav :selectedIndex="navIndex"></HeaderNav>
    <ContentNav ></ContentNav>
    <div class="content">
      <div class="sort-div">
        <SortOperation @sort="sort"></SortOperation>
      </div>
      <div class="main-div">
        <ProductDemoSmall v-for="(product, index) in productList" :key="index" :product="product"></ProductDemoSmall>
      </div>
    </div>
    <div class="footer">
      <HomeFooter></HomeFooter>
    </div>
  </div>


</template>

<script>
import axios from 'axios'
import HeaderNav from '../components/header-nav'
import ContentNav from '../components/content-nav'
import HomeFooter from '../components/home-footer'
import ProductDemoSmall from '../components/product-demo-small'
import SortOperation from '../components/sort-operation'

export default {
  name: 'Category',
  data: function () {
    return {
      navIndex: 0, // 导航栏的选项卡下标
      productList: [],
      pageCount: 1, // 总页数
      currentPage: 1 // 当前页数
    }
  },
  watch: {
    '$route': function () {
      console.log(this.$route)
      this.init()
    }
  },
  mounted: function () {
    // 当页面下拉时， 在快要到底部的时候， 发出更多商品请求
    window.addEventListener('scroll', this.handleScroll)
    // setTimeout(this.handleScroll, 1000)
  },
  methods: {
    // 排序商品
    sort: function (ope) {
      this.$route.query.sort = ope

      this.init()
    },

    getMoreProduct () {
      if (this.currentPage >= this.pageCount) return
      const self = this

      this.currentPage++
      this.requertApi().then(result => {
        if (result.status == 200) {
          self.productList = self.productList.concat(result.data.data.list)
          console.log(self.productList)
        }
      }).catch(err => {
        alert(err)
      })
    },
    handleScroll () {
      const leaveHeight = document.documentElement.scrollHeight - document.documentElement.scrollTop

      if (leaveHeight - window.innerHeight <= 500) {
        // 在页面距离最底部小于500px， 发出更多商品请求
        this.getMoreProduct()
      }
    },
    init () {
      const self = this

      this.requertApi().then(result => {
        if (result.status == 200) {
          self.productList = result.data.data.list
          self.pageCount = result.data.data.pageCount // 总页数
          console.log(result.data.data.list)
        }
      }).catch(err => {
        alert(err)
      })
    },

    requertApi: function () {
      const categoryId = this.$route.params.categoryId
      const query = this.$route.query

      //直接访问锤子api会报错
      const smartisanUrl = `http://localhost:10005/category/${categoryId}?sort=${query.sort ? query.sort : 'sort'}&type=${query.type ? query.type : 'shop'}&page=${this.currentPage}`

      return axios.get(smartisanUrl).then(result => {
        return result
      })
    }
  },
  // 初始化页面请求
  created: function () {
    this.init()
  },
  components: {
    HeaderNav,
    ContentNav,
    HomeFooter,
    ProductDemoSmall,
    SortOperation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .content {
    background-color: #ededed;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .sort-div {
    width: 1220px;
    margin: 0 auto;
  }
  .main-div {
    width: 1220px;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap; // 需要换行
  }
  .footer {
    background-color: #fafafa;
    padding-top: 20px;
  }


</style>
