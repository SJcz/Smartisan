<template>
  <div class="footer" ref="footer">
    <div class="service">
      <div class="service-list">
        <ul>
          <li>
            <span class="title">订单服务</span>
            <span class="sub-title"><a>购买指南</a></span>
            <span class="sub-title"><a>送货政策</a></span>
          </li>
          <li>
            <span class="title">服务支持</span>
            <span class="sub-title"><a>自助服务</a></span>
            <span class="sub-title"><a>使用帮助</a></span>
            <span class="sub-title"><a>维修门店</a></span>
          </li>
          <li>
            <span class="title">媒体中心</span>
            <span class="sub-title"><a>新闻动态</a></span>
            <span class="sub-title"><a>官方视频</a></span>
            <span class="sub-title"><a>图片资源</a></span>
          </li>
          <li>
            <span class="title">关注我们</span>
            <span class="sub-title"><a>新浪微博</a></span>
            <span class="sub-title"><a>官方微博</a></span>
            <span class="sub-title"><a>荣誉奖项</a></span>
          </li>
        </ul>
      </div>
      <div class="concat">
        <div class="phone">400 - 626 - 5666</div>
        <div class="time">周一到周日 9:00 - 18:00<br>
        (仅收市话费)</div>
        <div class="online">在线咨询</div>
      </div>
    </div>
    <div class="copy">
      <div class="privacy">
        <span class="copy-right">Copyright © 2019 smartisan.com 版权所有</span>
        <div class="declare">
          <span><a href="https://www.smartisan.com/support/#/other-service/agreement">法律声明</a></span>
          <span><a href="https://www.smartisan.com/support/#/other-service/privacy">Smartisan 隐私条款</a></span>
          <span><a href="https://resource.smartisan.com/docs/smartisan_policy_cn.html">锤子商城隐私政策</a></span>
          <span><a href="https://resource.smartisan.com/docs/smartisan_agreement_cn.html">锤子商城用户协议</a></span>
        </div>
      </div>
      <div class="icp"><span><a href="http://beian.miit.gov.cn">京 ICP 备 18020659 号 - 2</a></span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter'
}
</script>

<style scoped lang="less">
  a {
    text-decoration: none;
  }
  .footer {
    width: 1220px;
    margin: 0 auto;
    .service {
      position: relative;
      border-bottom: 1px solid #e6e6e6;
      .service-list {
        display: inline-block;
      }
      ul {
        list-style: none;
        display: flex;
        li {
          display: inline-block;
          margin: 20px 20px 20px 0;
          .title {
            color: #646464;
            font-weight: 700;
            font-size: 12px;
            padding: 0 0 20px;
            display: block;
          }
          .sub-title {
            color: #969696;
            cursor: pointer;
            display: block;
            font-size: 12px;
            padding: 7px 0;
            &:hover {
              color: #5079d9;
            }
            a {
              display: inline-block;
            }
          }
        }
      }
    }
    .concat {
      float: right;
      margin: 20px 0;
      text-align: right;
      .phone {
        font-size: 18px;
        font-weight: 900;
        line-height: 1;
        color: #5079d9;
      }
      .time {
        margin-top: 15px;
        font-size: 12px;
        color: #999;
      }
      .online {
        color: #5079d9;
        border: 1px solid #d0d0d0;
        border-radius: 5px;
        background: linear-gradient(#fcfcfc,#f5f5f5);
        cursor: pointer;
        text-align: center;
        font-weight: 700;
        margin-top: 15px;
        line-height: 30px;
        font-size: 12px;
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  .copy {
    color: #434d55;
    font-size: 12px;
    padding: 30px 0 60px;
    color: #bdbdbd;
    .copy-right {
      padding: 0 10px 0 0;
    }
    .declare {
      display: inline-block;
      span {
        padding: 0 10px;
        border-left: 1px solid #ababab;
      }
      a {
        color: #ababab;
        &:hover {
          color: #5079d9;
        }
      }
    }
    .icp {
      a {
        color: #bdbdbd;
      }
      font-size: 12px;
      display: inline-block;
      height: 12px;
      line-height: 1;
      margin-top: 10px;
    }
  }
}

</style>


