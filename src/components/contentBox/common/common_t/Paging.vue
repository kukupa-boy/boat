<template>
   <!--这是分页-->
<div class="box">
  <!--<ul>-->
    <!--<li v-for="count in totalPage">{{count}}</li>-->
  <!--</ul>-->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
  </div>
</div>
</template>

<script>
    export default {
        name: "Paging",
        props: {
          list: Array,
          // default: list
        },
      data(){
          return{
            currentPage:1,//当前页
            pageSize:'',//每页显示的数量
            totalPage:'',//总共的条数
        }
      },
      created(){
        this.currentPage = 1; //当前页
        this.pageSize = 9; //每页显示的数量
        this.totalPage = this.list.length; //总共的条数
      },
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(val);
          // this.$emit('childFn', val);
          let start = (val-1)* this.pageSize; //当前页从第几条开始
          let end = start+this.pageSize; //当前页在哪条数据结束
          let arr =  [];
          let len =this.list.length;
          for(let i=start;i<end&&i<len;i++){
            arr.push(this.list[i]);
          }
          this.$emit('childFn', arr);
        }
      }
    }
</script>

<style scoped>
  .box{
    width: 100%;
    height: 40px;
    /*position: relative;*/
  }
  ul{
    height: 40px;
    line-height: 40px;
  }
  ul li{
    width: 40px;
    height: 40px;
    margin-right: 20px;
    border-radius: 20px;
  }
</style>
<style>
  .block ul {
    height: 40px;
    line-height: 40px;
  }
  .block ul li{
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 40px!important;
  }
  .block button {
    width: 40px;
    height: 40px;
  }
  .block span{
    width: 40px;
    height: 40px!important;
    line-height: 40px!important;
  }
</style>
