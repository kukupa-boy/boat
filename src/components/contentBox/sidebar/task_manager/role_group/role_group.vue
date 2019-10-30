<template>
  <div id="role_grop">
    <div class="roleGroup_header">
      <div>
        <el-form :label-width="90" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="岗位：">
            <el-select v-model="pullDownBox[0]" >
              <el-option v-for="(item,i) in pullDownBox" label="电器运行专责" :value="i" :key="i">{{item}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工号：">
            <!--单v-model中为空的时候，默认就会显示placeholder中的数据-->
            <el-input v-model="work_number" placeholder="GH"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="name" placeholder="小"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small"  @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
       <div style="border:1px solid red">
            <el-button type="primary" size="small"  @click="onSubmit">新增</el-button>
            <el-button type="primary" size="small"  @click="onSubmit">编辑</el-button>
       </div>
    </div>
    <div class="roleGroup_content">
    </div>
    <div class="roleGroup_footer">

    </div>
    </div>
</template>

<script>
  export default {
    name: 'boat_list',
    data() {
      return {
        //这个是下拉选择框的数据的存放
        pullDownBox:["电器运行专责","岗位一","岗位二","岗位三","岗位四"],
      //  工号的绑定
        work_number:"",
        name:""
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>

  #role_grop{
    width: 1420px;
    height: 832px;
    position: fixed;
    top: 92px;
    left: 380px;
    margin: 10px 40px 30px 40px;
    background-color: rgb(231,231,231);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: space-around;
  }
  .roleGroup_header{
    height: 50px;
    border: 1px solid red;
    width: 1340px;
    margin: 0 auto;
    /*display: flex;*/
    /*justify-content: space-around;*/
  }
  .roleGroup_content{
    width: 1340px;
    height: 675px;
    border: 1px solid yellow;
    margin: 10px auto;
  }
  .roleGroup_footer{
    height: 40px;
    width: 1340px;
    margin:0 auto;
    border: 1px solid blue;
  }
  .roleGroup_header .el-form-item{
    vertical-align: middle;
    padding-top: 5px;
  }
  .roleGroup_header>>>.el-form-item{
    /*margin-left: 35px;*/
  }
  .roleGroup_header>>>.el-input__inner{
    width:190px;
    border-radius: 15px;
  }
  .roleGroup_header>>>.el-form-item__label{
    font-size: 16px;
  }
  .roleGroup_header >>> .el-button{
    /*width:60px;*/
    border-radius:10px ;
    /*text-align: center;*/
    background-color: rgb(68,19,224);
  }
  .roleGroup_header >>> .el-button:nth-of-type(2){
    margin-left: 200px;
  }
  </style>
