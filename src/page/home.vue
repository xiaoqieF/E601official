<template>
    <div class="container">
        <el-carousel height="400px" :autoplay="true" :interval="5000">
            <el-carousel-item>
                <img src="../assets/11.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../assets/pexels-george-desipris-748626.jpg" alt="">
            </el-carousel-item>
        </el-carousel>
        <div class="img-clip1 img-clip"></div>
        <el-card class="blog-list" shadow="never">
            <blog-summary/>
            <blog-summary/>
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
            摄影集
        </el-card>
    </div>
</template>

<script>
import blogSummary from "@/components/blogSummary";
export default {
    name: "home",
    components: {
        blogSummary
    },
}
</script>

<style lang="less" scoped>
.container{
    margin-top: 20px;
    .el-carousel{
        z-index: -1;
    }

    img{
        width: 100%;
    }
    .page{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .img-clip{
        height: 74px;
        width: 1170px;
        margin: 20px auto;
    }

    .img-clip1{
        background-image: url("../assets/clip22.png");
    }
    .img-clip2{
        background-image: url("../assets/clip11.png");
    }
}
</style>