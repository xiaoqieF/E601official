<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
            <!-- 文章内容-->
                <div ref="contentRef" class="content markdown-body line-numbers" v-html="description">

                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import Prism from 'prismjs'
export default {
    name: "about",
    created() {
        Prism.highlightAll()
        this.$formula(this.$refs.contentRef)
    },
    data() {
        return {
            description: "<h1>关于</h1>"
        }
    }
}
</script>

<style lang="less" scoped>
.container{
    margin-top: 20px;
}
.title{
    text-align: center;
    line-height: 2;
    font-size: 28px;
    color: #444950;
    font-weight: bold;
}
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}
</style>