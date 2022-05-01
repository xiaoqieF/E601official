<template>
    <div class="album-item">
        <el-image :src="url" :preview-src-list="srcList"></el-image>
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
                <el-avatar size="small" :src="avatarUrl"></el-avatar>
                <a href="#" style="display: inline-block; margin-left: 5px">小切</a>
            </div>
            <span class="album-time"> 2022-04-26</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "albumItem",
    data() {
        return {
            url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            srcList:[
                "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            ],
            avatarUrl: "https://xiaodongfan.com/images/profile.png"
        }
    }
}
</script>

<style lang="less" scoped>
.album-item{
    width: 23%;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 40px;
    padding: 5px;
    border-radius: 0.2rem;
    border: 1px solid #eee;
    .album-title{
        font-weight: 600;
    }
    .album-title:hover{
        color: #409eff;
        cursor: pointer;
    }
    .views{
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;
    }
    .like{
        cursor: pointer;
    }
    .like:hover{
        color: #409eff;
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