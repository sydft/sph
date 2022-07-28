<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <!-- 当连续页的起始页码不为1时，初始的1显示 -->
    <button v-if="startPageAndEndPage.start !== 1" @click="$emit('getPageNo',1)">1</button>
    <!-- 当连续页的起始页码大于2时，省略号显示 -->
    <button v-if="startPageAndEndPage.start > 2">···</button>

    <template v-for="page in startPageAndEndPage.end">
      <!-- 显示连续页码 -->
      <button :class="{active:pageNo === page}" :key="page" v-if="page >= startPageAndEndPage.start" @click="$emit('getPageNo',page)">{{page}}</button>
    </template>

    <!-- 当连续页的结束页码小于总页码-1时，省略号显示 -->
    <button v-if="startPageAndEndPage.end < totalPages - 1">···</button>
    <!-- 当连续页的结束页码不为最后一页时，初始的最后一页页码显示 -->
    <button v-if="startPageAndEndPage.end !== totalPages" @click="$emit('getPageNo',totalPages)">{{totalPages}}</button>
    <button :disabled="pageNo === totalPages" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: 'Paging',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    },
    startPageAndEndPage() {
      let start = 0
      let end = 0
      // 当总页数少于需要连续的页数时
      if (this.continues > this.totalPages) {
        start = 1
        end = this.totalPages
      } else {
        // 当总页数大于需要连续的页数时
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        // 当连续页的起始页码小于1时
        if (start < 1) {
          start = 1
          end = this.continues
        }
        // 当连续页的结束页码大于总页码时
        if (end > this.totalPages) {
          end = this.totalPages
          start = this.totalPages - this.continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
