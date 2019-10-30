<!--  -->
<template>
  <div class="mapBox">
    <div id="map" class="my-map">
      <div class="ls">
        <!-- 区域船查询 -->
        <button @click.stop="test1" style="opacity:0.3">测试</button>
      </div>

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
        <br />

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

          <div :class="{'map-line':true,'open':mapDraw.line}">
            <div class="map-info map-line-info">
              <i
                :class="{'fa':true,'fa-angle-double-right':true,'i-open':mapDraw.line}"
                @click="mapDraw.line=!mapDraw.line"
              ></i>
              <!-- <i :class="{'fa':true,'fa-arrows':true,'i-open':mapDraw.line}" @click="mapDraw.line=!mapDraw.line"></i> -->
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
              <!-- <i :class="{'fa':true,'fa-dot-circle-o':true,'i-open':mapDraw.point}" @click="mapDraw.point=!mapDraw.point"></i> -->
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
          </div>
        </div>
        <br />

        <!-- 区域回放-->
        <div class="map-areaplay" v-show="innerMapdata.openplayback">
          <p id="btn_areaplay" @click.stop="cutStyle($event)" isClick="0">区域回放</p>
        </div>
        <br />

        <!-- 气象 -->
        <div class="map-weather" v-show="innerMapdata.openWeather">
          <p
            id="btn_qiwen"
            class="btn_weather qiwen"
            title="气温"
            @click.stop="cutStyle($event)"
            isClick="0"
          >气温</p>
          <p
            id="btn_qiya"
            class="btn_weather qiya"
            title="气压"
            @click.stop="cutStyle($event)"
            isClick="0"
          >气压</p>
          <p
            id="btn_haifeng"
            class="btn_weather haifeng"
            title="海风"
            @click.stop="cutStyle($event)"
            isClick="0"
          >海风</p>
          <p
            id="btn_taifeng"
            class="btn_weather taifeng"
            title="台风"
            @click.stop="cutStyle($event)"
            isClick="0"
          >台风</p>
          <p
            id="btn_fengchang"
            class="btn_weather fengchang"
            title="风场"
            @click.stop="cutStyle($event)"
            isClick="0"
          >风场</p>
          <p
            id="btn_hailang"
            class="btn_weather hailang"
            title="海浪"
            @click.stop="cutStyle($event)"
            isClick="0"
          >海浪</p>
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
          <p id="btn_haiqu" @click.stop="cutStyle($event)" isClick="0">海区</p>
          <p id="btn_jingji" @click.stop="cutStyle($event)" isClick="0">经济</p>
          <p id="btn_port" @click.stop="cutStyle($event)" isClick="0">港口</p>
          <p id="btn_guangshan" @click.stop="cutStyle($event)" isClick="0">光栅</p>
          <p id="btn_areatime" @click.stop="cutStyle($event)" isClick="0">时区</p>
          <p id="btn_paifang" @click.stop="cutStyle($event)" isClick="0">排放</p>
          <p id="btn_paifang_china" @click.stop="cutStyle($event)" isClick="0">排放(中国)</p>
          <p id="btn_latlnggrid" @click.stop="cutStyle($event)" isClick="0">经纬度网格</p>
        </div>
        <br />

        <!-- 注释本行后，开关失效，原因未知 -->
        <p style="display:none">{{eye}}</p>
      </div>

      <div>
        <!-- <label>当前船舶数：</label> -->
        <span id="txt_drawships_count"></span>
      </div>

      <div class="changeMap">
        <div
          :class="{'nowShow':nowShowMapType==3}"
          mytype="weixing"
          @click.stop="changeMapType('weixing')"
        >
          <span>卫星</span>
          <img src="../../../assets/ship_system/image/image_l/map_wx.png" />
        </div>
        <div
          :class="{'nowShow':nowShowMapType==2}"
          mytype="ditu"
          @click.stop="changeMapType('ditu')"
        >
          <span>地图</span>
          <img src="../../../../assets/ship_system/image/image_l/map_dt.png" />
        </div>
        <div
          :class="{'nowShow':nowShowMapType==1}"
          mytype="haitu"
          @click.stop="changeMapType('haitu')"
        >
          <span>海图</span>
          <img src="../../../../assets/ship_system/image/image_l/map_ht.png" />
        </div>
      </div>
    </div>
    <!-- <div id="my_seach_ship_box" class="my_seach_ship_box"></div> -->
    <!-- 提示信息的容器 -->
    <!-- <div class="hintBox">
      <hintBox content="这里是提示信息的内容！"></hintBox>
    </div> -->
    <!-- 监视信息面板 -->
    <div class="watchPanel">
      <div class="wp-numPanel">
        <div class="wp-danger">
          <p>
            <span class="wp-update">[{{dangerUpdate}}]</span>
            <span class="wp-shipNum">一级危险区：{{dangerShipNum}} （艘） </span>
            <!-- <span class="wp-more">查看</span> -->
          </p>
        </div>

        <div class="wp-warning">
          <p>
            <span class="wp-update">[{{warningUpdate}}]</span>
            <span class="wp-shipNum">二级预警区：{{warningShipNum}} （艘）</span>
            <!-- <span class="wp-more">查看</span> -->
          </p>
        </div>

        <div class="wp-oversee">
          <p>
            <span class="wp-update">[{{overseeUpdate}}]</span>
            <span class="wp-shipNum">三级监视区：{{overseeShipNum}} （艘）</span>
            <!-- <span class="wp-more">查看</span> -->
          </p>
        </div>
      </div>
      <div class="wp-infoPanel">
        <div>
          <p v-if="allShipHistory.length==0" class="isEmpty">暂无数据</p>
          <p v-for="(item,i) in allShipHistory" :key="i">
            <span>[{{item.changeTime}}]</span>
            <span class="a_mmsi" :mmsi="item.ShipID">({{item.name}})</span>
            <span>{{item.changeType=="enter"?"进入了":"离开了"}}</span>
            <span :style="'color:'+item.areaLevel==1?'red':'orange'">{{item.areaLevel==1?"一级危险区":item.areaLevel==2?"二级警戒区":"三级监视区"}}</span>
            <!-- +item.areaLevel==1?'red':'#333' -->
          </p>
        </div>

        <!-- <div class="wp-danger">
          <div v-if="dangerEnter.length">
            <p>进入一级危险区的船</p>
            <span class="a_mmsi" v-for="(item,i) in dangerEnter" :key="i" :mmsi="item.ShipID">{{item.callsign?item.callsign:item.mmsi}}</span>
          </div>
          <div v-if="dangerLeave.length">
            <p>离开一级危险区的船</p>
            <span class="a_mmsi" v-for="(item,i) in dangerLeave" :key="i" :mmsi="item.ShipID">{{item.callsign?item.callsign:item.mmsi}}</span>
          </div>
        </div>

        <div class="wp-warning">
          <div v-if="warningEnter.length">
            <p>进入二级预警区的船</p>
            <span class="a_mmsi" v-for="(item,i) in warningEnter" :key="i" :mmsi="item.ShipID">{{item.callsign?item.callsign:item.mmsi}}</span>
          </div>
          <div v-if="warningLeave.length">
            <p>离开二级预警区的船</p>
            <span class="a_mmsi" v-for="(item,i) in warningLeave" :key="i" :mmsi="item.ShipID">{{item.callsign?item.callsign:item.mmsi}}</span>
          </div>
        </div>

        <div class="wp-oversee">
          <div v-if="overseeEnter.length">
            <p>进入三级监视区的船</p>
            <span class="a_mmsi" v-for="(item,i) in overseeEnter" :key="i" :mmsi="item.ShipID">{{item.callsign?item.callsign:item.mmsi}}</span>
          </div>
          <div v-if="overseeLeave.length">
            <p>离开三级监视区的船</p>
            <span class="a_mmsi" v-for="(item,i) in overseeLeave" :key="i" :mmsi="item.ShipID">{{item.callsign?item.callsign:item.mmsi}}</span>
          </div>
        </div> -->

      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import hintBox from "../../common/common_l/hintBox";
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
      mapDraw: {
        area: false,
        point: false,
        line: false
      },
      // 风车旋转的相关参数
      marker: [],
      magnification: 0.4, //初始风车缩放倍数
      fcRotateTimers: [], //风车旋转 计时器容器，组件销毁后 记得清除
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
      watchShipTimer: [], //刷新船只进出情况的timer数组
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
      pointCan: []
      //--end

      // test 测试使用的数据，可删除
      // test1: 0,
      //--end
    };
  },
  watch: {
    // 监听eye的变化，以达到更新mapdata的目的
    eye(n, o) {
      console.log("更新！");
      this.innerMapdata = this.mapdata;
    },
    mapNowRoom(n, o) {
      // console.log(`缩放比例由 ${o} 变到了 ${n} !!!`);
      this.showWindMill(n);
    }
  },
  components: {
    hintBox: hintBox
  },
  methods: {
    // 此函数用于创建平面区域
    drawArea(_map) {
      // 添加标记
      let dangerArea = this.dangerCan;
      let warningArea = this.warningCan;
      let overseeArea = this.overseeCan;
      setTimeout(() => {
        let polyline = ShipxyAPI.polygon(dangerArea, {
          color: "rgba(255,0,0,0.7)"
        }).addTo(_map);
        let polyline2 = ShipxyAPI.polygon(warningArea, {
          color: "rgba(255, 100, 0, 0.5)"
        }).addTo(_map);
        let polyline3 = ShipxyAPI.polygon(overseeArea, {
          color: "rgba(255, 200, 0, 0.5)"
        }).addTo(_map);
      }, 1000);

      var draw_shape;
      var draw_layer;
      // 自定义按钮-添加标注
      $("#btn_add").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_shape) {
          // 编辑模式
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          // console.log("绘制完成：可以通过：draw_layer.getLatLng()，1获取点集：");
          _map.Draw.edit(draw_layer);
        } else {
          draw_shape = _map.Draw.begin({
            shape: "Poly"
          });
          console.log("pm:create：draw_shape,", draw_shape);
          _map.on("pm:create", function() {
            if (!!draw_shape) {
              _map.Draw.end(draw_shape);
            }
            if (!draw_layer) {
              draw_layer = _map.Draw.getLayer(draw_shape);
            }
            // console.log("绘制完成：可以通过：draw_layer.getLatLng()，2获取点集：");
            // 编辑模式
            _map.Draw.edit(draw_layer, false);
            draw_layer.on("pm:edit", function() {
              // console.log("绘制完成：可以通过：draw_layer.getLatLngs()，3获取点集：");
            });
          });
        }
      });
      // 完成标注
      $("#btn_end").on("click", e => {
        e.stopPropagation();
        if (!!draw_shape) {
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          _map.Draw.cancelEdit(draw_layer);
        }
        // 绘制完成，点击确定后，将绘制的点保存到areacan中
        this.areaCan = this.dealLatlng(draw_layer.getLatLngs()[0], "O-B");
        console.log(JSON.stringify(this.areaCan));
      });

      // 清除标注
      $("#btn_del").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_layer) {
          draw_layer.remove();
        }
        draw_layer = null;
        draw_shape = null;
      });
    },
    drawLine(_map) {
      var draw_shape;
      var draw_layer;
      // 自定义按钮-添加标注
      $("#btn_add_line").on("click", function(e) {
        console.log(draw_shape);
        e.stopPropagation();
        if (!!draw_shape) {
          // 编辑模式
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          console.log(
            "绘制完成：可以通过：draw_layer.getLatLng()，1获取点集：",
            draw_layer.getLatLngs()
          );
          _map.Draw.edit(draw_layer);
        } else {
          draw_shape = _map.Draw.begin({
            shape: "Line"
          });
          console.log("pm:create：draw_shape,", draw_shape);
          _map.on("pm:create", function() {
            if (!!draw_shape) {
              _map.Draw.end(draw_shape);
            }
            if (!draw_layer) {
              draw_layer = _map.Draw.getLayer(draw_shape);
            }
            console.log(
              "绘制完成：可以通过：draw_layer.getLatLng()，2获取点集：",
              draw_layer.getLatLngs()
            );

            // 编辑模式
            _map.Draw.edit(draw_layer, false);
            draw_layer.on("pm:edit", function() {
              console.log(
                "绘制完成：可以通过：draw_layer.getLatLngs()，3获取点集：",
                draw_layer.getLatLngs()
              );
            });
          });
        }
      });
      // 自定义按钮-添加标注
      $("#btn_end_line").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_shape) {
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          _map.Draw.cancelEdit(draw_layer);
        }
      });
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
      let mm;
      let draw_shape;
      let draw_layer;
      // 自定义按钮-添加标注
      $("#btn_add_point").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_shape) {
          // 编辑模式
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          console.log(
            "绘制完成：可以通过：draw_layer.getLatLng()，1获取点集：",
            draw_layer.getLatLng()
          );
          _map.Draw.edit(draw_layer);
        } else {
          draw_shape = _map.Draw.begin({
            shape: "Marker"
          });
          console.log("pm:create：draw_shape,", draw_shape);
          _map.on("pm:create", function() {
            if (!!draw_shape) {
              _map.Draw.end(draw_shape);
            }
            if (!draw_layer) {
              draw_layer = _map.Draw.getLayer(draw_shape);
            }
            console.log(
              "绘制完成：可以通过：draw_layer.getLatLng()，2获取点集：",
              draw_layer.getLatLng()
            );

            // 编辑模式
            _map.Draw.edit(draw_layer, false);
            draw_layer.on("pm:edit", function() {
              console.log(
                "绘制完成：可以通过：draw_layer.getLatLngs()，3获取点集：",
                draw_layer.getLatLng()
              );
            });
          });
        }
      });
      // 自定义按钮-完成
      $("#btn_end_point").on("click", function(e) {
        e.stopPropagation();
        if (!!draw_shape) {
          if (!draw_layer) {
            draw_layer = _map.Draw.getLayer(draw_shape);
          }
          _map.Draw.cancelEdit(draw_layer);
        }
      });
      // 自定义按钮-删除
      $("#btn_del_point").on("click", function(e) {
        e.stopPropagation();
        // 普通marker
        if (!!mm) {
          mm.remove();
        }
        // 可编辑的marker
        if (!!draw_layer) {
          draw_layer.remove();
          draw_layer = null;
        }
        if (!!draw_shape) {
          // _map.removeLayer(draw_shape);
          draw_shape = null;
        }

        draw_layer = null;
        draw_shape = null;
      });
    },

    // 此函数用于开启船视图
    openShip(_map) {
      // 开启区域船服务
      let canvasShips = ShipxyAPI.ShipService(_map, {
        enableAreaShip: true, // 区域船
        enableFleetShip: true // 船队船
      });
      canvasShips.addSelectedListener(function(ship) {
        // 选中船监听
        console.log(ship);
      });

      // 船舶定位
      $(".watchPanel").on("click", ".a_mmsi", function(e) {
        e.stopPropagation();
        let mmsi = $(this).attr("mmsi");
        if (mmsi.length > 0) {
          //
          let ship = _map.shipsService.locationShip(mmsi, true);
          let html = "";
          if (ship === null) {
            //没有查询的船
            console.log("没找到船");
            return;
          } else {
            html += `
            <div  class='box'>
              <div class='title'>船名：${ship.name}</div>
              <div class='field'>呼号：${ship.callsign}</div>
              <div class='field'>IMO：${ship.imo}</div>
              <div class='field'>MMSI：${ship.mmsi}</div>
              <div class='field'>船长：${ship["length"]}米</div>
              <div class='field'>船宽：${ship.width}米</div>
              <div class='field'>吃水：${ship.draught}米</div>
              <div class='field'>航速：${CommUtils.getNumber(
                ship.sog,
                0
              )}节</div>
              <div class='field'>船首向：${CommUtils.getNumber(
                ship.hdg,
                1
              )}度</div>
              <div class='field'>航迹向：${CommUtils.getNumber(
                ship.cog,
                1
              )}度</div>
              <div class='field'>经纬度：${CanvasShipUtils.latlngFormatter([
                ship.lat,
                ship.lng
              ])}</div>
              <div class='field'>类型：${CanvasShipUtils.getNewShipTypeCN(
                ship
              )}</div>
              <div class='field'>航行状态：${CanvasShipUtils.getDisValue(
                ship.navistatus,
                "naviStatus",
                "zh_CN"
              )}</div>
              <div class='field'>更新时间：${CommUtils.dataFormat(
                new Date(ship.lastdyn * 1000),
                "yyyy-MM-dd hh:mm:ss"
              )}</div>
            </div>`;
          }
          _map.openPopup(html, ShipxyAPI.latLng(ship.lat, ship.lng), {
            className: "shipxy_popup"
          });
        }
      });
    },

    // 区域回放
    areaReplay(_map) {
      // 区域回放
      $("#btn_areaplay").on("click", function() {
        // 区域船服务注掉了（不能同时使用）
        var areaPlayService = L.areaPlayService(_map, {
          areaId: "97975E4B-26D6-4AA4-8FD3-48DB2CE683A1",
          // area: "122625274,37221580,123137512,37219393,123127899,37354876,123037261,37505368,122666473,37397437",
          // minTime: 1537479780,
          // maxTime: 1537499780,
          // areaId: "",
          area:
            "113699700,22146300,113737200,22182600,113764600,22115800,113694300,22085400",
          minTime: 1538679780,
          maxTime: 1538692780
        });
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
      $("#btn_qiwen").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.weatherService.hideTempTile();
        } else {
          $(this).attr("is_show", "1");
          $("#btn_qiya").attr("is_show", "0");
          // 显示
          _map.weatherService.showTempTile(
            CanvasShipUtils.dataFormat(new Date(), "yyyy-MM-dd") + " 20:00:00"
          );
        }
        setActive($(this));
      });
      // 气压
      $("#btn_qiya").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.weatherService.hidePressureTile();
        } else {
          $(this).attr("is_show", "1");
          $("#btn_qiwen").attr("is_show", "0");
          // 显示
          _map.weatherService.showPressureTile(
            CanvasShipUtils.dataFormat(new Date(), "yyyy-MM-dd") + " 20:00:00"
          );
        }
        setActive($(this));
      });
      // 海风
      $("#btn_haifeng").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.weatherService.hideSeaBreezes();
        } else {
          $(this).attr("is_show", "1");
          var yubao_date =
            CanvasShipUtils.dataFormat(new Date(), "yyyy-MM-dd") + " 20:00:00";
          // 显示
          _map.weatherService.showSeaBreezes(yubao_date);
        }
        setActive($(this));
      });
      // 海浪
      $("#btn_hailang").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.weatherService.hideSeaWaves();
        } else {
          $(this).attr("is_show", "1");
          // 显示
          _map.weatherService.showSeaWaves(
            CanvasShipUtils.dataFormat(new Date(), "yyyy-MM-dd") + " 20:00:00"
          );
        }
        //        CanvasShipUtils.closeLoadingPopup();
        setActive($(this));
      });
      // 风场
      $("#btn_fengchang").on("click", function(e) {
        e.stopPropagation();
        if ($(this).attr("is_show") != null && $(this).attr("is_show") == "1") {
          $(this).attr("is_show", "0");
          _map.weatherService.hideWindFiel();
        } else {
          $(this).attr("is_show", "1");
          var yubao_date =
            CanvasShipUtils.dataFormat(new Date(), "yyyy-MM-dd") + " 20:00:00";
          //yubao_date = "2018-06-19 14:00:00";
          // 显示
          _map.weatherService.showWindFiel(yubao_date);
        }
        setActive($(this));
      });
      // 海区预报
      $("#btn_haiquyubao").on("click", function(e) {
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
      $("#btn_taifeng").on("click", function(e) {
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
      $("#btn_chaoxi").on("click", function(e) {
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
        iconUrl: "./static/img/fc.png",
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
          this.marker[
            i
          ]._icon.style.transform = `${this.locs[i]} rotate(${this.initRange}deg) scale(${this.magnification})`;
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
          this.magnification = 0.7;
          this.openInterval();
          return;
        } else if (nowZoom >= 17) {
          clearInterval(this.fcRotateTimer);
          this.magnification = 1.2;
          this.openInterval();
          return;
        } else {
          clearInterval(this.fcRotateTimer);
          this.magnification = 0.4;
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

    // test
    test1(){
      console.log("进入危险区",this.dangerEnterHistory);
      console.log("进入预警区",this.warningEnterHistory);
      console.log("进入监控区",this.overseeEnterHistory);

      console.log("离开危险区",this.dangerLeaveHistory);
      console.log("离开预警区",this.warningLeaveHistory);
      console.log("离开监控区",this.overseeLeaveHistory);
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
        for (let j = 0; j < newShips.length; j++) {
          if (oldShips[i].ShipID == newShips[j].ShipID) {
            oldShips.splice(i, 1);
            newShips.splice(j, 1);
            i--;
            break;
          }else{//为进入和离开的船加上离开或进入的时间
            newShips[j].changeTime=this.nowTime();
            newShips[j].changeType="enter";
            newShips[j].areaLevel=areaLevel;
            if(j==newShips.length-1){
              oldShips[i].changeTime=this.nowTime();
              oldShips[i].changeType="leave";
              oldShips[i].areaLevel=areaLevel;
            }
          }
        }
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
        }else{
          return `${conver(h)}:${conver(m)}:${conver(s)}`;
        }

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

    handleScroll() {
      // console.log("aaaa:");
      // console.log(arguments);
    }
  },
  created() {
    // //船舶搜索 kw为搜索关键字  ==》状态 21 ,没有权限
    // let link1 =
    //   "http://api.shipxy.com/apicall/QueryShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1&kw=4121&max=100";
    // //根据船的id搜索 ==》状态 21
    // let link2 =
    //   "http://api.shipxy.com/apicall/GetSingleShip?v=2&k=e38ef584670348ceae168fe5f3985fa4&enc=1&id=412111383&idtype=0"; //新
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
    // // 船轨迹查询 状态 21
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
    // axios.get(link4).then(response=>{
    //   console.dir("success");
    //   console.dir(response);
    // }).catch(response=>{
    //   console.log("error",response)
    // })
  },
  beforeMount() {
    // 手动开启默认开启工具
    this.innerMapdata.openMeasure = true;

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
    setInterval(() => {
      this.mapNowRoom = this._map.getZoom();
    }, 200);
    // 将父级传入的参数保存到自己的对象上面
    this.innerMapData = this.mapdata;
  },
  mounted() {
    // 创建地图示例
    this._map = new ShipxyAPI.Map("map", this.options);
    this.drawArea(this._map);
    this.drawLine(this._map);
    this.drawPoint(this._map);
    this.openShip(this._map);
    this.areaReplay(this._map);
    this.weather(this._map);
    this.showTool(this._map);
    this.drawWindmill(this._map);

    // 监控区域船函数
    this.monitor();

    // 监听（绑定）滚轮滚动事件
    // window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    clearInterval(this.fcRotateTimer);
  },
  props: ["mapdata", "eye"]
};
</script>



<style lang='less' scoped>
@import "./seaChart.less";
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
</style>
