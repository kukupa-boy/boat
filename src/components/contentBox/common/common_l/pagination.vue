<!-- 
参数
pagesize：数据总数量
perpage：单页数量

换页回调函数 currentPageChange
页面数量改变 perpageSizeChange
 -->

<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :background="true"
      :page-size="perpage"
      layout="prev, pager, next, jumper"
      :total="pagesize"
    ></el-pagination>
  </div>
</template>


<script>
export default {
  name: "pagination",
  data() {
    return {
        currentPage:0
    };
  },
  methods:{
    handleSizeChange(val) {
      this.$emit("perpageSizeChange",val);
    },
    handleCurrentChange(val) {
      this.$emit("currentPageChange",val);
    },
  },
  props: {
    perpage: { default: 10 },
    pagesize: { default: 0 }
  }
};
</script>


<style lang='less' scoped>
</style>
<style lang="less">

.pagination{
  display: inline-block;
    .el-pagination{
        .el-pager{
            li{
                border-radius: 50%;
            }
        }
        .btn-next,.btn-prev{
            background-color: #0000;
        }
        span{
            position: relative;
            div{
                top: -4px;
                width: 32px;
                height: 32px;
                // line-height: 32px;
                border-radius: 50%;
                margin: 0 8px;
                border: 2px solid rgb(95, 124, 226);
                vertical-align: middle;
                input{
                    border: none;
                    background: #fff0;
                }
            }
        }
    }
}

</style>