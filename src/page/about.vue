<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
            <!-- 文章内容-->
                <div ref="contentRef" class="content markdown-body-my line-numbers" v-html="description">

                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import Prism from 'prismjs'
import {getAbout} from "@/utils/api";
export default {
    name: "about",
    async created() {
        await this.getAboutInfo();
        Prism.highlightAll()
        this.$formula(this.$refs.contentRef)
    },
    data() {
        return {
            description: ""
        }
    },
    methods: {
        async getAboutInfo() {
            const res = await getAbout();
            console.log(res);
            this.description = res.data.content;
        },
    }
}
</script>

<style lang="less" scoped>
@import "../style/github-mark.css";
.container{
    margin-top: 20px;
}
.content{
    padding: 40px;
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