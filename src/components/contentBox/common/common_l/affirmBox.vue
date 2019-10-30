<!-- 
参数
show：[boolean],是否显示此框
headInfo：[string],头部信息
content: [string],提示的内容文字
type：[normal/error/warning],询问框的颜色（类型）
sureBtn：[string],确定按钮的文字
cancelBtn：[string],取消按钮的文字
 -->

<template>
    <div class="affirmBoxBg" v-show="show">
        <div :class="'affirmBox '+ type">
            <p class="ab-head" v-show="headInfo!=''">{{headInfo}}</p>
            <div class="ab-body">{{content}}</div>
            <div class="ab-foot">
                <span class="sure" @click.stop="affirmBack('sure')">{{sureBtn}}</span>
                <span class="cancel" @click.stop="affirmBack('cancel')">{{cancelBtn}}</span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'affirmBox',
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
        content:{default:'询问内容……'},
        type:{default:'normal'},
        sureBtn:{default:'确定'},
        cancelBtn:{default:'取消'}

    }
}
</script>


<style lang='less' scoped>
@typeC:rgb(74, 105, 243);
@errorC:rgb(236, 99, 99);
@warningC:rgb(231, 153, 52);
@typeBorderC:rgba(74, 105, 243, 0.3);
@errorBorderC:rgba(236, 99, 99, 0.3);
@warningBorderC:rgba(231, 153, 52, 0.3);
.affirmBoxBg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: #0003;
    z-index: 999;
}
.affirmBox{
    user-select: none;
    margin: 90px auto;
    padding: 0 16px;
    width: 360px;
    background-color: rgb(255, 255, 255);
    border-top: 16px solid @typeC;
    // border-bottom: 8px solid @typeC;
    border-radius: 16px;
    text-align: center;
    box-shadow: 2px 2px 5px rgb(201, 201, 201);
    >.ab-head{
        height: 36px;
        font-size: 18px;
        line-height: 36px;
        // background-color: @typeC;
        // color: #fff;
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
.error{
    border-top: 8px solid @errorC;
    border-bottom: 8px solid @errorC;
    >.ab-head{
        border-bottom: 1px dashed @errorBorderC;
    }
    >.ab-body{
        border-bottom: 1px dashed @errorBorderC;
    }
    >.ab-foot{
        >.sure{
            background-color: @errorC;
            color: #fff;
        }
        >.cancel{
            background-color: rgb(214, 214, 214);
            color: #000;
        }
    }
}
.warning{
    border-top: 8px solid @warningC;
    border-bottom: 8px solid @warningC;
    >.ab-head{
        border-bottom: 1px dashed @warningBorderC;
    }
    >.ab-body{
        border-bottom: 1px dashed @warningBorderC;
    }
    >.ab-foot{
        >.sure{
            background-color: @warningC;
            color: #fff;
        }
        >.cancel{
            background-color: rgb(214, 214, 214);
            color: #000;
        }
    }
}
</style>