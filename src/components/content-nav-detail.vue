<template>
  <div class="nav-detail" @mouseleave="changeHeight(0)" ref="navDetail">
    <div v-if="nav.type=='goods'" class="goods">
      <div v-for="(product, index) in nav.list" :key="index" class="good-item" @click="switchToSearchPage('/item/' + product.spu)">
        <img :src="product.ali_image" alt="">
        <div class="name">{{product.spu_name}}</div>
        <div class="price">{{product.sell_price}}起</div>
      </div>
    </div>
    <div v-if="nav.type=='category'" class="category">
      <div v-for="(subNav, index) in nav.list" :key="index" class="column">
          <span class="title">{{subNav.title}}</span>
          <div v-for="(pro, ix) in subNav.sub" :key="ix" class="row-item"  @click="switchToSearchPage('/category/' + pro.id + '?type=' + subNav.source)">
            <img :src="pro.image" alt="">
            <span>{{pro.name}}</span>
          </div>
      </div>
    </div>
    <div v-if="nav.type=='service'" class="service">
      <div><a href="">服务政策</a></div>
      <div><a href="">在线客服</a></div>
      <div><a href="">申请售后</a></div>
      <div><a href="">以旧换新</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentNavDetail',
  props: {
    nav: Object
  },
  data: function () {
    return {

    }
  },
  watch: {
    // 页面刷新时， 该组件恢复高度为0, 不然一直
    '$route': function () {
      this.changeHeight(0)
    }
  },
  methods: {
    switchToSearchPage: function (url) {
      this.$router.push({path: url})
    },
    changeHeight: function (num) {
      this.$refs.navDetail.style.maxHeight = num + 'px'
    }
  },
  mounted: function () {

  }
}
</script>

<style scoped lang="less">
  .nav-detail {
    overflow: hidden;
    transition: all 0.5s;
    background-color: #fff;
    position: absolute;
    top: 90px;
    z-index: 99;
    width: 100%;
    max-height: 0;
  }
  .goods {
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .good-item {
      cursor: pointer;
      text-align: center;
      padding: 20px;
      img {
        width: 126px;
        height: 126px;
      }
      .name {
        margin: 16px 0 8px;
        font-size: 14px;
        color: #333;
        font-weight: 700;
        overflow: hidden;
      }
      .price {
        color: #d44d44;
        font-weight: 700;
        font-size: 14px;
      }
    }

  }
  .category {
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .column {
      margin: 0 40px;
      .title {
        font-size: 12px;
        opacity: .5;
        color: #000;
        font-weight: 700;
      }
      .row-item {
        cursor: pointer;
        margin-top: 10px;
        display: flex;
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        span {
          line-height: 40px;
          font-weight: 700;
          font-size: 14px;
        }
      }
    }
  }
  .service {
    margin-bottom: 50px;
    div {
      margin-top: 20px;
      font-weight: 700;
      text-align: center;
      a {
        text-decoration: none;
        color: #000;
        font-size: 14px;
      }
    }
  }

</style>