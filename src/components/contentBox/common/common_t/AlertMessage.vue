<template>
    <!--这是报警信息-->
    <div class="alarmMessage">
      <div class="alarmMessageHeader">
        <el-input placeholder="请输入警报船队" suffix-icon="el-icon-search" class="alarmMessageHeaderInput" v-model="input" clearable>
        </el-input>
        <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
        <el-button type="primary" class="sortable" @click="sortable">倒序</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <!--sortable 加到每行里面实现倒序-->
          <el-table-column prop="number" label="序号"   width="180" header-align="center" align="center"></el-table-column>
          <el-table-column prop="vesselNumber" label="船只编号" width="180" header-align="center" align="center"></el-table-column>
          <el-table-column prop="peopleNumber" label="人数" width="180" header-align="center" align="center"></el-table-column>
          <el-table-column prop="date" label="时间" width="180" header-align="center" align="center"></el-table-column>
          <el-table-column prop="event" label="事件" width="180" header-align="center" align="center"></el-table-column>
          <el-table-column prop="place" label="定位" width="180" header-align="center" align="center"></el-table-column>
          <el-table-column prop="Remarks" label="备注" width="180" header-align="center" align="center"></el-table-column>
          <el-table-column prop="name" label="操作" width="180" header-align="center" align="center">
            <template scope="scope">
              <el-button type="success" @click="dialogVisible = true;See(scope.$index, scope.row)" icon="el-icon-check" circle></el-button>
              <el-dialog title="求救详情"
                         center
                         :visible.sync="dialogVisible"
                         width="30%"
                         :modal-append-to-body='false'>
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="编号">
                    <el-input v-model="form.num"></el-input>
                  </el-form-item>
                  <el-form-item label="人数">
                    <el-input v-model="form.peopleNum"></el-input>
                  </el-form-item>
                  <el-form-item label="时间">
                    <el-input v-model="form.time"></el-input>
                  </el-form-item>
                  <el-form-item label="事件">
                    <el-input v-model="form.incident"></el-input>
                  </el-form-item>
                  <el-form-item label="定位">
                    <el-input v-model="form.site"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="form.remarks"></el-input>
                  </el-form-item>
                  <el-form-item label="救援内容">
                    <el-input v-model="form.rescueContents"></el-input>
                  </el-form-item>
                  <el-form-item label="救援工具">
                    <el-input v-model="form.rescueTools"></el-input>
                  </el-form-item>
                  <el-form-item label="救援方式">
                    <el-input v-model="form.rescueMethod"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible = false">取 消</el-button>
                   <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--这是分页-->
      <div class="page">
      <Paging :list="tableList" @childFn="parentFn"></Paging>
      </div>
    </div>
</template>

<script>
  import Paging from "./Paging.vue"
    export default {
      name: "AlertMessage",
      components: {
        Paging
      },
      data() {
        return {
          dialogVisible: false,//弹框默认隐藏
          currentPage:'',//当前的页数
          abc: '',//不知道有啥内容的变量名
          input: '',//搜索框
          len:'',//数据的长度
          tableList: [],
          tableData: [{
            number: '1',
            vesselNumber: 'CN-1',
            peopleNumber: '50',
            date: '2016-05-01',
            event: '船只故障',
            place: '123',
            Remarks: '伤势严重',
          },
            {
              number: '2',
              vesselNumber: 'CN-2',
              peopleNumber: '50',
              date: '2016-05-02',
              event: '船只故障',
              place: '123',
              Remarks: '损失严重',
            },
            {
              number: '3',
              vesselNumber: 'CN-3',
              peopleNumber: '50',
              date: '2016-05-03',
              event: '船只故障',
              place: '123',
              Remarks: '严重',
            },
            {
              number: '4',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '5',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '6',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '7',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '8',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '9',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '10',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '11',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '12',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
            {
              number: '13',
              vesselNumber: 'CN-4',
              peopleNumber: '50',
              date: '2016-05-04',
              event: '船只故障',
              place: '123',
              Remarks: '无备注',
            },
          ],
          form: {
            num: 'CN-1',//船只编号
            peopleNum: '20',//人数
            time: '2019-11-1 5:00',//时间
            incident: '落水',//事件
            site: '珠海',//定位
            remarks: '无备注',//备注
            rescueContents: '就近搜救',//救援内容
            rescueTools: '游艇',//救援工具
            rescueMethod:'救援人员下水救人'//救援方式
          }
        }
      },
      methods: {
        //弹框显示关闭
        // handleClose(done) {
        //   this.$confirm('确认关闭？')
        //     .then(_ => {
        //       done();
        //     })
        //     .catch(_ => {
        //     });
        // },
        //弹框内容显示
        parentFn(payload) {
          // this.currentPage = payload;
          console.log(payload);
          this.tableData = payload
        },
        See(index, row) {
          console.log(index, row);
          let arr = this.tableData;
          this.abc = arr[index].number;
          console.log(this.abc);
        },
        //倒序table
        sortable() {
          let arr = [];
          let len = this.tableData.length;
          for (let i = 0; i < len; i++) {
            let a = len - 1 - i;
            arr.push(this.tableData[a]);
          }
          this.tableData = arr;
        },
      },
      created() {
        this.tableList = this.tableData;
        let arr=[];
        if(this.tableData.length>9){
          for(let i=0;i<9;i++){
            arr.push(this.tableData[i]);
          }
          this.tableData =arr;
        }
      },
      watch: {
        //全局匹配
        input(val) {
          let a = this.input;
          // console.log(a);
          let arr = this.tableList;
          let arr2=[];
          for (let i = 0, l = arr.length; i < l; i++) {
            for (let key in arr[i]) {
              if(arr[i][key].includes(a)){
                arr2.push(arr[i]);
                break;
              }
            }
          }
          if(a == ''){
            this.tableData = arr;
          }else {
            this.tableData = arr2;
          }
        }
      }
    }
</script>

<style scoped>
.alarmMessage{
  height: 768px;
  padding: 20px;
  position: relative;
  /*border: 1px solid red;*/
  background-color: rgb(239,239,239);
}
.alarmMessageHeader{
  height: 50px;
  width: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0);
}
.alarmMessageHeaderInput{
  width: 20%;
  height: 40px;
  line-height: 40px;
  /*border: 1px solid red;*/
}
  .sortable{
    height: 40px;
    /*border: 1px solid red;*/
    /*margin-right: 10px;*/
    position: absolute;
    right: 10px;
    top: 0;
  }
  .table{
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 50px;*/
  }
  .page{
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
    width: auto;
    text-align: center;
  }
</style>
