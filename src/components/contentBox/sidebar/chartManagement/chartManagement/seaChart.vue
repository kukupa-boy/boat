<!--  -->
<template>
  <div class="mapBox">
    <div id="map" class="my-map">
      <!-- 用于测试 -->
      <div class="ls">
        <!-- 区域船查询 -->
        <button @click.stop="test1" style="opacity:0.3">测试</button>
      </div>
      <!-- 功能按钮盒子 -->
      <div class="div_btn">
        <!-- 测距控件 -->
        <div class="map-measure" v-show="innerMapdata.openMeasure">
          <p :class="{'ceju_add':true,'checked':mapdetail.mapM.measure}" @click.stop="measureAdd">
            <span class="fa fa-arrows" aria-hidden="true" title="测距"></span>
          </p>
          <p class="ceju_remove" id="btn_ceju_remove" @click.stop="measureRemove">
            <span class="fa fa-trash-o" aria-hidden="true" title="移除"></span>
          </p>
          <p class="ceju_unit" id="btn_ceju_unit" @click.stop="measureUnit">
            <span title="切换单位">{{mapdetail.mapM.units[mapdetail.mapM.current_unit]}}</span>
          </p>
        </div>
        <br/>

        <div class="map-route" v-show="innerMapdata.openRoute">
          <p id="btn_draw_track">绘制</p>
          <p id="btn_draw_track_edit">编辑</p>
          <p id="btn_draw_track_finish">完成</p>
          <p id="btn_draw_track_delete">删除</p>
          <p id="btn_draw_track_view">显示</p>
        </div>
        <br/>
        <!-- 绘制区域按钮 -->
        <div class="map-draw" v-show="innerMapdata.openArea">
          <div :class="{'map-area':true,'open':mapDraw.area}">
            <div class="map-info map-area-info">
              <i
                :class="{'fa':true,'fa-angle-double-right':true,'i-open':mapDraw.area}"
                @click="mapDraw.area=!mapDraw.area"
              ></i>
              <!-- <i :class="{'fa':true,'fa-object-ungroup':true,'i-open':mapDraw.area}" @click="mapDraw.area=!mapDraw.area"></i> -->
              <span>绘制面</span>
            </div>
            <div class="map-btn map-area-btn">
              <p id="btn_add" @click="mapDraw.area=true">
                <i class="fa fa-plus"></i>
              </p>
              <p id="btn_end" class="drawSuc">
                <i class="fa fa-check"></i>
              </p>
              <p id="btn_del" class="drawDel">
                <i class="fa fa-trash-o"></i>
              </p>
            </div>
          </div>
          <!-- 
          <div :class="{'map-line':true,'open':mapDraw.line}">
            <div class="map-info map-line-info">
              <i
                :class="{'fa':true,'fa-angle-double-right':true,'i-open':mapDraw.line}"
                @click="mapDraw.line=!mapDraw.line"
              ></i>
              <span>绘制线</span>
            </div>
            <div class="map-btn map-line-btn">
              <p id="btn_add_line" @click="mapDraw.line=true">
                <i class="fa fa-plus"></i>
              </p>
              <p id="btn_end_line" class="drawSuc">
                <i class="fa fa-check"></i>
              </p>
              <p id="btn_del_line" class="drawDel">
                <i class="fa fa-trash-o"></i>
              </p>
            </div>
          </div>

          <div :class="{'map-point':true,'open':mapDraw.point}">
            <div class="map-info map-point-info">
              <i
                :class="{'fa':true,'fa-angle-double-right':true,'i-open':mapDraw.point}"
                @click="mapDraw.point=!mapDraw.point"
              ></i>
              <span>绘制点</span>
            </div>
            <div class="map-btn map-point-btn">
              <p id="btn_add_point" @click="mapDraw.point=true">
                <i class="fa fa-plus"></i>
              </p>
              <p id="btn_end_point" class="drawSuc">
                <i class="fa fa-check"></i>
              </p>
              <p id="btn_del_point" class="drawDel">
                <i class="fa fa-trash-o"></i>
              </p>
            </div>
          </div> -->


        </div>
        <br />

        <!-- 区域回放-->
        <div class="map-areaplay" v-show="innerMapdata.openplayback">
            <el-date-picker v-model="areaReplayTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="终止日期" size="mini"> </el-date-picker>
            <p id="btn_areaplay" isClick="0">区域回放</p>
        </div>
        <br />

        <!-- 气象 -->
        <div class="map-weather" v-show="innerMapdata.openWeather">
          <p
            id="btn_qiwen"
            class="btn_weather qiwen partical"
            thetype="qiwen"
            title="气温"
            @click.stop="cutStyle($event)"
            isClick="0"
          >气温</p>
          <p
            id="btn_qiya"
            class="btn_weather qiya partical"
            thetype="qiya"
            title="气压"
            @click.stop="cutStyle($event)"
            isClick="0"
          >气压</p>
          <p
            id="btn_haifeng"
            class="btn_weather haifeng partical"
            thetype="haifeng"
            title="海风"
            @click.stop="cutStyle($event)"
            isClick="0"
          >海风</p>
          <p
            id="btn_fengchang"
            class="btn_weather fengchang partical"
            thetype="fengchang"
            title="风场"
            @click.stop="cutStyle($event)"
            isClick="0"
          >风场</p>
          <p
            id="btn_taifeng"
            class="btn_weather taifeng"
            title="台风"
            @click.stop="cutStyle($event)"
            isClick="0"
          >台风</p>
          <!-- <p
            id="btn_hailang"
            class="btn_weather hailang"
            title="海浪"
            @click.stop="cutStyle($event)"
            isClick="0"
          >海浪</p> -->
          <p
            id="btn_chaoxi"
            class="btn_weather chaoxi"
            title="潮汐"
            @click.stop="cutStyle($event)"
            isClick="0"
          >潮汐</p>
          <p
            id="btn_haiquyubao"
            class="btn_weather yubao"
            title="预报"
            @click.stop="cutStyle($event)"
            isClick="0"
          >预报</p>
        </div>
        <br />

        <!-- 辅助工具 -->
        <div class="map-tool" v-show="innerMapdata.openTool">
          <!-- <p id="btn_haiqu" @click.stop="cutStyle($event)" isClick="0">海区</p>
          <p id="btn_jingji" @click.stop="cutStyle($event)" isClick="0">经济</p> -->
          <p id="btn_port" @click.stop="cutStyle($event)" isClick="0">港口</p>
          <!-- <p id="btn_guangshan" @click.stop="cutStyle($event)" isClick="0">光栅</p>
          <p id="btn_areatime" @click.stop="cutStyle($event)" isClick="0">时区</p>
          <p id="btn_paifang" @click.stop="cutStyle($event)" isClick="0">排放</p>
          <p id="btn_paifang_china" @click.stop="cutStyle($event)" isClick="0">排放(中国)</p> -->
          <p id="btn_latlnggrid" @click.stop="cutStyle($event)" isClick="0">网格</p>
        </div>
        <br />



        <!-- 注释本行后，开关失效，原因未知 -->
        <p style="display:none">{{eye}}</p>
      </div>

      <div class="changeMap">
        <div
          :class="{'nowShow':nowShowMapType==3}"
          mytype="weixing"
          @click.stop="changeMapType('weixing')"
        >
          <span>卫星</span>
          <img src="../../../../../assets/ship_system/image/image_l/map_wx.png" />
        </div>
        <div
          :class="{'nowShow':nowShowMapType==2}"
          mytype="ditu"
          @click.stop="changeMapType('ditu')"
        >
          <span>地图</span>
          <img src="../../../../../assets/ship_system/image/image_l/map_dt.png" />
        </div>
        <div
          :class="{'nowShow':nowShowMapType==1}"
          mytype="haitu"
          @click.stop="changeMapType('haitu')"
        >
          <span>海图</span>
          <img src="../../../../../assets/ship_system/image/image_l/map_ht.png" />
        </div>
      </div>

      <!-- 粒子效果 -->
      <div class="animationCan">
        <canvas id="myCanvas"></canvas>
        <div id="heatmap"></div>
      </div>
    </div>

    <!-- <div id="my_seach_ship_box" class="my_seach_ship_box"></div> -->

    <!-- 监视信息面板 -->
    <div class="watchPanel">
      <div class="wp-numPanel">
        <div class="wp-danger">
          <p>
            <span class="wp-update">[{{dangerUpdate}}]</span>
            <span class="wp-shipNum">一级危险区：{{dangerShipNum}} （艘） </span>
          </p>
        </div>

        <div class="wp-warning">
          <p>
            <span class="wp-update">[{{warningUpdate}}]</span>
            <span class="wp-shipNum">二级预警区：{{warningShipNum-dangerShipNum}} （艘）</span>
          </p>
        </div>

        <div class="wp-oversee">
          <p>
            <span class="wp-update">[{{overseeUpdate}}]</span>
            <span class="wp-shipNum">三级监视区：{{overseeShipNum-warningShipNum}} （艘）</span>
          </p>
        </div>
      </div>
      <div class="wp-infoPanel">
        <div>
          <p v-if="allShipHistory.length==0" class="isEmpty">暂无数据</p>
          <p v-for="(item,i) in allShipHistory" :key="i">
            <span>[{{item.changeTime}}]</span>
            <span class="a_mmsi" :mmsi="item.ShipID">({{item.name}})</span>
            <!--  -->
            <span :class="{'enterBlink':item.changeType=='enter'&&item.areaLevel==1}">{{item.changeType=="enter"?"进入了":"离开了"}}</span>
            <span :style="`color:${item.areaLevel==1?'red':'black'}'`">{{item.areaLevel==1?"一级危险区":item.areaLevel==2?"二级警戒区":"三级监视区"}}</span>
            <!-- +item.areaLevel==1?'red':'#333' -->
          </p>
        </div>

      </div>
    </div>


  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "seaChart",
  data() {
    return {
      _map: "", //地图示例
      options: "", //地图对象参数
      innerMapdata: {}, //接受父组件传来的"开关参数对象"
      mapdetail: {
        //mapdetail
        mapM: {
          //测距 相关属性
          units: ["nm", "km", "mi"],
          current_unit: 0,
          measure: false,
          unit: false
        }
      },
      mapNowRoom: 12, //当前地图缩放程度
      zoomTimer:null,//定时获取当前地图缩放的定时器
      mapDraw: {
        area: false,
        point: false,
        line: false
      },
      // 风车旋转的相关参数
      marker: [],
      magnification: 0.4, //初始风车缩放倍数
      fcRotateTimer: null, //风车旋转 计时器容器，组件销毁后 记得清除
      iconInfos: [], //风车
      locs: [], //风车位置
      initRange: 0,
      //--end

      // 当前显示的地图类型
      nowShowMapType: 1, //默认1 海图

      // 区域容器
      dangerCan: [
        [22.1741, 113.7368],
        [22.1508, 113.7552],
        [22.1136, 113.7627],
        [22.0952, 113.7497],
        [22.096, 113.7045],
        [22.1246, 113.685],
        [22.1543, 113.7032]
      ], //风机所在区域，一级危险警告,
      warningCan: [
        [22.1899, 113.7379],
        [22.1527, 113.7718],
        [22.1106, 113.7766],
        [22.0853, 113.76],
        [22.0815, 113.702],
        [22.1095, 113.6769],
        [22.1321, 113.6687],
        [22.1661, 113.691]
      ], //风机所在区域外围，二级一般警告，
      overseeCan: [
        [22.2084, 113.7418],
        [22.1639, 113.7833],
        [22.1273, 113.7912],
        [22.1028, 113.7899],
        [22.0755, 113.7727],
        [22.0672, 113.7366],
        [22.0662, 113.6951],
        [22.0939, 113.6666],
        [22.1388, 113.6505],
        [22.1814, 113.681]
      ], //三级监视警告
      dangerShips: [], //危险区的船
      warningShips: [], //预警区的船
      overseeShips: [], //监视区的船
      watchShipTimer: [], //刷新船只进出情况的timer数组，记得清除
      dangerShipNum: 0, //各区域船数量
      warningShipNum: 0,
      overseeShipNum: 0,
      dangerEnter: [], //各区域进入和离开的船
      warningEnter: [],
      overseeEnter: [],
      dangerLeave: [],
      warningLeave: [],
      overseeLeave: [],
      dangerEnterHistory: [], //各区域进入或离开的船的历史记录
      warningEnterHistory: [],
      overseeEnterHistory: [],
      dangerLeaveHistory: [],
      warningLeaveHistory: [],
      overseeLeaveHistory: [],
      allShipHistory:[],//船离开和进入的总历史数据
      dangerUpdate:0,//数据更新时间
      warningUpdate:0,
      overseeUpdate:0,

      // --end

      // 当前绘制的区域,线，点的集合
      areaCan: [],
      lineCan: [],
      pointCan: [],
      //--end


      // 气象数据粒子动图
      canvas: null,//挂载后将canvas元素对象赋值给此变量
      heatmap:null,//热图面板盒子，挂载后将盒子赋值给此变量
      openHaifeng:false,//打开海风图
      openQiya:false,//打开气压
      openFengchang:false,//打开风场
      openQiwen:false,//打开气温
      qiwenIsInit:false,//热力图只执行一次，以提升性能
      particleAnimation:null,//存放动画返回的id值，以方便停止动画
      nowShowPartical:"",//当前显示的粒子图像
      // --end


      // 区域回放时间段
      startTime:'',
      endTime:'',
      areaReplayTime:'',

      // 选中船监听，当前选中的船
      nowCheckedShip:'',
      

    };
  },
  watch: {
    // 监听eye的变化，以达到更新mapdata的目的
    eye(n, o) {
      this.innerMapdata = this.mapdata;
    },
    mapNowRoom(n, o) {
      // console.log(`缩放比例由 ${o} 变到了 ${n} !!!`);
      this.showWindMill(n);
    },
    nowCheckedShip(n,o){
      if(!!n){
        this.shipDetail(n);
      }
    }
  },
  components: {
  },
  methods: {
    initArea(){
      // 添加标记
      let dangerArea = this.dangerCan;
      let warningArea = this.warningCan;
      let overseeArea = this.overseeCan;
      setTimeout(() => {
        let polyline = ShipxyAPI.polygon(dangerArea, {
          color: "rgba(255,0,0,0.7)"
        }).addTo(this._map);
        let polyline2 = ShipxyAPI.polygon(warningArea, {
          color: "rgba(255, 100, 0, 0.5)"
        }).addTo(this._map);
        let polyline3 = ShipxyAPI.polygon(overseeArea, {
          color: "rgba(255, 200, 0, 0.5)"
        }).addTo(this._map);
      }, 1000);
    },
    // 此函数用于创建平面区域
    drawArea(_map) {
      let draw_shape;
      let draw_layer;
      
      // 自定义按钮-添加标注
      $("#btn_add").on("click", function (e) {
          e.stopPropagation();
          if (!!draw_shape) {
              // 编辑模式
              if (!draw_layer) {
                  draw_layer = _map.Draw.getLayer(draw_shape);
              }
              console.log("绘制完成：可以通过：draw_layer.getLatLng()，1获取点集：", draw_layer.getLatLngs()[0]);
              _map.Draw.edit(draw_layer);
          } else {
              draw_shape = _map.Draw.begin({
                          shape: 'Poly'
                      }
              );
              console.log("pm:create：draw_shape,", draw_shape);
              _map.on("pm:create", function () {
                  if (!!draw_shape) {
                      _map.Draw.end(draw_shape);
                  }
                  if (!draw_layer) {
                      draw_layer = _map.Draw.getLayer(draw_shape);
                  }
                  console.log("绘制完成：可以通过：draw_layer.getLatLng()，2获取点集：", draw_layer.getLatLngs()[0]);

                  // 编辑模式
                  _map.Draw.edit(draw_layer, false);
                  draw_layer.on("pm:edit", function () {
                      console.log("绘制完成：可以通过：draw_layer.getLatLngs()，3获取点集：", draw_layer.getLatLngs()[0]);
                  });
              });
          }
      });
      // 自定义按钮-添加标注
      $("#btn_end").on("click", function (e) {
          e.stopPropagation();
          if (!!draw_shape) {
              if (!draw_layer) {
                  draw_layer = _map.Draw.getLayer(draw_shape);
              }
              _map.Draw.cancelEdit(draw_layer);
          }
      });
      // 自定义按钮-清除标注
      $("#btn_del").on("click", function (e) {
          e.stopPropagation();
          if (!!draw_layer) {
              draw_layer.remove();
          }
          draw_shape=null;
          draw_layer=null;
      });

      // // 添加
      // $("#btn_add").on("click", function(e) {
      //   e.stopPropagation();
      //   if (!!draw_shape) {// 编辑模式
      //     if (!draw_layer) {draw_layer = _map.Draw.getLayer(draw_shape);}
      //     _map.Draw.edit(draw_layer);
      //   } else {
      //     draw_shape = _map.Draw.begin({shape: "Poly"});
      //     _map.on("pm:create", function() {
      //       if (!!draw_shape) {_map.Draw.end(draw_shape);}
      //       _map.Draw.edit(draw_layer, false);
      //       draw_layer.on("pm:edit", function() {});
      //     });
      //   }
      // });
      // // 完成
      // $("#btn_end").on("click", e => {
      //   e.stopPropagation();
      //   if (!!draw_shape) {
      //     if (!draw_layer) {
      //       draw_layer = _map.Draw.getLayer(draw_shape);
      //     }
      //     _map.Draw.cancelEdit(draw_layer);
      //   }
      // });
      // // 清除
      // $("#btn_del").on("click", (e)=> {
      //   e.stopPropagation();
      //   if (!!draw_layer) {
      //     draw_layer.remove();
      //   }
      //   draw_layer = null;
      //   draw_shape = null;
      // });
    },
    drawLine(_map) {
      let draw_shape;
      let draw_layer;
      // 添加标注
      $("#btn_add_line").on("click", function(e) {
        console.log(draw_shape);
        console.log(draw_layer);
        e.stopPropagation();
        if (!!draw_shape) {
          console.log("编辑模式");
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          _map.Draw.edit(draw_layer);
        } else {
          console.log("绘制模式");
          draw_shape = _map.Draw.begin({shape: "Line"});
          _map.on("pm:create", function() {
            if (!!draw_shape) {
              _map.Draw.end(draw_shape);
            }
            if (!draw_layer) {
              draw_layer = _map.Draw.getLayer(draw_shape);
            }
            // 编辑模式
            _map.Draw.edit(draw_layer, false);
            draw_layer.on("pm:edit", function() {});
          });
        }
      });
      // 完成
      $("#btn_end_line").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_shape) {
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          _map.Draw.cancelEdit(draw_layer);
        }
      });
      // 清除
      $("#btn_del_line").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_layer) {
          draw_layer.remove();
        }
        draw_layer = null;
        draw_shape = null;
      });
    },
    drawPoint(_map) {
      let draw_shape;
      let draw_layer;
      // 添加标注
      $("#btn_add_point").on("click", function(e) {
        e.stopPropagation();
        console.log(draw_shape);
        console.log(draw_layer);
        if (!!draw_shape) {
          // 编辑模式
          console.log("编辑模式");
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          console.log(draw_shape);
          _map.Draw.edit(draw_layer);
        } else {
          console.log("绘制模式");
          console.log(_map.Draw)
          draw_shape = _map.Draw.begin({shape: "Marker"});
          _map.on("pm:create", function() {
            if (!!draw_shape) {
              _map.Draw.end(draw_shape);
            }
            _map.Draw.edit(draw_layer, false);
            draw_layer.on("pm:edit", function() {
              console.log("编辑点完成");
            });
          });
        }
      });
      // 完成
      $("#btn_end_point").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_shape) {
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          _map.Draw.cancelEdit(draw_layer);
        }
      });
      // 删除
      $("#btn_del_point").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_layer) {
          draw_layer.remove();
        }
        draw_layer = null;
        draw_shape = null;
      });
    },
    drawRoute(_map){
      // 创建地图示例
      var _tds;// 航线对象
      var _tds_data;// 航线数据
      // 航线绘制
      $("#btn_draw_track").on("click", function () {
          if (!_tds) {
              var options = {
                  callBack: function (item) {
                      _tds_data = item;
                      console.log("====航线绘制 callBack===", item);
                  },
                  unit: "nm",
                  symbol: "ABC_"
              };
              _tds = ShipxyAPI.trackDrawSymbol(_map, options);
          }
          _tds.drawTrack();
      });
      // 航线编辑
      $("#btn_draw_track_edit").on("click", function () {
          if (!!_tds) {
              _tds.editLine();
          }
      });
      // 航线绘制完成
      $("#btn_draw_track_finish").on("click", function () {
          if (!!_tds) {
              // 只读模态
              _tds.showTrack();
          }
      });
      // 删除航线
      $("#btn_draw_track_delete").on("click", function () {
          if (!!_tds) {
              // 删除航线
              _tds.removeTrack();
          }
      });
      // 显示航线
      $("#btn_draw_track_view").on("click", function () {
          if (!!_tds_data) {
              // 显示航线
              _tds.showTrack(_tds_data);
          }
      });
    },
    // 此函数用于开启船视图
    openShip(_map) {
      // 开启区域船服务
      let canvasShips = ShipxyAPI.ShipService(_map, {
        enableAreaShip: true, // 区域船
        enableFleetShip: true // 船队船
      });
      canvasShips.addSelectedListener((ship)=> {
        // 选中船监听
        this.nowCheckedShip=ship.mmsi+"";
      });

      // 船舶定位
      $(".watchPanel").on("click", ".a_mmsi", (e)=>{
        e.stopPropagation();
        let mmsi = $(e.target).attr("mmsi");
        this.shipDetail(mmsi);
      });
    },
    shipDetail(mmsi){
      if (mmsi.length > 0) {
        let ship = this._map.shipsService.locationShip(mmsi, true);
        console.log(ship);
        // let html = "";
        // if (ship === null) {
        //   //没有查询的船
        //   console.log("没找到船");
        //   return;
        // } else {
        //   html += `
        //   <div class='box'>
        //     <div class='title'>船名：${ship.name}</div>
        //     <div class='field'>呼号：${ship.callsign}</div>
        //     <div class='field'>IMO：${ship.imo}</div>
        //     <div class='field'>MMSI：${ship.mmsi}</div>
        //     <div class='field'>船长：${ship["length"]}米</div>
        //     <div class='field'>船宽：${ship.width}米</div>
        //     <div class='field'>吃水：${ship.draught}米</div>
        //     <div class='field'>航速：${CommUtils.getNumber(
        //       ship.sog,
        //       0
        //     )}节</div>
        //     <div class='field'>船首向：${CommUtils.getNumber(
        //       ship.hdg,
        //       1
        //     )}度</div>
        //     <div class='field'>航迹向：${CommUtils.getNumber(
        //       ship.cog,
        //       1
        //     )}度</div>
        //     <div class='field'>经纬度：${CanvasShipUtils.latlngFormatter([
        //       ship.lat,
        //       ship.lng
        //     ])}</div>
        //     <div class='field'>类型：${CanvasShipUtils.getNewShipTypeCN(
        //       ship
        //     )}</div>
        //     <div class='field'>航行状态：${CanvasShipUtils.getDisValue(
        //       ship.navistatus,
        //       "naviStatus",
        //       "zh_CN"
        //     )}</div>
        //     <div class='field'>更新时间：${CommUtils.dataFormat(
        //       new Date(ship.lastdyn * 1000),
        //       "yyyy-MM-dd hh:mm:ss"
        //     )}</div>
        //   </div>`;
        // }
        // this._map.openPopup(html, ShipxyAPI.latLng(ship.lat, ship.lng), {
        //   className: "shipxy_popup"
        // });
      }
    },
    // 区域回放
    areaReplay(_map) {
      // 区域回放
      $("#btn_areaplay").on("click", ()=> {
        // 区域船服务注掉了（不能同时使用）
        var areaPlayService = L.areaPlayService(_map, {
          areaId: "97975E4B-26D6-4AA4-8FD3-48DB2CE683A1",
          area:this.dealLatlng(this.overseeCan,"B-C"),
          minTime: ~~(this.areaReplayTime[0]/1000),
          maxTime: ~~(this.areaReplayTime[1]/1000)
        });
        this.ar
      });
    },
    // 气象展示
    weather(_map) {
      ShipxyAPI.WeatherService(_map); // 专业气象，开启

      function setActive(obj) {
        $(".btn_weather").each(function(obj, index) {
          if ($(this).attr("is_show") == "1") {
            $(this).addClass("active");
          } else {
            $(this).removeClass("active");
          }
        });
      }
      // 气温
      $("#btn_qiwen").on("click", (e)=> {
        e.stopPropagation();
        this.openWeatherCanvas("qiwen");
      });
      // 气压
      $("#btn_qiya").on("click", (e)=> {
        e.stopPropagation();
        this.openWeatherCanvas("qiya");
      });

      // 海风 （无效果）
      $("#btn_haifeng").on("click", (e)=> {
        e.stopPropagation();
        this.openWeatherCanvas("haifeng");
      });

      // 海浪 （无效果）
      $("#btn_hailang").on("click", (e)=> {
        e.stopPropagation();
      });

      // 风场 （无效果）
      $("#btn_fengchang").on("click", (e)=> {
        e.stopPropagation();
        this.openWeatherCanvas("fengchang");

      });

      // 海区预报
      $("#btn_haiquyubao").on("click", function (e) {
          e.stopPropagation();
          if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
            $(this).attr("is_show", "0");
            _map.weatherService.hideSeaAreaForecasts();
          } else {
            $(this).attr("is_show", "1");
            // 显示
            _map.weatherService.showSeaAreaForecasts();
          }
          setActive($(this));
      });
      // 台风
      $("#btn_taifeng").on("click", (e)=> {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.weatherService.hideTyphoonInfoList();
        } else {
          $(this).attr("is_show", "1");
          // 显示
          _map.weatherService.showTyphoonInfoList(function() {
            console.log("showTyphoonInfoList is close!");
          });
        }
        setActive($(this));
      });
      // 潮汐
      $("#btn_chaoxi").on("click", (e)=> {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.weatherService.hideTides();
        } else {
          $(this).attr("is_show", "1");
          // 显示
          _map.weatherService.showTides();
        }
        setActive($(this));
      });
    },
    // 开启气象动效
    openWeatherCanvas(type){
      let ctx = this.canvas.getContext("2d");
      this.checkPartical(type);
      if(type==="haifeng"){
        let rnd = Math.random;
        if(this.openHaifeng){//openHaifeng 判断是否已经开启此视图
          this.nowShowPartical="";
          this.openHaifeng=false;
          cancelAnimationFrame(this.particleAnimation);
          this.particleAnimation=null;
          ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
          // this.canvas.style.opacity="1";
          this.canvas.style.display="none";
          return;
        }
        this.nowShowPartical="haifeng";
        this.openHaifeng=true;
        // this.canvas.style.opacity="0.3";
        this.canvas.style.display="block";
        let cWidth=this.canvas.width=innerWidth,cHeight=this.canvas.height=innerHeight;
        let num=30;
        let pts = Array(num*num).fill(0).map((item,index) => {
            let d = Math.PI * 0.2;
            let size = ~~(rnd() * 11 )+ 6;
            return {
                size,
                dir: d,
                targetDir: d,
                speed: (rnd()*10+30)/50,
                x: (()=>{
                  return (index+1)%num*(rnd()*16+cWidth/num-8);
                })(),
                y: (()=>{
                  return ~~((index+1)/num)*(rnd()*14+cHeight/num-7);
                })()
            };
        });
        let draw=(t)=>{
            this.particleAnimation=requestAnimationFrame(draw);
            let opa=(~~(rnd()*5)+10)/100;
            ctx.fillStyle = `rgba(0,0,0,${opa})`
            ctx.fillRect(0,0,cWidth,cHeight);

            pts.forEach((p,i) => {
              p.x += Math.cos(p.dir) * p.speed;
              p.y += Math.sin(p.dir) * p.speed;
              if(p.x<-20)p.x=cWidth-20;
              if(p.y<-20)p.y=cHeight-20;
              if(p.x>cWidth-20)p.x=-20;
              if(p.y>cHeight-20)p.y=-20;
              paintA(p);
            });
        }
        let paintA=(p, t)=>{
          ctx.fillStyle = '#fff';
            ctx.translate(p.x, p.y);
            ctx.rotate(p.dir + Math.PI / 2);
            ctx.font = `${p.size}px Arial`;
            ctx.fillText("。", 0, 0);
            ctx.rotate(-p.dir - Math.PI / 2);
            ctx.translate(-p.x, -p.y);

        }
        let clearCanvas=()=>{

        }
        requestAnimationFrame(draw);
      }else if(type==="fengchang"){
        if(this.openFengchang){//openHaifeng 判断是否已经开启此视图
          this.openFengchang=false;
          this.nowShowPartical="";
          cancelAnimationFrame(this.particleAnimation);
          this.particleAnimation=null;
          ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
          this.canvas.style.display="none";
          return;
        }
        this.nowShowPartical="fengchang";
        this.openFengchang=true;
        this.canvas.style.display="block";
        let cw = (this.canvas.width = window.innerWidth);
        let ch = (this.canvas.height = window.innerHeight);
        ctx.fillStyle = "hsla(0, 5%, 5%, .025)";

        class Particle {
          constructor() {
            this.pos = { x: Math.random() * cw, y: Math.random() * ch };
            this.vel = { x: 0, y: 0 };
            this.base = (1 + Math.random()) * 3;
            this.life = randomIntFromInterval(5, 20);
            //  this.color = Math.random() < 0.1 ? "hsla(200,90%,50%,1)" : "hsla(0,0%,30%,.7)";
            let rnd=Math.random()
            this.color = rnd< 0.01 ? "#0f0" :rnd<0.1?"rgb(236, 117, 117)":"rgb(153, 185, 255)";
            this.flow=5;
            this.size=5;
            this.history = [];
          }
          update() {
            this.history.push({ x: this.pos.x, y: this.pos.y });
            this.pos.x += this.vel.x/this.flow;
            this.pos.y += this.vel.y/this.flow;
          }

          show() {
            this.life--;
            ctx.beginPath();
            let last = this.history.length - 1;
            ctx.moveTo(this.history[last].x, this.history[last].y);
            for (let i = last; i > 0; i--) {
              ctx.lineTo(this.history[i].x, this.history[i].y);
            }
            ctx.strokeStyle = this.color;
            ctx.stroke();

            if (this.history.length > this.life) this.history.splice(0, 1);
          }

          edges() {
            if (
              this.pos.x > cw ||
              this.pos.x < 0 ||
              this.pos.y > ch ||
              this.pos.y < 0
            ) {
              this.pos.y = Math.random() * ch;
              this.pos.x = Math.random() * cw;
              this.history.length = 0;
            }
            if (this.life <= 0) {
              this.pos.y = Math.random() * ch;
              this.pos.x = Math.random() * cw;
              this.life = randomIntFromInterval(5, 20);
              this.history.length = 0;
            }
          }

          follow() {
            let x = ~~(this.pos.x / size);
            let y = ~~(this.pos.y / size);
            let index = x + y * cols;

            let angle = flowField[index];

            this.vel.x = this.base * Math.cos(angle);
            this.vel.y = this.base * Math.sin(angle);
          }
        }

        let particles = [];

        let size = 30; //flow field cell size
        let rows = ~~(ch / size) + 2;
        let cols = ~~(cw / size) + 2;
        let flowField = [];

        let getAngle=(x, y)=> {
          return (Math.cos(x * 0.01) + Math.cos(y * 0.01)) * Math.PI / 2;
        }

        let getFlowField=(rows, cols)=> {
          for (let y = 0; y <= rows; y++) {
            for (let x = 0; x < cols; x++) {
              let index = x + y * cols;
              let a = getAngle(x * size, y * size);

              flowField[index] = a;
            }
          }
        }
        getFlowField(rows, cols);

        for (let i = 0; i < 1000; i++) {
          particles.push(new Particle());
        }

        let frame=()=> {
          this.particleAnimation = requestAnimationFrame(frame);

          ctx.fillRect(0, 0, cw, ch);

          particles.map(p => {
            p.follow();
            p.update();
            p.show();
            p.edges();
          });
        }

        let Init=()=>{
          cw = this.canvas.width = window.innerWidth;
          ch = this.canvas.height = window.innerHeight;
        //ctx.fillStyle = "hsla(0, 5%, 5%, .025)";
          ctx.fillStyle = "#0001";
          rows = ~~(ch / size) + 2;
          cols = ~~(cw / size) + 2;
          flowField = new Array(rows * cols);
          getFlowField(rows, cols);
          if (this.particleAnimation) {
            window.cancelAnimationFrame(this.particleAnimation);
            this.particleAnimation = null;
          }
          frame();
        }
        window.setTimeout(function() {
        Init();

        window.addEventListener("resize", Init, false);
        }, 15);


        function randomIntFromInterval(mn, mx){
          return Math.floor(Math.random()*5* (mx - mn + 1) + mn);
        }
      }else if(type==="qiya"){
        let canvas=this.canvas;
        let vue=this;
        if(this.openQiya){//openHaifeng 判断是否已经开启此视图
          this.nowShowPartical="";
          this.openQiya=false;
          cancelAnimationFrame(this.particleAnimation);
          this.particleAnimation=null;
          ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
          this.canvas.style.display="none";
          return;
        }
        this.nowShowPartical="qiya";
        this.openQiya=true;
        this.canvas.style.display="block";

        console.log("开始绘制风场");
        let App = {}
        App.setup = function () {
          // let canvas=document.getElementById("canvas");
          this.canvas = vue.canvas;
          this.canvas.width = innerWidth//maxWidth * quality//window.innerWidth
          this.canvas.height = innerHeight//maxHeight * quality//3370//window.innerHeight
          this.ctx = ctx;
          this.width = this.canvas.width;
          this.height = this.canvas.height;
          this.dataToImageRatio = Math.max(this.width, this.height) / 1000;

          // Blend mode /!\ Don't use if you can! Can be a mega source of lag, proportional to canvas size
          this.ctx.globalCompositeOperation = 'darker'// This one is OK
          //	this.ctx.globalCompositeOperation = 'lighter'// This one is OK

          this.ctx.imageSmoothingEnabled = false
          this.ctx.webkitImageSmoothingEnabled = false
          this.ctx.msImageSmoothingEnabled = false
          this.xC = this.width / 2
          this.yC = this.height / 2

          // document.getElementsByTagName('body')[0].appendChild(canvas)

          // Particle system properties
          this.lifespan = 300
          this.popPerBirth = 5
          this.maxPop = 1500
          this.birthFreq = 1
        }
        App.start = function () {
          // The start function sets, and potentially resets things that will change over time
          this.stepCount = 0
          this.particles = []

          // Counters for UI
          this.drawnInLastFrame = 0
          this.deathCount = 0

          // Initial paint (background most often)
          this.initDraw()
        }
        App.evolve = function () {
          let time1 = performance.now()
          this.stepCount++
          // Use birth control
          if (this.stepCount % this.birthFreq == 0 && (this.particles.length + this.popPerBirth) < this.maxPop) {
            for (let n = 0; n < this.popPerBirth; n++) {
              this.birth()
            }
          }
          // Core sequence: MOVE everything then DRAW everything
          App.move()
          App.draw()
          let time2 = performance.now()
        }
        App.birth = function () {
          let x = -800 + 1600 * Math.random(),
            y = -800 + 1600 * Math.random()

          let particle = {
            hue: 190 + 3 * Math.floor(3 * Math.random()),
            sat: 60 + 30 * Math.random(),
            lum: 15 + Math.floor(50*Math.random()),
            x,
            y,
            xLast: x, yLast: y,
            xSpeed: 0, ySpeed: 0,
            age: 0,
            name: 'seed-' + Math.ceil(10000000 * Math.random())
          }

          this.particles.push(particle)
        }
        App.kill = function (deadParticleName) {
          this.particles = this.particles.filter(p => p.name !== deadParticleName)
        }
        App.move = function () {
          for (let i = 0; i < this.particles.length; i++) {
            // Get particle
            let p = this.particles[i]

            // Save last position
            p.xLast = p.x
            p.yLast = p.y

            // Reset velocity, as we're dealing with velocity fields and not forces
            p.xSpeed = 0; p.ySpeed = 0

            // Eddies, boys
            let eddies = [], baseK = 7
            eddies.push({ x: -300, y: -300, K: 10 * baseK, r0: 180 })
            eddies.push({ x: 300, y: -300, K: 15 * baseK, r0: 150 })
            eddies.push({ x: 300, y: 300, K: 10 * baseK, r0: 250 })
            eddies.push({ x: -300, y: 300, K: 15 * baseK, r0: 150 })
            eddies.push({ x: 0, y: 0, K: 5 * baseK, r0: 20 })

            for (var e = 0; e < eddies.length; e++) {
              let eddy = eddies[e]
              let dx = p.x - eddy.x,
              dy = p.y - eddy.y,
              r = Math.sqrt(dx*dx + dy*dy),
              theta = Utils.segmentAngleRad(0, 0, dx, dy, true),
              cos = Math.cos(theta), sin = Math.sin(theta),
              K = eddy.K, // intensity
              r0 = eddy.r0

              let er = { x: cos, y: sin },eO = { x: -sin, y: cos }

              let radialVelocity = -0.003 * K * Math.abs(dx*dy)/3000,
                //azimutalVelocity = 2 * K * Math.max(0, Math.min(1 - r/(2*r0), r/(2*r0)))
                sigma = 100,
                azimutalVelocity = K * Math.exp(-Math.pow((r - r0) / sigma, 2))

              p.xSpeed += radialVelocity * er.x + azimutalVelocity * eO.x
              p.ySpeed += radialVelocity * er.y + azimutalVelocity * eO.y

            }

            // Viscosity
            let visc = 1
            p.xSpeed *= visc; p.ySpeed *= visc

            p.speed = Math.sqrt(p.xSpeed * p.xSpeed + p.ySpeed * p.ySpeed)
            let s=0.01;//流动速度
            // p.x += 0.1 * p.xSpeed; p.y += 0.1 * p.ySpeed
            p.x += s * p.xSpeed; p.y += s * p.ySpeed
            // Get older
            p.age++
            // Kill if too old
            if (p.age > this.lifespan) {
              this.kill(p.name)
              this.deathCount++
            }
          }
        }
        App.initDraw = function () {
          // Reset
          this.ctx.clearRect(0, 0, this.width, this.height)

          // Background
          this.ctx.beginPath()
          this.ctx.rect(0, 0, this.width, this.height)
          this.ctx.fillStyle = '#0006'
          this.ctx.fill()
          this.ctx.closePath()
        }
        App.draw = function () {
          this.drawnInLastFrame = 0
          if (!this.particles.length) return false

          this.ctx.beginPath()
          this.ctx.rect(0, 0, this.width, this.height)
          //this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
          this.ctx.fill()
          this.ctx.closePath()

          for (let i = 0; i < this.particles.length; i++) {
            // Draw particle
            let p = this.particles[i]
            let h, s, l, a
            h = p.hue,
            s = p.sat
            l = p.lum
            a = 0.3
            a = 0.3 + p.speed / 400

            let last = this.dataXYtoCanvasXY(p.xLast, p.yLast),
            now = this.dataXYtoCanvasXY(p.x, p.y)

            this.ctx.beginPath()

            // this.ctx.strokeStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
            this.ctx.strokeStyle = 'rgba(255,255,255,1)';
            // this.ctx.fillStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';

            // Particle trail
            this.ctx.moveTo(last.x, last.y)

            this.ctx.lineTo(now.x, now.y)

            let size = .4 * (3 - 4 * p.age / 500)

            this.ctx.lineWidth = 1 * size * this.dataToImageRatio
            this.ctx.stroke()
            this.ctx.closePath()

            // UI counter
            this.drawnInLastFrame++
          }
        }
        App.dataXYtoCanvasXY = function (x, y) {
          const zoom = 0.72
          let xx = this.xC + x * zoom * this.dataToImageRatio,
            yy = this.yC + y * zoom * this.dataToImageRatio

          return {x: xx, y: yy}
        }

        let Utils = {}
        Utils.segmentAngleRad = (Xstart, Ystart, Xtarget, Ytarget, realOrWeb) => {
          /**
           * @param {Number} Xstart X value of the segment starting point
           * @param {Number} Ystart Y value of the segment starting point
           * @param {Number} Xtarget X value of the segment target point
           * @param {Number} Ytarget Y value of the segment target point
           * @param {Boolean} realOrWeb true if Real (Y towards top), false if Web (Y towards bottom)
           * @returns {Number} Angle between 0 and 2PI
           */
          let result// Will range between 0 and 2PI
          if (Xstart == Xtarget) {
            if (Ystart == Ytarget) {
              result = 0
            } else if (Ystart < Ytarget) {
              result = Math.PI/2
            } else if (Ystart > Ytarget) {
              result = 3*Math.PI/2
            } else {}
          } else if (Xstart < Xtarget) {
            result = Math.atan((Ytarget - Ystart)/(Xtarget - Xstart))
          } else if (Xstart > Xtarget) {
            result = Math.PI + Math.atan((Ytarget - Ystart)/(Xtarget - Xstart))
          }

          result = (result + 2*Math.PI)%(2*Math.PI)

          if (!realOrWeb) {
            result = 2*Math.PI - result
          }

          return result
        }

        App.setup();
        App.start();

        let frame = () => {
          App.evolve();
          this.particleAnimation=requestAnimationFrame(frame);
        }
        frame();
      }else if(type==="qiwen"){
        // 创建一个heatmap实例对象
        // “h337” 是heatmap.js全局对象的名称.可以使用它来创建热点图实例
        // 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
        if(this.openQiwen){
          this.openQiwen=false;
          this.nowShowPartical="";
          this.heatmap.style.display="none";
          return;
        }
        if(this.qiwenIsInit){
          this.qiwenIsInit=true;
          return;
        }
        this.nowShowPartical="qiwen";
        this.openQiwen=true;
        this.heatmap.style.display="block";

        let heatmap=this.heatmap;
        heatmap.style.width=innerWidth+"px";
        heatmap.style.height=innerHeight+"px";
        var max = 0;
        var width = innerWidth;
        var height = innerHeight;
        var len = 100;
        let addLen=100;
        addDraw();
        dtrw();
        function dtrw(){
          var points = [];
          var heatmapInstance = h337.create({
              container: heatmap,
              maxOpacity:0.5,
              blur:1,
              gradient:{
                0.5:"#9bc7ff",
                0.9:"#ffe729",
                0.99:"#ff7814",
              },
          });
          while (len--) {
              var val = Math.floor(Math.random()*100);
              max = Math.max(max, val);
              let rndX=Math.floor(Math.random()*(width));
              let midY=(height/width)*Math.sqrt((width+rndX)*(width-rndX));
              let rndY=Math.random()*(height-midY)+midY;
              var point = {
                  x: rndX,
                  y: rndY,
                  value: val,
                  radius: 200,
                  opacity:0.8,
              };
              points.push(point);
          }
          var data = {
              max: max,
              data: points
          };
          //因为data是一组数据,web切图报价所以直接setData
          heatmapInstance.setData(data); //数据绑定还可以使用
        }
        function addDraw(){
          let points=[];
          let heatmapInstance2 = h337.create({
              container: heatmap,
              maxOpacity:0.5,
              blur:1,
              gradient:{
                0.5:"#b5c4ff",
                0.9:"#9bc7ff",
                0.98:"#ffe729",
              },
          });
          while (addLen--) {
              var val = Math.floor(Math.random()*100);
              max = Math.max(max, val);
              let addX=Math.floor(Math.random()*(width));
              let addY=Math.random()*(height/width)*Math.sqrt((width+addX)*(width-addX));
              var point = {
                  x: addX,
                  y: addY,
                  value: val,
                  radius: 200,
                  opacity:0.6,
              };
              points.push(point);
          }
          var data = {
              max: max,
              data: points
          };
          heatmapInstance2.setData(data); //数据绑定还可以使用
        }


      }

    },
    checkPartical(type){
      let ctx = this.canvas.getContext("2d");
      let eles=$(".partical");
      for(let i=0;i<eles.length;i++){
        if(eles[i].getAttribute("thetype")!==type){
          eles[i].classList.remove("btn-selected");
          eles[i].setAttribute("isClick", "0");
        }
      }
      if(type!==this.nowShowPartical){
        switch(this.nowShowPartical){
          case "haifeng":
            this.openHaifeng=false;
            cancelAnimationFrame(this.particleAnimation);
            this.particleAnimation=null;
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.canvas.style.display="none";
            break;
          case "fengchang":
            this.openFengchang=false;
            cancelAnimationFrame(this.particleAnimation);
            this.particleAnimation=null;
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.canvas.style.display="none";
            break;
          case "qiya":
            this.openQiya=false;
            cancelAnimationFrame(this.particleAnimation);
            this.particleAnimation=null;
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.canvas.style.display="none";
            break;
          case "qiwen":
            this.openQiwen=false;
            this.heatmap.style.display="none";
            break;
          default:break;
        }
      }
    },
    // 图层展示函数
    showTool(_map) {
      this.options.gratings = { isShow: false };
      // 开启,专属区服务
      ShipxyAPI.areaViewSymbol(_map);
      // 开启,港口瓦片
      ShipxyAPI.portDataSymbol(_map);

      // 海区
      $("#btn_haiqu").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          // 隐藏，全球海区：GSEA
          _map.areaViewSymbol.hideArea("GSEA");
        } else {
          $(this).attr("is_show", "1");
          // 显示，全球海区：GSEA
          _map.areaViewSymbol.showArea("GSEA");
        }
      });
      // 排放
      $("#btn_paifang").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.areaViewSymbol.hideArea("TYP");
        } else {
          $(this).attr("is_show", "1");
          _map.areaViewSymbol.showArea("TYP");
        }
      });
      // 排放（中国）
      $("#btn_paifang_china").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.areaViewSymbol.hideArea("CTYP");
        } else {
          $(this).attr("is_show", "1");
          _map.areaViewSymbol.showArea("CTYP");
        }
      });
      // 经济
      $("#btn_jingji").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.areaViewSymbol.hideArea("EEZ");
        } else {
          $(this).attr("is_show", "1");
          _map.areaViewSymbol.showArea("EEZ");
        }
      });

      // 港口
      $("#btn_port").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          // 隐藏
          _map.portDataSymbol.hide();
        } else {
          $(this).attr("is_show", "1");
          // 显示
          _map.portDataSymbol.show();
        }
      });

      // 光栅
      $("#btn_guangshan").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          // 隐藏
          _map.setRasterShow(false);
        } else {
          $(this).attr("is_show", "1");
          // 显示
          _map.setRasterShow(true);
        }
      });

      // 时区
      $("#btn_areatime").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          // 隐藏
          _map.areaViewSymbol.hideArea("TIME");
        } else {
          $(this).attr("is_show", "1");
          // 显示
          _map.areaViewSymbol.showArea("TIME");
        }
      });

      // 经纬度网格
      ShipxyAPI.latlngGraticuleServer(_map);
      $("#btn_latlnggrid").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          // 隐藏
          _map.latlngGraticuleServer.hide();
        } else {
          $(this).attr("is_show", "1");
          // 显示
          _map.latlngGraticuleServer.show();
        }
      });
    },
    // 切换地图类型
    changeMapType(type) {
      switch (type) {
        case "haitu":
          this.nowShowMapType = 1;
          this._map.basemapsControl.changeMap("MT_SEA");
          break;
        case "ditu":
          this.nowShowMapType = 2;
          this._map.basemapsControl.changeMap("MT_GOOGLE");
          break;
        case "weixing":
          this.nowShowMapType = 3;
          this._map.basemapsControl.changeMap("MT_SATELLITE");
          break;
        default:
          console.log("地图类型不匹配");
      }
    },
    // 测距
    // 自定义按钮-测距
    measureAdd() {
      this.mapdetail.mapM.measure = !this.mapdetail.mapM.measure;
      this._map.PolylineMeasureControl._toggleMeasure();
    },
    // 自定义按钮-切换单位
    measureUnit() {
      this._map.PolylineMeasureControl._changeUnit();
      this.mapdetail.mapM.current_unit = ++this.mapdetail.mapM.current_unit % 3;
    },
    // 自定义按钮-移除
    measureRemove() {
      this._map.PolylineMeasureControl._clearAllMeasurements();
    },

    // 将风车添加到地图上
    drawWindmill(nowZoom) {
      //初始化调用
      // 自定义图标
      var marker_icon_1 = L.icon({
        iconUrl: "./static/img/fc2.png",
        iconAnchor: [18, 18]
      });
      // 添加标记,到地图 113.735530，22.1604
      let latlngs = [
        [22.16066, 113.73545],
        [22.1545, 113.73163],
        [22.15436, 113.73918],
        [22.14858, 113.72774],
        [22.14838, 113.73528],
        [22.14263, 113.7239],
        [22.14245, 113.7315],
        [22.14236, 113.73905],
        [22.13655, 113.72761],
        [22.13639, 113.73513],
        [22.13629, 113.74261],
        [22.13132, 113.71738],
        [22.13069, 113.72422],
        [22.13039, 113.73173],
        [22.13043, 113.7392],
        [22.12445, 113.69727],
        [22.12447, 113.70472],
        [22.12435, 113.71221],
        [22.12425, 113.71961],
        [22.12405, 113.72714],
        [22.12393, 113.73558],
        [22.12389, 113.74302],
        [22.11846, 113.7083],
        [22.11824, 113.71581],
        [22.11817, 113.72328],
        [22.11799, 113.73079],
        [22.11787, 113.73826],
        [22.11785, 113.74564],
        [22.11184, 113.72699],
        [22.1117, 113.73446],
        [22.1063, 113.74624],
        [22.11162, 113.74193],
        [22.1058, 113.73839]
      ];

      for (let i = 0; i < latlngs.length; i++) {
        this.marker[i] = ShipxyAPI.marker(latlngs[i], {
          icon: marker_icon_1
        }).addTo(this._map);
        // 绑定Tooltip
        this.marker[i].bindTooltip("风机 " + (i + 1) + " 号");
        this.marker[i]._icon.style.display = "none";
      }

      this.openInterval();
    },
    // 定时器函数，开启定时器，使风车旋转
    openInterval() {
      //定时器，持续刷新图标
      this.fcRotateTimer = setInterval(() => {
        this.initRange += 6;
        for (let i = 0; i < this.marker.length; i++) {
          //获取图标的变换信息，包括位置，大小等，得到数组 如：["1", "0", "0", "1", "680", "311"]
          this.iconInfos[i] = $(this.marker[i]._icon)
            .css("transform")
            .replace(/[^0-9\-,]/g, "")
            .split(",");
          this.locs[i] = `translate3d(${this.iconInfos[i][4]}px, ${
            this.iconInfos[i][5]
          }px, 0px)`;
          this.marker[i]._icon.style.transform = `${this.locs[i]} rotate(${this.initRange}deg) scale(${this.magnification})`;
        }
        this.initRange = this.initRange % 360;
      }, 60);
    },
    // 根据地图缩放大小来 显示、隐藏或设置风车图标
    showWindMill(nowZoom) {
      if (nowZoom <= 12) {
        // 隐藏风车
        for (let i = 0; i < this.marker.length; i++) {
          this.marker[i]._icon.style.display = "none";
        }
      } else {
        // 显示风车
        for (let i = 0; i < this.marker.length; i++) {
          this.marker[i]._icon.style.display = "block";
        }
        if (nowZoom < 17 && nowZoom >= 15) {
          clearInterval(this.fcRotateTimer);
          this.magnification = 0.9;
          this.openInterval();
          return;
        } else if (nowZoom >= 17) {
          clearInterval(this.fcRotateTimer);
          this.magnification = 1.5;
          this.openInterval();
          return;
        } else {
          clearInterval(this.fcRotateTimer);
          this.magnification = 0.6;
          this.openInterval();
          return;
        }
      }
    },

    // 将绘制的面，线或点的坐标转化为其他格式
    dealLatlng(latlngs, format) {
      // O-A:表示 O类型 转 A类型,O类型为绘制后得到的类型
      // O类型为 [{lat:22.21,lng:113.69},{lat:22.12,lng:113.75}]
      // A类型为 122700000,37000000-123000000,37000000-123000000,36500000
      // B类型为 [[22.1463, 113.6997],[22.1826, 113.7372],[22.1158, 113.7646]]
      // C       122700000,37000000,123000000,37000000,123000000,36500000
      // 可扩展类型
      if (!format || format == "O-A") {
        let area = "";
        for (let i = 0; i < latlngs.length; i++) {
          area += i ? "-" : "";
          area +=
            ~~(latlngs[i].lng * 1000000) + "," + ~~(latlngs[i].lat * 1000000);
        }
        return area;
      } else if (format == "O-B") {
        let area = [];
        for (let i = 0; i < latlngs.length; i++) {
          area.push([
            latlngs[i].lat.toFixed(4) * 1,
            latlngs[i].lng.toFixed(4) * 1
          ]);
        }
        return area;
      } else if (format == "B-A") {
        let area = "";
        for (let i = 0; i < latlngs.length; i++) {
          area += i ? "-" : "";
          area +=
            ~~(latlngs[i][1] * 1000000) + "," + ~~(latlngs[i][0] * 1000000);
        }
        return area;
      }else if(format=="B-C"){
        let area = "";
        for (let i = 0; i < latlngs.length; i++) {
          area += i ? "," : "";
          area +=
            ~~(latlngs[i][1] * 1000000) + "," + ~~(latlngs[i][0] * 1000000);
        }
        return area;
      }
    },
    // 区域船查询函数（封装）参数区域点数组,调用此函数时，一般先调用dealLatlng()将数据处理好
    // 参数为点集，格式为：122700000,37000000-123000000,37000000-123000000,36500000
    areaShipSearch(area) {
      return new Promise((resolve, reject) => {
        if (!area) {
          return;
        }
        let url = `http://api.shipxy.com/apicall/GetAreaShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1&mode=0&scode=0&xy=${area}`;

        axios
          .get(url)
          .then(response => {
            resolve(response);
          })
          .catch(response => {
            console.log(response);
            reject(response);
          });
      });
    },

    // 区域监控报警函数
    monitor() {
      // 初始先执行一遍
      this.searchOversee(true); //传入true 表示第一次执行，不查询进入与离开的船
      this.searchWarning(true);
      this.searchDanger(true);
      // 开启定时器，刷新变化的船
      this.watchShipTimer[0] = setInterval(() => {
        this.searchOversee();
      }, 1000 * 8);
      this.watchShipTimer[1] = setInterval(() => {
        this.searchWarning();
      }, 1000 * 5);
      this.watchShipTimer[2] = setInterval(() => {
        this.searchDanger();
      }, 1000 * 3);
    },
    // 请求一级区的船
    searchDanger(isFirst) {
      this.areaShipSearch(this.dealLatlng(this.dangerCan, "B-A")).then(res => {
        this.dangerShipNum = res.data.data.length;
        this.dangerUpdate=this.nowTime();
        if (!isFirst) {
          let allData = this.contrastShip(this.dangerShips, res.data.data,1);
          this.dangerEnter = allData.newShips;
          this.dangerLeave = allData.oldShips;
          this.dangerEnterHistory.push(...this.deepClone1(allData.newShips));
          this.dangerLeaveHistory.push(...this.deepClone1(allData.oldShips));
        }

        this.dangerShips = res.data.data;
      });
    },
    // 请求二级区的船
    searchWarning(isFirst) {
      this.areaShipSearch(this.dealLatlng(this.warningCan, "B-A")).then(res => {
        this.warningShipNum = res.data.data.length;
        this.warningUpdate=this.nowTime();
        if (!isFirst) {
          let allData = this.contrastShip(this.warningShips, res.data.data,2);
          this.warningEnter = allData.newShips;
          this.warningLeave = allData.oldShips;
          this.warningEnterHistory.push(...this.deepClone1(allData.newShips));
          this.warningLeaveHistory.push(...this.deepClone1(allData.oldShips));
        }

        this.warningShips = res.data.data;
      });
    },
    // 请求三级区的船
    searchOversee(isFirst) {
      this.areaShipSearch(this.dealLatlng(this.overseeCan, "B-A")).then(res => {
        this.overseeShipNum = res.data.data.length;
        this.overseeUpdate=this.nowTime();
        if (!isFirst) {
          let allData = this.contrastShip(this.overseeShips, res.data.data,3);
          this.overseeEnter = allData.newShips;
          this.overseeLeave = allData.oldShips;
          this.overseeEnterHistory.push(...this.deepClone1(allData.newShips));
          this.overseeLeaveHistory.push(...this.deepClone1(allData.oldShips));
        }

        this.overseeShips = res.data.data;
      });
    },
    //对比新旧数组中船舶的变化，并返回新增和减少的船只,areaLevel为区域等级，以便于区别船进入、离开的是哪个区域
    contrastShip(_oldShips, _newShips,areaLevel) {
      let oldShips = this.deepClone1(_oldShips);
      let newShips = this.deepClone1(_newShips);
      for (let i = 0; i < oldShips.length; i++) {
        let ok=true;
        for (let j = 0; j < newShips.length; j++) {
          if (oldShips[i].ShipID == newShips[j].ShipID) {
            oldShips.splice(i, 1);
            newShips.splice(j, 1);
            i--;j--;
            ok=false;
            break;
          }
        }
        // 对离开的船添加信息
        if(ok){
          oldShips[i].changeTime=this.nowTime();
          oldShips[i].changeType="leave";
          oldShips[i].areaLevel=areaLevel;
        }
      }
      for(let i=0;i<newShips.length;i++){
        newShips[i].changeTime=this.nowTime();
        newShips[i].changeType="enter";
        newShips[i].areaLevel=areaLevel;
      }
      // 返回前，将离开和进入的所有数据添加到总历史数据中
      this.allShipHistory.unshift(...this.deepClone1(newShips));
      this.allShipHistory.unshift(...this.deepClone1(oldShips));
      return { oldShips, newShips };
    },
    // 次级深拷贝，即只拷贝到第二层
    deepClone1(sources) {
      return JSON.parse(JSON.stringify(sources));
    },
    nowTime(type) {
      // 参数 type为需要的时间类型,默认为time
      // time : 12:10:22
      // date : 2019-10-10
      // datetime : 2019-10-10 12:10:22
      // timestamp: 1571294661250
      return (()=> {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let h = myDate.getHours(); //获取当前小时数(0-23)
        let m = myDate.getMinutes(); //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        //获取当前时间
        if(type=="date"){
          return `${conver(year)}-${conver(month)}-${conver(date)}`;
        }else if(type=="datetime"){
          return `${conver(year)}-${conver(month)}-${conver(date)} ${conver(h)}:${conver(m)}:${conver(s)}`;
        }else if(type=="time"){
          return `${conver(h)}:${conver(m)}:${conver(s)}`;
        }else if(type=="timestamp"){
          return myDate.getTime();
        }
        return `${conver(h)}:${conver(m)}:${conver(s)}`;
      })();
      //日期时间处理
      function conver(s) {
        return s < 10 ? "0" + s : s;
      }
    },
    // cutStyle,用于按钮点击后样式变化
    cutStyle(e) {
      let ele = e.target;
      if (ele.getAttribute("isClick") == "0") {
        ele.classList.add("btn-selected");
        ele.setAttribute("isClick", "1");
      } else {
        ele.classList.remove("btn-selected");
        ele.setAttribute("isClick", "0");
      }
    },
    // 
    handleScroll() {
      // console.log("aaaa:");
      // console.log(arguments);
    },
    // test
    test1(){
      console.log(this.areaReplayTime);
    },

  },
  created() {
    // //船舶搜索 kw为搜索关键字  ==》状态 21 ,没有权限
    // let link1 =
    //   "http://api.shipxy.com/apicall/QueryShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1&kw=4121&max=100";
    
    
    // //根据船的id搜索 ==》状态 21
    // let link2 ="http://api.shipxy.com/apicall/GetSingleShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1&id=412111383&idtype=0"; //新
    // let link2_1 =
    //   "http://api.shipxy.com/apdll/ap.dll?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1&cmd=2002&id=412111383&idtype=0&jsf=func"; //旧
    // //多船查询 ==》状态 21
    // let link3 =
    //   "http://api.shipxy.com/apicall/GetManyShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1&id=477765900,412370000";
    //某区域内的船信息查询， 成功
    // let link4 ="http://api.shipxy.com/apicall/GetAreaShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1&mode=0&scode=0&xy=122700000,37000000-123000000,37000000-123000000,36500000-122700000,36500000";
    // //船队船查询 状态 21
    // let link5 =
    //   "http://api.shipxy.com/apicall/GetFleetShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1";
    // 船轨迹查询 状态 21
    // let link6 =
    //   "http://api.shipxy.com/apicall/GetShipTrack?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=0&cut=1&id=412471439&btm=1393516800&etm=1394165100";
    // // h5,移动端 成功
    // let mobile1 =
    //   "http://api.shipxy.com/apicall/location?k=e38ef584670348ceae168fe5f3985fa4&kw=4124&tip=1&track=1&trackstart=1493013738&trackend=1493100138";
    // // 船舶靠港记录查询 状态 21
    // let history1 =
    //   "http://api.shipxy.com/apicall/GetPortOfCallByShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&mmsi=241285000&begin=1450410918&end=412111383&timetype=2";
    // // 船舶到离事件 状态 21
    // let history2 =
    //   "http://api.shipxy.com/APICall/UpdateShips?k=e38ef584670348ceae168fe5f3985fa4&mmsis=412469608,414900208";
    // //船舶挂靠当前状态 状态 21
    // let history3 =
    //   "http://api.shipxy.com/apicall/GetShipStatus?v=2&k=e38ef584670348ceae168fe5f3985fa4&mmsi=412469608&timetype=2";
    // axios.get(link2).then(response=>{
    //   console.dir(response);
    // }).catch(response=>{
    //   console.log(response)
    // })
  },
  beforeMount() {
    // 手动开启默认开启工具
    this.innerMapdata.openMeasure = true;
    this.innerMapdata.openArea = true;

    // 地图配置
    this.options = {
      ak: "e38ef584670348ceae168fe5f3985fa4",
      //初始中心点坐标
      centerPoint: [22.1304, 113.7287],
      //初始缩放级别
      zoom: this.mapNowRoom,
      // 最小缩放级别
      minZoom: 4,
      // 最大缩放级别
      maxZoom: 18,
      //
      gratings: { isShow: false },
      // 公司版权信息( 支持html )，默认Elane Inc.
      attribution: {
        isShow: false,
        emptyString:
          '&copy;2018 <a class="shipxy_small"></a>&nbsp;<a>Elane Inc.</a>'
      },
      // 测距控件
      measureCtrl: {
        // 是否开启测距控件，默认：true
        isShow: true,
        // 是否显示测距按钮，默认：true
        showMeasurementsMeasureControl: false,
        // 是否显示删除按钮，默认：true
        showMeasurementsClearControl: false,
        // 是否显示切换单位按钮，默认：true
        showUnitControl: false,
        position: "topleft"
      },
      //鼠标移动悬浮经纬度控件
      mousePostionCtrl: { isShow: true, position: "bottomright" },
      //缩放工具控件的显示隐藏
      zoomControlElane: { isShow: false, position: "topleft" },
      // 缩放级别显示控件
      zoomviewControl: { isShow: true, position: "topleft" },
      //地图切换控件的位置
      basemapsControl: { isShow: false, position: "bottomleft" },
      // 比例尺，控件
      scaleCtrl: { isShow: true, position: "bottomleft" }
    };
    setTimeout(() => {
      this.zoomTimer=setInterval(() => {
        this.mapNowRoom = this._map.getZoom();
      }, 200);
    }, 1000);

    // 将父级传入的参数保存到自己的对象上面
    this.innerMapData = this.mapdata;


  },
  mounted() {
    // 创建地图示例
    this._map = new ShipxyAPI.Map("map", this.options);
    this.initArea();//初始绘制三级警报区

    this.drawArea(this._map);
    this.drawLine(this._map);
    this.drawPoint(this._map);
    this.drawRoute(this._map);
    this.openShip(this._map);
    this.areaReplay(this._map);
    this.weather(this._map);
    this.showTool(this._map);
    this.drawWindmill(this._map);
    // 监控区域船函数
    this.monitor();

    // 获取canvas对象
    // this.canvas=$(this._map._mapPane).find(".canvas-ships")[0];
    this.canvas=$("#myCanvas")[0];
    this.heatmap=$("#heatmap")[0];
    // 初始化和监听两个面板的尺寸
     (()=>{
      let init=()=>{
        this.canvas.width=innerWidth;
        this.canvas.height=innerHeight;
        this.heatmap.style.width=innerWidth+"px";
        this.heatmap.style.height=innerHeight+"px";
      }
      init();
      addEventListener("resize",init);
    })();



    // setInterval(()=>{
    //   this.nowCheckedShip+="a";
    // },1000)

    // 监听（绑定）滚轮滚动事件
    // window.addEventListener("scroll", this.handleScroll, true);
    // 监听窗口大小改变
    // window.addEventListener("resize", ()=> {
    //     console.log("动画id:",this.particleAnimation,"是否开启：",this.openHaifeng);
    //     if(!!this.particleAnimation){
    //       console.log("海风已开启");
    //       cancelAnimationFrame(this.particleAnimation);
    //       this.openHaifeng=false;
    //       // this.particleAnimation=null;
    //     }else{
    //       console.log("海风未开启");
    //       return;
    //     }
    //     console.log(this.canvas)
    //     //   console.log("开启海风粒子动效")
    //     this.openWeatherCanvas();
    // });
    // 监听滚轮滚动
    // $(document).on('mousewheel DOMMouseScroll', onMouseScroll);
    // function onMouseScroll(e){
    //     e.preventDefault();
    //     var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    //     var delta = Math.max(-1, Math.min(1, wheel) );
    //     if(delta<0){//向下滚动
    //         console.log("向下滚动");
    //     }else{//向上滚动
    //         console.log("向下滚动");
    //     }
    // }
  },
  destroyed() {
    clearInterval(this.fcRotateTimer);
    clearInterval(this.zoomTimer);
    for(let i=0;i<this.watchShipTimer.length;i++){
      clearInterval(this.watchShipTimer[i]);
    }
    console.log("saeChart页面被销毁")
  },
  props: ["mapdata", "eye"]
};
</script>



<style lang='less' scoped>
@import "../../../../../assets/ship_system/less/seaChart.less";

.mapBox {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.my-map {
  height: 100%;
  overflow: hidden;
  outline: none;
  background-color: #a3ccff;
}

.div_btn input[type="button"] {
  cursor: pointer;
}

.count_span {
  color: red;
  background-color: #fff;
  text-align: left;
  width: 120px;
  font-weight: bolder;
  padding: 0 5px;
  border: 1px solid #000000;
}

.my_seach_ship_box {
  width: 380px;
  top: 10px;
  margin-left: 500px;
  z-index: 9999;
  position: absolute;
}

.thecan{
  >.aaa{
    background-color: #f00!important;
  }

}
</style>
