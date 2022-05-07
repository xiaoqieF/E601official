<template>
    <div class="container">
        <el-card>
            <div>
                <span class="title">我的相册</span>
                <span style="font-size: 12px">  (点击以选择相册)</span>
                <el-button @click="toNewAlbum" type="primary" size="small" style="margin-left: 20px">新建相册<i class="el-icon-plus el-icon--right"></i></el-button>
                <el-tooltip effect="dark" content="编辑当前选中的相册">
                    <el-button @click="editAlbum" type="primary" size="small">编辑相册<i class="el-icon-edit el-icon--right"></i></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除当前选中的相册">
                    <el-button @click="removeAlbum" type="danger" size="small">删除相册<i class="el-icon-delete el-icon--right"></i></el-button>
                </el-tooltip>
            </div>
            <el-divider></el-divider>
            <el-empty v-if="albumList.length === 0" description="你好像还没有任何相册哦，赶快取创建一个吧！">
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
                        lazy
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
import {deleteAlbum} from "@/utils/api";

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
        // 相册点击回调函数
        handleClick(index) {
            console.log(index);
            this.activeAlbum = index;
        },
        editAlbum() {
            if (this.activeAlbum === -1) {
                this.$message.error("请先选择要编辑的相册！");
                return;
            }
            this.$router.push(`/admin/${this.$route.params.id}/editAlbum/${this.albumList[this.activeAlbum].id}`)
        },
        // 删除相册
        async removeAlbum() {
            if (this.activeAlbum === -1) {
                this.$message.error("请先选择要删除的相册！");
                return;
            }
            const result = await this.$confirm('此操作将永久删除该相册 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if (result !== 'confirm') {
                return this.$message.info('已取消删除操作！');
            }
            const res = await deleteAlbum(this.albumList[this.activeAlbum].id);
            console.log(res);
            if (res.code === 200) {
                this.$message.success("删除相册成功！");
                await this.getAllAlbums();
                return;
            }
            this.$message.error(res.message);
        },
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
        width: 40%;
        margin: 20px;
    }
}
</style>