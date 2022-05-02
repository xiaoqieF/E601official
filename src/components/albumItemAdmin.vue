<template>
    <div class="album-item">
        <el-image :src="url"></el-image>
        <div class="album-title">
            喀纳斯秋绪
        </div>
        <div class="device">
            <span>设备：</span> <span>Mavic Air2</span>
        </div>
        <div class="views">
            <i class="iconfont icon-icon-test" style="color: #444"> 99 </i>
            <i class="iconfont icon-icon-test1 like">88</i>
        </div>
        <div class="album-author">
            <div>
                创建时间：<span class="album-time"> 2022-04-26</span>
            </div>
            <div>
                修改时间：<span class="album-time"> 2022-04-26</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "albumItemAdmin",
    data() {
        return {
            url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        }
    }
}
</script>

<style lang="less" scoped>
.album-item{
    margin: 10px 2px;
    width: 23%;
    font-size: 14px;
    line-height: 1.6;
    padding: 5px;
    border-radius: 0.2rem;
    border: 2px solid #409eff;
    cursor: pointer;
    .album-title{
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
</style>