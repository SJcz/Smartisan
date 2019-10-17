<template>
     <div class="product-intro">
    <div class="header">
      <span>产品信息</span>
    </div>
    <div class="content" ref="content">
      <img :src="imageUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductIntro',
  props: {
    imageUrl: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .product-intro {
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
  }
  .content {
    text-align: center;
    img {
      width: 80%;
    }
  }
</style>
