<template>
  <div class="forum">
    <div class="header">
      <span>论坛精选</span>
      <div class="right-tab">前往论坛 ></div>
    </div>
    <div class="content" ref="content">
      <ForumItem v-for="(post, index) in postList" :key="index" :post="post">
       </ForumItem>
    </div>
  </div>
</template>

<script>
import ForumItem from '../components/forum-item'
export default {
  name: 'HomeForum',
  props: {
    postList: Array
  },
  components: {
    ForumItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .forum {
    margin: 25px 0 0 0 ;
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
    flex-flow: row nowrap; // 需要换行
  }
</style>
