<template>
  <div id="sidebar">
    <ul class="menu">
      <li
        class="nochild firstLi"
        v-for="item in lists.singleItem"
        len="0"
        :key="item.index"
        :label="item.index"
        @click.stop="openTheMenu($event,'nochild')"
        isopen="0"
      >
        <router-link :to="item.routerPath">
          <i :class="item.iconClass"></i>
          <span>{{item.name}}</span>
        </router-link>
      </li>
      <li
        class="haschild firstLi"
        v-for="item in lists.doubleItem"
        :key="item.index"
        :len="item.children.length"
        isopen="0"
      >
        <div @click.stop="openTheMenu($event,'haschild')">
          <i :class="item.iconClass"></i>
          <span>{{item.name}}</span>
          <i class="direct icon--"></i>
        </div>
        <ul class="childUl">
          <li
            class="childLi"
            v-for="child in item.children"
            :key="child.index"
            :label="child.index"
            @click.stop="openThechild($event)"
            isopen="0"
          >
            <router-link :to="child.routerPath">
              <i class="fa fa-circle"></i>
              <span>{{child.name}}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  data() {
    return {
      lists: {
        singleItem: [
          {
            index: "1",
            iconClass: "icon-32",
            name: "海图监管",
            routerPath: "/contentBox/chartManagement/shipManagerMent"
          },
          {
            index: "2",
            iconClass: "icon-1",
            name: "区域监管",
            routerPath: "/contentBox/chartManagement/shipManagerMent"
          },
          {
            index: "3",
            iconClass: "icon-9",
            name: "任务管理",
            routerPath: "/contentBox/task_management/taskList"
          },
          {
            index: "4",
            iconClass: "icon-17",
            name: "气象报告",
            routerPath: "/contentBox/weatherReport"
          }
        ],
        doubleItem: [
          {
            index: "5",
            iconClass: "icon-14",
            name: "用户管理",
            children: [
              {
                index: "5.1",
                name: "作业人员",
                routerPath: "/contentBox/userManagement/OperationPersonnel"
              },
              {
                index: "5.2",
                name: "岗位管理",
                routerPath: "/contentBox/userManagement/personTask"
              },
              {
                index: "5.3",
                name: "部门管理",
                routerPath: "/contentBox/userManagement/personGroup"
              }
            ]
          },
          {
            index: "6",
            iconClass: "icon-38",
            name: "监控管理",
            children: [
              {
                index: "6.1",
                name: "摄像头管理",
                routerPath: "/contentBox/monitoringManagement/cameraManagement"
              },
              {
                index: "6.2",
                name: "监控视频管理",
                routerPath:
                  "/contentBox/monitoringManagement/monitoringManagement"
              }
            ]
          },
          {
            index: "7",
            iconClass: "icon-29",
            name: "船舶管理",
            children: [
              {
                index: "7.1",
                name: "船舶列表",
                routerPath: "/contentBox/boat_list"
              },
              { index: "7.2",
                name: "船舶出海条件",
                routerPath: "/contentBox/sea_conditions" }
            ]
          },
          {
            index: "8",
            iconClass: "icon-27",
            name: "消息管理",
            children: [
              {
                index: "8.1",
                name: "发送消息",
                routerPath: "/contentBox/messageManagement/sendMessage"
              },
              {
                index: "8.2",
                name: "消息列表",
                routerPath: "/contentBox/messageManagement/getMessage"
              }
            ]
          },
          {
            index: "9",
            iconClass: "icon-36",
            name: "设备管理",
            children: [
              {
                index: "9.1",
                name: "设备列表",
                routerPath: "/contentBox/deviceManage/deviceList",
              },
              {
                index: "9.2",
                name: "打卡记录",
                routerPath: "/contentBox/deviceManage/censorNote",
              }
            ]
          },
        ]
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openTheMenu(e, type) {
      let ele = $(e.target).parents(".firstLi");
      let childNum = ele.attr("len");
      let isopen = ele.attr("isopen");

      if (type == "nochild") {
        //点击无子菜单的按钮
        if (!ele.hasClass("open")) {
          //点击的不是当显示的按钮
          //将所有haschild样式还原,所有nochild还原
          $(".direct").removeClass("redirect");
          $(".childLi")
            .removeClass("open")
            .attr("isopen", "0");
          $(".nochild")
            .removeClass("open")
            .attr("isopen", "0");
          $(".haschild")
            .css({ height: "40px" })
            .attr("isopen", "0")
            .removeClass("open preopen");
          if (isopen === "0") {
            ele.attr("isopen", "1").addClass("open");
          }
        }
      } else {
        //点击有子菜单的按钮
        if (ele.hasClass("open")) {
          if (isopen === "1") {
            ele
              .css({ height: "40px" })
              .attr("isopen", "0")
              .find(".direct")
              .addClass("redirect");
          } else {
            $('.preopen').css({'height':'40px'}).attr("isopen", "0").removeClass('preopen')
            ele.css({ height: 40 + childNum * 40 + "px" }).attr("isopen", "1").find(".direct").removeClass("redirect");
          }
        } else {
          if (isopen === "1") {
            ele
              .css({ height: "40px" })
              .attr("isopen", "0")
              .removeClass("preopen");
          } else {
            $(".open").find('.direct').addClass("redirect");
            $(".haschild").css({ height: "40px" }).attr("isopen", "0").removeClass("preopen");
            ele.css({ height: 40 + childNum * 40 + "px" }).attr("isopen", "1").addClass("preopen");
          }
        }
      }
    },
    openThechild(e) {
      let ele = $(e.target).parents(".childLi");
      let elep = ele.parents(".haschild");
      let childNum = elep.attr("len");
      let isopen = ele.attr("isopen");
      if (isopen === "0") {
        $(".childLi")
          .removeClass("open")
          .attr("isopen", "0");
        $(".nochild")
          .removeClass("open")
          .attr("isopen", "0");
        $(".haschild")
          .not(elep)
          .css({ height: "40px" })
          .attr("isopen", "0")
          .removeClass("open");
        ele.attr("isopen", "1").addClass("open");
        elep.css({ height: 40 + childNum * 40 + "px" }).addClass("open");
      }
    },
    // 遍历lists，获取当前url的路由地址对应的对象的index
    eachLists() {
      let routerUrl = this.$route.path;
      let sl=this.lists.singleItem;
      for (let i = 0; i < sl.length; i++) {
        if (sl[i].routerPath === routerUrl) {
          return sl[i].index;
        }
      }
      let dl=this.lists.doubleItem;
      for (let i = 0; i < this.lists.doubleItem.length; i++) {
        for (let j = 0; j < dl[i].children.length; j++) {
          if (dl[i].children[j].routerPath === routerUrl) {
            return dl[i].children[j].index;
          }
        }
      }
    },
    // 根据eachlists（）返回的值，与lists里的数据进行对比，将当前路由对应的菜单按钮突出
    checkRouter() {
      let singleDOMs = $(".firstLi");
      let doubleDOMs = $(".childLi");
      let theindex = this.eachLists();
      let isfind = false;
      singleDOMs.each((i, ele) => {
        if ($(ele).attr("label") === theindex) {
          $(ele).attr("isopen", "1").addClass("open");
          isfind = true;
          return false;
        }
      });
      if (!isfind) {
        doubleDOMs.each((i, ele) => {
          if ($(ele).attr("label") === theindex) {
            let elep = $(ele).parents(".haschild");
            let childNum = elep.attr("len");
            $(ele).attr("isopen", "1").addClass("open");
            elep.css({ height: 40 + childNum * 40 + "px" }).addClass("open");
            isfind = true;
            return false;
          }
        });
      }
      if (!isfind) {
        $(".menu>li:first-child").addClass("open").attr("isopen", "1");
      }
    }
  },
  mounted() {
    // 挂载后，初始化显示的按钮
    this.checkRouter();
  }
};
</script>

<style lang="less" scoped>
/*  侧边栏的样式*/
#sidebar {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 60px;
}

