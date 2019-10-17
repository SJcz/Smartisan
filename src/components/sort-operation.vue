<template>
  <div class="sort-operation">
    <ul>
      <li @click="refreshSort('sort')" :class="[sort == 'sort' ? 'active' : '', 'first']">综合排序</li>
      <li @click="refreshSort('sales')" :class="[sort == 'sales' ? 'active' : '']">销量排序</li>
      <li @click="refreshSort('price_low')" :class="[sort == 'price_low' ? 'active' : '']">价格低到高</li>
      <li @click="refreshSort('price_high')"  :class="[sort == 'price_high' ? 'active' : '']">价格高到低</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SortOperation',
  data: function () {
    return {
      sort: 'sort'
    }
  },
  methods: {
    refreshSort: function (ope) {
      this.sort = ope
      this.$emit('sort', ope)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .sort-operation {
    ul {
      list-style: none;
      margin-bottom: 20px;
      li {
        position: relative;
        margin-left: 40px;
        font-size: 12px;
        cursor: pointer;
        display: inline-block;
        color: #999;
        &.active {
          color: #5683ea;
        }
        &::after {
          content: '';
          width: 2px;
          height: 2px;
          background: #c7c7c7;
          position: absolute;
          top: 50%;
          right: -20px;
        }
        &.first {
          margin-left: 0;
        }
      }
    }
  }
</style>
