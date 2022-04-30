<template>
    <!-- 博客列表：标题，信息，摘要 -->
    <el-card :shadow="shadow">
        <el-row :gutter="20">
            <el-col :span="16">
                <!-- 标题 -->
                <div class="title">
                    <router-link :to="`/detail/1`">Spring揭秘</router-link>
                </div>
                <!-- 文章信息（发表时间、阅读次数等） -->
                <div class="subtitle">
                    <div><i class="el-icon-edit-outline"></i><span> 发表于 2022-04-26</span></div>
                    <div><i class="el-icon-edit-outline"></i><span> 更新于 2022-04-26</span></div>
                    <div><i class="el-icon-view"></i><span> 阅读次数 82</span></div>
                </div>

                <p class="content">这几天学习了卡尔曼滤波器（Kalman Filter）相关的理论知识，并发现了一个非常仔细的推导过程，是在b站上发现的一个搞控制的博士DR_CAN（文内有链接），看完他的卡尔曼滤波器相关的视频，加深了我对理论的理解，这里将视频中的推导过程加以梳理，以便日后查看。</p>
                <div class="author-info">
                    <el-avatar size="small" :src="avatarUrl"></el-avatar>
                    <span style="display: inline-block; margin-left: 10px">by 小切</span>
                </div>
                <div class="btn">
                    <el-button type="primary">阅读原文<i class="el-icon-right"></i></el-button>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="blog-picture">
                    <el-image
                        style="width: 100%"
                        :src="url"
                        :preview-src-list="srcList">
                    </el-image>
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
            url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            srcList:[
                "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            ],
            avatarUrl: "https://xiaodongfan.com/images/profile.png"
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
        color: #409eff;
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
}
</style>