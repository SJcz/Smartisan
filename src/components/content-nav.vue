<template>
  <div class="nav">
    <div class="nav-search">
      <div>
        <button class="search"></button>
        <button class="sample">T恤</button>
        <input type="text">
      </div>
    </div>
    <div class="nav-list">
      <ul>
        <li v-for="(nav, index) in navList" :key="index"  @click="changeSelectedIndex(index)" :class="[selectedIndex == index ? 'active' : '']"
        @mouseenter="displayDetailNav(index)"><router-link :to="replaceUrl(nav)">{{nav.name}}</router-link></li>
      </ul>
    </div>
    <ContentNavDetail :nav="currentNav" ref="contentNavDetail"></ContentNavDetail>
  </div>
</template>

<script>
import axios from 'axios'
import ContentNavDetail from './content-nav-detail'
export default {
  name: 'ContentNav',
  data: function () {
    return {
      navList: [],
      currentNav: {},
      selectedIndex: 0
    }
  },
  methods: {
    changeSelectedIndex: function (index) {
      this.selectedIndex = index
    },
    displayDetailNav: function (index) {
      console.log(index)
      this.currentNav = this.navList[index]
      this.$refs.contentNavDetail.changeHeight(500)
    },
    replaceUrl: function (nav) {
      // 去掉锤子的域名， 如果是详细商品id， 需要去掉最后两个数字，获取这类商品
      let newUrl = nav.url.replace('https://www.smartisan.com', '')
      const arr = newUrl.split('/')

      if (arr[arr.length - 2] == 'item' && arr[arr.length - 1].length > 7) {
        newUrl = newUrl.substr(0, newUrl.length - (arr[arr.length - 1].length - 7))
      }
      return newUrl
    }
  },
  mounted: function () {
    const self= this

    axios.get('http://localhost:10005/second_nav').then(result => {
      if (result.status == 200) {
        self.navList = result.data
        self.navList.push({name: '服务', type: 'service', url: ''})
        console.log(self.navList)
        // eslint-disable-next-line no-debugger
      }
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    ContentNavDetail
  }
}
</script>

<style scoped lang="less">
  .nav {
    background-color: #fff;
    height: 90px;
    width: 1220px;
    margin: 0 auto;
    position: relative;
  }
  .nav-search {
    div {
      float: right;
      border: 1px solid rgba(0,0,0,.08);
      border-radius: 20px;
      margin-top: 30px;
      text-align: center;
      padding-left: 40px;
      padding-right: 30px;
      position: relative;
      input {
        border: none;
        outline: none;
        line-height: 30px;
      }
      button.search{
        border: none;
        background-image: url("../assets/images/search.png");
        position: absolute;
        width: 20px;
        height: 20px;
        left: 10px;
        bottom: 5px;
        background-size: contain;
        background-color: #fff;
      }
      button.sample{
        color: #3965cc;
        border: 1px solid #93b2f7;
        border-radius: 10px;
        background-color: #e5efff;
        font-size: 12px;
        font-weight: 700;
        position: absolute;
        right: 10px;
        bottom: 5px;
      }
    }
  }
  .nav-list {
    text-align: left;
    padding-top: 31px;
    font-size: 14px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      display: inline-block;
      line-height: 28px;
      margin: 0 15px 0 0;
      &.active {
        font-weight: 700;
      }
    }
  }
  a {
    color: rgba(0,0,0,.7);
    text-decoration: none;
    transition: all 0.4s;
    &:hover{
      color: #5079d9;;
    }
  }

</style>