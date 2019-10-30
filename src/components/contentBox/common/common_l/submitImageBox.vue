<!--  -->

<template>
    <div class="fileBox">
        <div class="fileSubmit">
            <i :class="icon"></i>
            <span>{{hint}}</span>   
            <input class="image" type="file" multiple @change="putImageInWall($event)">
        </div>
        <div class="fileWall">

        </div>
    </div>
</template>


<script>
export default {
    name:'submitImageBox',
    data() {
        return {};
    },
    methods:{
        putImageInWall(e){
            $(".fileWall").empty();
            let imgs= e.target.files;
            for(let i=0;i<imgs.length;i++){
                let imgDOM=document.createElement("img");
                imgDOM.src = URL.createObjectURL(imgs[i]);
                $(imgDOM).css({"display":"inline-block","height":"100%","margin":"0 6px"});
                $(".fileWall").append(imgDOM);
            }
           this.$emit("back",imgs);
        }
    },
    props:{
        icon:{default:"fa fa-picture-o"},
        hint:{default:"上传"},
    }
}
</script>


<style lang='less' scoped>
.fileBox{
    display: inline-block;
    width: 100%;
    position: relative;
    font-size: 0;
    height: 30px;
    >div{
        font-size: 16px;
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
    }
    >.fileSubmit{
        position: relative;
        height: 100%;
        padding: 0 6px;
        width: 80px;
        overflow: hidden;
        color: #0008;
        >*{
            vertical-align: middle;
        }
        >i{
            display: inline-block;
            width: 32px;
            text-align: center;
            font-size: 24px;
            cursor: pointer;
        }
        >span{
            font-size: 14px;
        }
        >input{
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }
        &:hover{
            >i{
                color: rgba(55, 118, 253, 0.733);
            }
        }
    }
    >.fileWall{
        padding: 0 6px;
        position: relative;
        height: 100%;
        width: calc(100% - 80px);
        overflow-x: scroll;
    }
}
</style>