.menu {
  // margin-top: 60px;
  padding: 0;
  width: 100%;
  list-style: none;
  text-align: left;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  box-sizing: border-box;
  padding: 0 12px;
  overflow: hidden;
  ul {
    list-style: none;
    padding-left: 30px;
    font-size: 15px;
  }
  a {
    display: block;
    cursor: pointer;
    text-decoration: none;
    font-style: normal;
    color: #000;
  }
  > li {
    height: 40px;
    margin-top: 10px;
    line-height: 40px;
    overflow: hidden;
    transition: 0.3s;
    box-sizing: border-box;
  }
  .nochild {
    border-radius: 30px;
    > a {
      line-height: 40px;
      padding: 5px 20px;
      line-height: 30px;
      height: 30px;
      > i {
        font-size: 24px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    &:hover {
      background-color: #ccc;
    }
  }
  .haschild {
    > div {
      position: relative;
      padding: 5px 20px;
      height: 30px;
      line-height: 30px;
      box-sizing: bborder-box;
      transition: 0.3s;
      border-radius: 50px;
      > i:first-child {
        font-size: 24px;
        vertical-align: middle;
        margin-right: 10px;
      }
      > .direct {
        transform: rotate(0deg);
        display: inline-block;
        transition: 0.3s;
        position: absolute;
        right: 10px;
        top: 14px;
        color: rgb(143, 143, 143);
      }
      &:hover {
        background-color: #ccc;
      }
    }
    > ul {
      > li {
        height: 40px;
        > a {
          font-size: 14px;
          line-height: 40px;
          color: rgb(0, 0, 0);
          > i {
            font-size: 8px;
            vertical-align: middle;
            margin-right: 10px;
            color: #0002;
          }
          &:hover {
            color: rgb(95, 124, 226);
          }
        }
      }
      > .open {
        > a {
          color: rgb(95, 124, 226);
          > i {
            color: rgb(95, 124, 226);
          }
        }
      }
    }
  }
  > .preopen {
    > div {
      background-color: #eee !important;
      color: rgb(54, 54, 54);
      .direct {
        transform: rotate(180deg);
      }
    }
  }
  > .open {
    > div,
    > a {
      background-color: rgb(95, 124, 226) !important;
      color: #fff;
      .direct {
        transform: rotate(180deg);
        color: rgb(255, 255, 255);
      }
      .redirect {
        transform: rotate(90deg) !important;
      }
    }
  }
}

@media screen and (max-height: 700px) {
  #sidebar {
    margin-top: 30px;
  }
  .menu>li{
    margin-top: 4px;
  }
}
@media screen and (max-height: 640px) {
  #sidebar {
    margin-top: 20px;
  }
  .menu>li{
    margin-top: 2px;
  }
}


</style>
<style>
@import url("../../../assets/public/icomoon/style.css");
@font-face {
  font-family: "icomoon";
  src: url("../../../assets/public/icomoon/fonts/icomoon.eot");
  /* IE9*/
  src: url("../../../assets/public/icomoon/fonts/icomoon.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../../../assets/public/icomoon/fonts/icomoon.woff")
      format("woff"),
    /* chrome, firefox */
      url("../../../assets/public/icomoon/fonts/icomoon.ttf") format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url("../../../assets/public/icomoon/fonts/icomoon.svg#icomoon"); /* iOS 4.1- */
}
.icomoon {
  font-family: "icomoon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
