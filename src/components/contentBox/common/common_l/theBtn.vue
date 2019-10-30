<!-- 按钮组件 -->
<!-- 参数
content：按钮文字
type：按钮类型（即按钮颜色）

 -->

<template>
    <div class="btn" :style="'backgroundColor:'+typeColor+';color:#fff;'">
        <span class="content">{{btnContent}}</span>
    </div>
</template>


<script>
export default {
    name:'theBtn',
    data() {
        return {
            typeColor:"",
            btnContent:"按钮",
        };
    },
    mounted(){
        switch(this.type){
            case "normal":this.typeColor="rgb(95, 124, 226)";break;
            case "warning":this.typeColor="rgb(234, 161, 0)";break;
            case "success":this.typeColor="rgb(70, 185, 45)";break;
            case "error":this.typeColor="rgb(239, 92, 92)";break;
            default:this.typeColor=this.type;
        }
        if(this.content){
            this.btnContent=this.content
        }
    },
    props:{
        content:{default:"按钮"},
        type:{default:"normal"}
    }
}
</script>


<style lang='less' scoped>
.btn{
    display: inline-block;
    font-size: 16px;
    height: 24px;
    line-height: 24px;
    padding: 4px 8px;
    border-radius: 16px;
    cursor: pointer;
    user-select: none;
    &:active{
        opacity: 0.9;
    }
}
</style>