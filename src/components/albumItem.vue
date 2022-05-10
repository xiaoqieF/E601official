<template>
    <div class="album-item">
        <div class="cover">
            <el-image fit="cover" :src="previewUrls[0]" :preview-src-list="previewUrls"></el-image>
        </div>

        <div class="album-title">
            {{albumInfo.title}}
        </div>
        <div class="device">
            <span>设备：</span> <span>{{albumInfo.device}}</span>
        </div>
        <!--<div class="views">-->
        <!--    <i class="iconfont icon-icon-test" style="color: #444"> {{albumInfo.views}} </i>-->
        <!--    <i class="iconfont icon-icon-test1 like">{{albumInfo.like}}</i>-->
        <!--</div>-->
        <div class="description">
            <span>简介：</span>{{albumInfo.description}}
        </div>
        <div class="album-author">
            <div>
                <el-avatar size="small" :src="albumInfo.user.avatar"></el-avatar>
                <a :href='`/person/${albumInfo.user.id}`' style="display: inline-block; margin-left: 5px">{{albumInfo.user.nickname}}</a>
            </div>
            <span class="album-time"> {{albumInfo.createTime | dateFormat2}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "albumItem",
    props: ['albumInfo'],
    data() {
        return {
        }
    },
    computed: {
        previewUrls() {
            return this.albumInfo.urls.split(' ')
        }
    }
}
</script>

<style lang="less" scoped>
.cover{
    height: 200px;
    overflow: hidden;
    .el-image{
        width: 100%;
        height: 100%;
    }
}
.album-item{
    margin-left: 1.5%;
    width: 21%;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 40px;
    padding: 10px;
    border-radius: 0.2rem;
    border: 1px solid #eee;
    .album-title{
        font-weight: 600;
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