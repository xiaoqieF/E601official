<template>
    <div class="container">
        <div class="img-clip1 img-clip"></div>
        <el-card class="blog-list" shadow="never">
            <blog-summary v-for="blog in blogList" :blogInfo="blog" class="blog-item"/>
            <div class="page">
                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="blogQuery.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="blogQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalBlogs">
                </el-pagination>
            </div>
        </el-card>
        <div class="img-clip2 img-clip"></div>
        <el-card class="album">
            <div class="album-content">
                <albumItem v-for="album in albumList" :albumInfo="album"/>

            </div>
        </el-card>
    </div>
</template>

<script>
import blogSummary from "@/components/blogSummary";
import albumItem from "@/components/albumItem";
import {getAllBlogs} from "@/utils/api";
import {getAllAlbums} from "@/utils/api";

export default {
    name: "home",
    components: {
        blogSummary,
        albumItem
    },
    created() {
        this.getBlogs();
        this.getAlbums();
    },
    data() {
        return {
            blogQuery: {
                pageNum: 1,
                pageSize: 5,
            },
            totalBlogs: 0,
            blogList: [],
            albumList: [],

        }
    },
    methods: {
        // 获取博客列表
        async getBlogs() {
            const res = await getAllBlogs(this.blogQuery);
            console.log(res);
            this.blogList = res.data.blogList;
            this.totalBlogs = res.data.total;
        },
        // 获取相册列表
        async getAlbums() {
            const res = await getAllAlbums();
            console.log(res);
            this.albumList = res.data

        },
        // 分页页面大小变化后重新获取数据
        handleSizeChange(newSize) {
            this.blogQuery.pageSize = newSize;
            this.getBlogs();
        },
        // 当前选择页面变化后重新获取数据
        handleCurrentChange(newPage) {
            this.blogQuery.pageNum = newPage;
            this.getBlogs();
        },
    }
}
</script>

<style lang="less" scoped>
.container{
    margin-top: 20px;
    .page{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .blog-item{
        margin-bottom: 20px;
    }
    .img-clip{
        height: 70px;
        width: 1170px;
        margin: 20px auto;
    }

    .img-clip1{
        background-image: url("../assets/clip1.png");
    }
    .img-clip2{
        background-image: url("../assets/clip2.png");
    }

    .album-content{
        display: flex;
        flex-wrap: wrap;
    }
}
</style>