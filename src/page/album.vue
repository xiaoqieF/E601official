<template>
    <div class="container">
        <el-card>
            <div>
                <span class="title">我的相册</span>
                <el-button type="primary" size="small" style="margin-left: 20px">编辑相册<i class=" el-icon-edit"></i></el-button>
                <el-button type="primary" size="small">上传照片<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <el-divider></el-divider>
            <el-empty v-if="false" description="你好像还没有任何相册哦，赶快取创建一个吧！">
                <el-button type="primary">创建相册<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-empty>
            <div v-else class="album-list">
                <albumItemAdmin/>
                <albumItemAdmin/>
                <albumItemAdmin/>
                <albumItemAdmin/>
                <albumItemAdmin/>
                <el-button style="margin: 10px 2px; width: 24%">新建相册<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>

            <div class="title">相册内容</div>
            <el-divider></el-divider>
            <el-empty v-if="false" description="选中一个相册，查看内容！"></el-empty>
            <div v-else class="picture-list">
                <div class="picture-item">
                    <el-image fit="contain" :src="url" :preview-src-list="[url]"></el-image>
                </div>
                <div class="picture-item">
                    <el-image fit="contain" :src="url2" :preview-src-list="[url2]"></el-image>
                </div>
                <div class="picture-item">
                    <el-image fit="contain" :src="url1" :preview-src-list="[url1]"></el-image>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import albumItemAdmin from "@/components/albumItemAdmin";
export default {
    name: "album",
    components: {albumItemAdmin},
    data() {
        return {
            url: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            url1: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
            url2: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
    }
}
</script>

<style lang="less" scoped>
.container{
    margin-top: 20px;
    .title{
        font-weight: 600;
    }
    .album-list{
        display: flex;
        flex-wrap: wrap;
    }
    .picture-list{
        display: flex;
        flex-wrap: wrap;
    }
    .picture-item{
        width: 20%;
        margin: 5px;
    }
}
</style>