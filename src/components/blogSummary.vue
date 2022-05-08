<template>
    <!-- 博客列表：标题，信息，摘要 -->
    <el-card :shadow="shadow">
        <el-row :gutter="20">
            <el-col :span="16">
                <!-- 标题 -->
                <div class="title">
                    <router-link :to="`/detail/${blogInfo.id}`">{{ blogInfo.title }}</router-link>
                </div>
                <!-- 文章信息（发表时间、阅读次数等） -->
                <div class="subtitle">
                    <div><i class="el-icon-edit-outline"></i><span> 发表于 {{blogInfo.createTime | dateFormat2}}</span></div>
                    <div><i class="el-icon-edit-outline"></i><span> 更新于 {{ blogInfo.updateTime | dateFormat2 }}</span></div>
                    <div><i class="el-icon-view"></i><span> 阅读次数 {{blogInfo.views}}</span></div>
                </div>

                <p class="content">{{blogInfo.description}}</p>
                <div class="author-info">
                    <el-avatar size="small" :src="blogInfo.user.avatar"></el-avatar>
                    <span style="display: inline-block; margin-left: 10px">by</span>
                    <a href="#">{{blogInfo.user.nickname}}</a>
                </div>
                <div class="btn">
                    <el-button @click="$router.push(`/detail/${blogInfo.id}`)" type="primary">阅读原文<i class="el-icon-right"></i></el-button>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="blog-picture">
                    <el-image
                        v-if="blogInfo.firstPicture !== ''"
                        fit="cover"
                        :src="blogInfo.firstPicture"
                        :preview-src-list="[blogInfo.firstPicture]">
                    </el-image>
                    <el-image v-else :src="defaultFirstPic" :preview-src-list="[defaultFirstPic]"></el-image>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
    props:['shadow', 'blogInfo'],
    name: 'blogSummary',
    data() {
        return {
            defaultFirstPic: require("../assets/default.jpg")
        }
    },
    methods: {

    },
}
</script>

<style lang='less' scoped>
.title{
    text-align: center;
    line-height: 2;
    a{
        font-size: 28px;
        color: #444950;
        font-weight: bold;
    }
    a:hover{
        border-bottom: 2px solid #333;
    }
}

.subtitle{
    text-align: center;
    font-size: 16px;
    div{
        display: inline-block;
        margin-right: 15px;
    }
    div:nth-child(2){
        color: #409eff;
    }
}

.content{
    line-height: 2;
    font-size: 16px;
}
.btn{
    display: flex;
    justify-content: center;
}
.el-button{
    font-size: 16px;
    padding: 8px;
}
.author-info{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a{
        display: inline-block;
        margin-left: 5px;
    }
    a:hover{
        color: #409eff;
    }
}

.blog-picture{
    overflow: hidden;
    height: 250px;
    .el-image{
        width: 100%;
        height: 100%;
    }
}
</style>