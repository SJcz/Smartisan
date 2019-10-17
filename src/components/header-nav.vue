<template>
  <div class="nav">
    <div class="nav-logo">
      <a></a>
    </div>
    <div class="nav-aside">
      <a href="" class="user"></a>
      <a href="" class="cart"></a>
    </div>
    <div class="nav-list">
      <ul>
        <li><a href="" :class="{'active': selectedIndex == 0 ? true : false}">在线商城</a></li>
        <li><a href="">坚果Pro 2S</a></li>
        <li><a href="">坚果R1</a></li>
        <li><a href="">坚果TNT工作站</a></li>
        <li><a href="">Smartisan OS</a></li>
        <li><a href="">欢喜云</a></li>
        <li><a href="">应用</a></li>
        <li><a href="">论坛</a></li>
        <li><a href="">荣誉和奖项</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: {
    selectedIndex: Number
  }
}
</script>

<style scoped lang="less">
  //设置导航栏logo的位置, 根据高度计算得到大概的中间位置
  .nav {
    background-color: black;
    height: 45px;
    .nav-logo {
      padding-top: 13px;
      margin-left: 21px;
      float: left;
      a {
        background-image: url("//static.smartisanos.cn/index/assets/images/logo.557a1159a7b50cad819b869ebbe5051a.png");
        height: 18px;
        width: 18px;
        display: block;
        background-size: contain;
      }
    }
  }
  .nav-list {
    text-align: center;
    padding-top: 9px;
    font-size: 12px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      display: inline-block;
      line-height: 28px;
      margin: 0 15px;

      a.active {
        color: #fff;
        font-weight: 700;
      }
    }
  }
  .nav-aside{
    float: right;
    padding-top: 15px;
    margin-right: 21px;
    a.user {
      background-image: url("../assets/images/my.png");
      height: 14px;
      width: 14px;
      display: inline-block;
      background-size: contain;
      margin: 0 20px;
      &:hover {
        background-image: url("../assets/images/my-hover.png");
      }
    }
    a.cart {
      background-image: url("../assets/images/cart.png");
      height: 14px;
      width: 14px;
      display: inline-block;
      background-size: contain;
      &:hover {
        background-image: url("../assets/images/cart-hover.png");
      }
    }
  }
  a {
    color: hsla(0,0%,100%,.7);
    text-decoration: none;
    transition: all 0.4s;
    &:hover{
      color: #fff;
    }
  }

</style>