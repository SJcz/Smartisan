<template>
  <div>
    <HeaderNav :selectedIndex="navIndex"></HeaderNav>
    <ContentNav ></ContentNav>
    <div class="content">
      <div class="main-div">
        <HomeCarousel :carouselList="home_carousel"></HomeCarousel>
        <HotProduct :productList="home_hot"></HotProduct>
        <FloorProduct v-for="(floor, index) in home_floors" :key="index" :coverImage="floor.tabs[0].tab_items[0]"
          :title="floor.title" :productList="floor.tabs[0].tab_items.slice(1)"
          :rightTabs="floor.tabs.slice(1)"></FloorProduct>
        <HomeForum :postList="home_forum"></HomeForum>
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
import HomeCarousel from '../components/home-carousel'
import HotProduct from '../components/hot-product'
import FloorProduct from '../components/floor-product'
import HomeForum from '../components/home-forum'
import HomeFooter from '../components/home-footer'

export default {
  name: 'Index',
  data: function () {
    return {
      home_carousel: [],
      home_hot: [],
      home_floors: [],
      home_forum: [],
      navIndex: 0, // 导航栏的选项卡下标
      sunNavIndex: 0 // 内容区导航栏的选项卡下标
    }
  },
  // 初始化页面请求
  created: function () {
    const self = this

    axios.get('https://shopapi.smartisan.com/product/home').then(result => {
      if (result.data.code === 0) {
        self.home_carousel = result.data.data.home_carousel
        self.home_hot = result.data.data.home_hot
        self.home_floors = result.data.data.home_floors
        self.home_forum = result.data.data.home_forum
      }
    }).catch(err => {
      alert(err)
    })
  },
  components: {
    HeaderNav,
    ContentNav,
    HomeCarousel,
    HotProduct,
    FloorProduct,
    HomeForum,
    HomeFooter
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
  }


</style>
