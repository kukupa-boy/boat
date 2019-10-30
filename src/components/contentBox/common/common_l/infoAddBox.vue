<!-- 
参数
show：[boolean],是否显示此框
headInfo：[string],头部信息
//(已移除) type：[normal/error/warning],询问框的颜色（类型）
sureBtn：[string],确定按钮的文字
cancelBtn：[string],取消按钮的文字

solt插槽插入

 -->
<template>
    <div class="bulletBoxBg" v-if="show">
        <div class="bulletBox">
            <p class="ab-head" v-show="headInfo!=''">{{headInfo}}</p>
            <div class="ab-body">
                <slot name="content"></slot>
            </div>
            <div class="ab-foot">
                <span class="sure" @click.stop="affirmBack('sure')">{{sureInfo}}</span>
                <span class="cancel" @click.stop="affirmBack('cancel')">{{cancelInfo}}</span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'infoAddBox',
    data() {
        return {};
    },
    methods:{
        affirmBack(res){
            this.$emit("back",res);
        }
    },
    props:{
        show:{default:false},
        headInfo:{default:''},
        sureInfo:{default:'确定'},
        cancelInfo:{default:'取消'}
    }
}
</script>


<style lang='less' scoped>
@typeC:rgb(74, 105, 243);
@errorC:rgb(236, 99, 99);
@warningC:rgb(231, 153, 52);
@typeBorderC:rgba(74, 105, 243, 0.3);
@errorBorderC:rgba(236, 99, 99, 0.3);
@warningBorderC:rgba(231, 153, 52, 0.3  );

.bulletBoxBg{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: #0003;
    z-index: 999;
}
.bulletBox{
    // user-select: none;
    margin: 0 auto;
    margin-top: 120px;
    width: 40%;
    min-width: 360px;
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    text-align: center;
    overflow: hidden;
    box-shadow: 2px 2px 5px rgb(201, 201, 201);
    >.ab-head{
        height: 46px;
        font-size: 16px;
        line-height: 46px;
        letter-spacing: 3px;
        background-color: @typeC;
        color: #fff;
        border-bottom: 1px dashed @typeBorderC;
    }
    >.ab-body{
        padding: 16px 0;
        line-height: 24px;
        border-bottom: 1px dashed @typeBorderC;
    }
    >.ab-foot{
        height: 60px;
        line-height: 60px;
        >span{
            display: inline-block;
            height:30px;
            line-height: 30px;
            border-radius: 15px;
            padding: 0 16px;
            cursor: pointer;
            user-select: none;
            margin: 0 56px;
            &:hover{
                opacity: 0.9;
            }
        }
        >.sure{
            background-color: @typeC;
            color: #fff;
        }
        >.cancel{
            background-color: rgb(214, 214, 214);
            color: #000;
        }
    }
}
@media screen and (max-height:840px) {
    .bulletBox{
        margin-top: 80px;
    }
}
@media screen and (max-height:740px) {
    .bulletBox{
        margin-top: 30px;
    }
}
</style>