<template>
  <div class="shipmanager">
    <div class="mapNav">
      <!-- 地图上的一级菜单 -->
      <div class="parentNav">
        <div :class="{'mapTool':true,'ishide':toolShow==false}" @mousedown="toolchecked($event)">
          <!-- <div index="1" :class="{toolchecked:toolcheckIndex=='1'}">
            <i class="fa fa-pencil-square-o"></i>标绘
          </div>
          <div index="2" :class="{toolchecked:toolcheckIndex=='2'}">
            <i class="fa fa-thermometer-quarter"></i>测量
          </div> -->
          <div index="3" :class="{'last-tool':true,toolchecked:toolcheckIndex=='3'}">
            <i class="fa fa-cog"></i>工具
          </div>
        </div>
        <!-- 控制一级菜单的显示与隐藏 -->
        <div class="toolBtn">
          <p :class="{'switchTool':true,'t-hide':toolShow==false}"
            @click="switchTool" >
            <i class="fa fa-angle-double-up"></i>
          </p>
        </div>
      </div>

      <!-- 地图上的二级菜单 -->
      <div class="childNav" v-show="toolcheckIndex!=0">
        <div v-show="toolcheckIndex=='1'">1</div>
        <div v-show="toolcheckIndex=='2'">2</div>
        <div v-show="toolcheckIndex=='3'" class="child3">

          <div class="btn-box">
            <span class="fa fa-cog">测距</span>
            <div class="btn-open" @click.stop="openMapTool($event,'openMeasure')">
              <switchgear def="open"></switchgear>
            </div>
          </div>
          <div class="btn-box">
            <span class="fa fa-cog">绘制</span>
            <div class="btn-open" @click.stop="openMapTool($event,'openArea')">
            <switchgear def="close"></switchgear>
            </div>
          </div>
          <div class="btn-box">
            <span class="fa fa-cog">航线</span>
            <div class="btn-open" @click.stop="openMapTool($event,'openRoute')">
            <switchgear def="close"></switchgear>
            </div>
          </div>
          <div class="btn-box">
            <span class="fa fa-cog">气象</span>
            <div class="btn-open" @click.stop="openMapTool($event,'openWeather')">
            <switchgear def="close"></switchgear>
            </div>
          </div>
          <div class="btn-box">
            <span class="fa fa-cog">辅助</span>
            <div class="btn-open" @click.stop="openMapTool($event,'openTool')">
            <switchgear def="close"></switchgear>
            </div>
          </div>
          <div class="btn-box">
            <span class="fa fa-cog">回放</span>
            <div class="btn-open" @click.stop="openMapTool($event,'openplayback')">
            <switchgear def="close"></switchgear>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 地图组件 -->
    <seaMap :mapdata="mapData" :eye="eyeMapData"></seaMap>
    
  </div>
</template>



<script>
import seaMap from "./seaChart";
import switchgear from "../../../common/common_l/switch";
// import switchgear from "../../common/common_l/switch"; shipManagerment

export default {
  name: "shipManagerMent",
  data() {
    return {
      toolShow: false,
      toolcheckIndex: 0,
      mapData: {
        openMeasure:true
      }, //控制地图组件的参数对象
      eyeMapData: false //由于对象传入子组件后无法被监听变化，加此属性用于辅助更新对象变化
    };
  },
  methods: {
    openMapTool(e,val) {
      this.mapData[val] = !this.mapData[val];
      this.eyeMapData = !this.eyeMapData;
    },
    switchTool() {
      this.toolShow = !this.toolShow;
      this.toolcheckIndex = 0;
    },
    toolchecked(e) {
      let ele = e.target;
      let index = ele.getAttribute("index");
      if (this.toolcheckIndex == index) this.toolcheckIndex=0;
      else this.toolcheckIndex = index;
    }
  },
  destroyed(){
    console.log("shipmanager页面被销毁")
  },
  activated(){
  	console.log("keep-alive开始");
  },
  deactivated(){
  	console.log("keep-alive结束");
  },
  components: {
    seaMap: seaMap,
    switchgear: switchgear
  }
};
</script>

<style scoped lang="less">
@toolHeight: 30px;
.shipmanager {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.mapNav {
  position: absolute;
  z-index: 999;
  right: 60px;
  top: 10px;
  text-align: right;
  > .parentNav {
    .mapTool {
      background-color: rgba(255, 255, 255, 0.8);
      padding: 0 6px;
      border-radius: 10px;
      transition: 0.3s;
      margin-top: 5px;
      display: inline-block;
      vertical-align: middle;
      > div {
        user-select: none;
        cursor: pointer;
        display: inline-block;
        color: rgb(114, 114, 114);
        height: 20px;
        border-right: 2px solid rgb(155, 155, 155);
        margin: 5px 0;
        padding: 0 20px;
        font-size: 30px;
        line-height: 20px;
        text-align: center;
        font-size: 16px;
        vertical-align: middle;
        &:hover {
          color: rgb(0, 0, 0);
        }
        > i {
          margin-right: 5px;
        }
      }
      .last-tool {
        border: none;
      }
      .toolchecked {
        color: rgb(75, 131, 253) !important;

      }
      &:hover{
        background-color: #fff;
      }
    }
    .ishide {
      margin-top: -100px;
    }
  }
  > .childNav {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    top: 20px;
    user-select: none;
    line-height: 12px;
    border-radius: 10px;
    z-index: 999;
    background-color: rgb(255, 255, 255);
    > div {//子菜单
      padding: 6px;
    }
    >.child3{
        >.btn-box{//按钮盒子
          display: block;
          margin: 4px;
          >span{
            font-size: 16px;
            padding-left: 6px;
            display: inline-block;
            text-align: center;
            // width: 80px;
            line-height: 20px;
            vertical-align: middle;
            color: rgb(136, 136, 136);
            &::before{
              display: inline-block;
              margin-right: 6px;
            }
          }
          >div{
            display: inline-block;
            vertical-align: middle;
            overflow: hidden;
          }
      }
    }
  }
}

// 显示或隐藏工具栏的开关样式
.toolBtn {
  position: absolute;
  display: inline-block;
  margin-left: 10px;
  >.switchTool {
    position: absolute;
    width: 40px;
    height: 40px;
    font-size: 30px;
    transition: 0.6s;
    opacity: 1;
    visibility: visible;
    border-radius: 50%;
    line-height: 36px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.3);
    color: rgb(145, 179, 252);
    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
  >.t-hide {
    transform: rotateZ(180deg);
  }
}

</style>
