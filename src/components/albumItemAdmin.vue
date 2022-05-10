<template>
    <div class="album-item" :class="highlight ? 'blue-border' : ''">
        <div class="cover">
            <el-image :src="url" fit="cover"></el-image>
        </div>
        <div class="album-title">
            {{albumInfo.title}}
        </div>
        <div class="device">
            <span>设备：</span> <span>{{albumInfo.device}}</span>
        </div>
        <!--<div class="views">-->
        <!--    <i class="iconfont icon-icon-test" style="color: #444"> {{ albumInfo.views }} </i>-->
        <!--    <i class="iconfont icon-icon-test1 like">{{ albumInfo.like }}</i>-->
        <!--</div>-->
        <div class="description">
            <span>简介：</span>{{albumInfo.description}}
        </div>
        <div class="album-author">
            <div>
                创建：<span class="album-time"> {{albumInfo.createTime | dateFormat2}}</span>
            </div>
            <div>
                修改：<span class="album-time"> {{albumInfo.updateTime | dateFormat2}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Album from "@/page/album";
export default {
    name: "albumItemAdmin",
    components: {Album},
    props: ["albumInfo", "highlight"],
    data() {
        return {
            url: this.albumInfo.urls.split(' ')[0],
        }
    }
}
</script>

<style lang="less" scoped>
.cover{
    height: 200px;
    overflow: hidden;
}
.el-image{
    width: 100%;
    height: 100%;
}
.blue-border{
    border: 2px solid #409eff !important;
}
.album-item{
    margin: 10px 2px;
    width: 22%;
    font-size: 14px;
    line-height: 1.6;
    padding: 10px;
    border-radius: 0.2rem;
    border: 2px solid #eee;
    cursor: pointer;
    .album-title{
        margin-top: 10px;
        font-weight: 600;
    }
    .views{
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;
    }
    .album-author{
        padding-top: 5px;
        display: flex;
        font-size: 12px;
        align-items: center;
        justify-content: space-between;
    }
    .album-author div{
        display: flex;
        align-items: center;
    }
    .device, .album-time{
        font-size: 12px;
        color: #888;
    }

}
.album-item:hover{
    box-shadow: 0 0 8px 4px rgba(193, 168, 168, 0.29);
}
</style>