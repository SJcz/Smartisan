<template>
      <div class="post-item">
        <div class="basic">
          <img :src="post.image">
          <h4>{{post.title}}</h4>
          <h6>{{post.subtitle}}</h6>
          <span>阅读全文 ></span>
        </div>
      </div>
</template>

<script>
export default {
  name: 'ForumItem',
  props: {
    post: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .post-item {
      text-align: left;
      cursor: pointer;
      display: inline-block;
      flex: 0 0 304px;
      border-right: 1px solid #efefef;
      border-bottom: 1px solid #efefef;
      transition: all 0.3s;
      // height: 350px;
      position: relative;
      &:hover{
        box-shadow: inset 0 0 38px rgba(0,0,0,.08);
      }
      .basic {
        margin: 10px 30px;
        img {
          display: block;
          width: 246px;
          border-radius: 4px;
          height: 138px;
        }
        h4 {
          line-height: 1.2;
          font-size: 15px;
          margin: 30px 0 12px;
          color: #333;
          font-weight: 700;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        h6 {
          overflow: hidden;
          font-size: 12px;
          line-height: 1.2;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #999;
          font-weight: 400;
          line-height: 18px;
          width: 246px;
        }
        span {
          color: #5079d9;
          font-size: 12px;
          margin-top: 12px;
          display: block;
        }
      }
    }
</style>
