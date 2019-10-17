<template>
  <div class="carousel" @mouseover="stop" @mouseleave="play">
    <div v-for="(item, index) in carouselList" :key="index" :class="['carousel-item', index === currentIndex ? 'active' : '']">
      <a :href="item.link"><img :src="item.image"></a>
    </div>
    <div class="carousel-icon">
      <a v-for="(item, index) in carouselList" :key="index" :class="['carousel-icon-item', index === currentIndex ? 'active' : '']" @click="change(index)"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCarousel',
  props: {
    carouselList: Array
  },
  data: function () {
    return {
      timer: null,
      currentIndex: 0
    }
  },
  methods: {
    change: function (index) {
      this.currentIndex = index
    },
    stop: function () {
      clearInterval(this.timer)
    },
    play: function () {
      const self = this

      this.timer = setInterval(() => {
        if (self.currentIndex < self.carouselList.length - 1) {
          self.currentIndex++
        } else {
          self.currentIndex = 0
        }
      }, 2500)
    }
  },
  // 组件被创建时就启动定时器
  created: function () {
    this.play()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .carousel {
    position: relative;
    border-radius: 10px;
    height: 500px;
    overflow: hidden; //有的图片高度不一致会超出高度
    margin-top: 20px;
  }

  .carousel-item {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transition: all 0.8s;
    img {
      position: relative;
      top: -28px; //有的图片高度不一致会导致问题
      width: 100%;
    }
  }
  .carousel-item.active {
    opacity: 1;
  }

  .carousel-icon {
    text-align: center;
    position: absolute;
    bottom: 20px;
    height: 50px;
    width: 100%;
    a {
      display: inline-block;
      width: 28px;
      height: 28px;
      background-image: url("../assets/images/point.png");
      background-size: contain;
      cursor: pointer;
    }
    a.active {
      background-image: url("../assets/images/point-selected.png");
    }
  }
</style>
