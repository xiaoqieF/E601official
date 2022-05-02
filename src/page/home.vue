<template>
    <div class="container">
        <div class="img-clip1 img-clip"></div>
        <el-card class="blog-list" shadow="never">
            <blog-summary class="blog-item"/>
            <blog-summary class="blog-item"/>
            <div class="page">
                <!-- 分页 -->
                <el-pagination
                    :current-page="1"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="20">
                </el-pagination>
            </div>
        </el-card>
        <div class="img-clip2 img-clip"></div>
        <el-card class="album">
            <div class="album-content">
                <albumItem/>
                <albumItem/>
                <albumItem/>
                <albumItem/>
                <albumItem/>
            </div>
        </el-card>
    </div>
</template>

<script>
import blogSummary from "@/components/blogSummary";
import albumItem from "@/components/albumItem";
export default {
    name: "home",
    components: {
        blogSummary,
        albumItem
    },
    data() {
        return {
        }
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