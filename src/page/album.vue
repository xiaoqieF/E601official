<template>
    <div class="container">
        <el-card>
            <div>
                <span class="title">我的相册</span>
                <el-button @click="toNewAlbum" type="primary" size="small" style="margin-left: 20px">新建相册<i class=" el-icon-edit"></i></el-button>
                <el-button type="primary" size="small">上传照片<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <el-divider></el-divider>
            <el-empty v-if="false" description="你好像还没有任何相册哦，赶快取创建一个吧！">
                <el-button type="primary" @click="toNewAlbum">创建相册<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-empty>
            <div v-else class="album-list">
                <albumItemAdmin
                    v-for="(item, index) in this.albumList"
                    :albumInfo="item"
                    :highlight="activeAlbum === index"
                    @click.native="handleClick(index)" />
            </div>

            <div class="title">相册内容</div>
            <el-divider></el-divider>
            <el-empty v-if="activeAlbum === -1" description="选中一个相册，查看内容！"></el-empty>
            <div v-else class="picture-list">
                <div class="picture-item" v-for="item in this.activeUrls">
                    <el-image
                        fit="contain"
                        :src="item"
                        :preview-src-list="[item]">
                    </el-image>
                </div>
            </div>
        </el-card>

    </div>
</template>

<script>
import albumItemAdmin from "@/components/albumItemAdmin";
import {getAlbums} from "@/utils/api";

export default {
    name: "album",
    components: {albumItemAdmin},
    created() {
        this.getAllAlbums();
    },
    data() {
        return {
            url: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            albumList: [],
            activeAlbum: -1,

        }
    },
    methods: {
        toNewAlbum() {
            this.$router.push(`/admin/${this.$route.params.id}/newAlbum`);
        },
        // 获取所有相册
        async getAllAlbums() {
            const res = await getAlbums(this.$route.params.id);
            console.log(res);
            this.albumList = res.data;
        },
        handleClick(index) {
            console.log(index);
            this.activeAlbum = index;
        }
    },
    computed: {
        activeUrls() {
            if (this.activeAlbum !== -1) {
                console.log(this.albumList[this.activeAlbum])
                return this.albumList[this.activeAlbum].urls.split(' ');
            }
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