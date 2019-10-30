<!-- 搜索框组件 （基础，不可分）-->
<template>
  <div :class="{'searchbox':true,'border':border=='close'?false:true}" :style="'background-color:'+bgcolor">
    <input type="text" value="默认值" v-model="text" :placeholder="hint" @change="back">
    <i :class="classname" aria-hidden="true" @click="clickBack"></i>
  </div>
</template>

<script>

export default {
  name:"searchBox",
  data () {
    return {
      text:''
    };
  },
  methods:{
    back(){
      this.$emit("back",this.text);
    },
    clickBack(){
      this.$emit("clickBack",this.text);
    }
  },
  props:{
    hint:{default:'请输入信息'},
    classname:{default:'fa fa-search'},
    bgcolor:{default:"#fff"},
    border:{default:"close"}
  }
}


</script>

<style lang='less' scoped>
@placehoder-color:rgb(187, 187, 187);
@searchbox-height:30px;
.searchbox{
  position: relative;
  display: flex;
  border-radius: 30px;
  line-height: @searchbox-height;
  height: @searchbox-height;
  padding: 1px 4px 1px 8px;
  background-color: #fff;
  min-width: 180px;
  transition: 0.3s;
  >input{
    flex: 1;
    border: 0;
    outline: 0;
    background-color: #fff0;
    height: @searchbox-height;
    color: rgb(121, 121, 121);
    &::-webkit-input-placeholder{
      color: @placehoder-color;
    }
  }
  // >span{
  //   width: 18px;
  //   text-align: center;
  //   cursor: pointer;
  //   height: 18px;
  //   border-radius: 50%;
  //   line-height: 18px;
  //   position: absolute;
  //   left: -20px;
  //   top: 8px;
  //   color: #fff;
  //   transition-delay: 0.3s;
  //   background-color: rgb(216, 216, 216);
  //   visibility: hidden;
  //   opacity: 0;
  // }
  >i{
    width: 24px;
    margin-top: 5px;
    margin-left: 6px;
    font-size: 20px;
    cursor: pointer;
    color: @placehoder-color;
    transition: 0.3s;
    &:hover{
      color:rgb(95, 124, 226);
      // transform: rotate(6deg);
    }
  }
  >.hide{
    display: none;
  }
  // &:hover{
  //   >.empty{
  //     display: block;
  //     visibility: visible;
  //     opacity: 1;
  //   }
  // }
}
.border{
  border: 1px solid #ccc;
  &:hover{
    border: 1px solid rgb(155, 155, 155);
  }
  &:focus{
    border: 1px solid rgb(57, 76, 248);
  }
}
</style>
