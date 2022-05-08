<template>
    <!-- 显示用户基本信息的卡片 -->
    <el-card class="general-info">
        <div class="avatar">
            <img :src="userInfo.avatar" alt="">
        </div>
        <div class="moto">
            {{userInfo.moto}}
        </div>
        <div class="social">
            <a :href=userInfo.site target="_blank" class="social-item"><i class="iconfont icon-github"></i></a>
            <a :href="`mailto:${userInfo.email}`" target="_blank" class="social-item"><i class="iconfont icon-youxiang"></i></a>
        </div>
        <div class="more-info">
            <div class="nickname">
                <span class="title">昵称：</span><a href="#">{{userInfo.nickname}}</a>
            </div>
            <div class="github">
                <span class="title">主页/Github：</span><a :href=userInfo.site>{{userInfo.site}}</a>
            </div>
            <div class="email">
                <span class="title">邮箱：</span><a :href="`mailto:${userInfo.email}`" target="_blank" class="social-item">{{userInfo.email}}</a>
            </div>
            <div class="create-time">
                <span class="title">注册时间：</span> {{userInfo.createTime | dateFormat2}}
            </div>
            <div class="introduce">
                <span class="title">简介：</span>
                {{userInfo.description}}
            </div>
        </div>
        <!-- 统计信息 -->
        <div class="state">
            <router-link class="state-item" to="/archives">
                <div>{{userInfo.blogNum}}</div>
                <div>博客</div>
            </router-link>
            <router-link class="state-item" to="/categories">
                <div>{{userInfo.albumNum}}</div>
                <div>相册</div>
            </router-link>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "userItem",
    props: ['userInfo'],
    data() {
        return {
            avatarUrl: "https://xiaodongfan.com/images/profile.png"
        }
    }
}
</script>

<style lang="less" scoped>
.general-info{
    border-radius: 20px;
    width: 30%;
    .avatar{
        text-align: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #eee;
        box-shadow: 0 0 10px #ddd;
        margin: auto;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .moto{
        text-align: center;
        font-weight: 800;
        padding: 20px;
    }
    .social{
        text-align: center;
        .iconfont{
            color: #444;
            font-size: 30px !important;
        }
        .iconfont:hover{
            color: #409eff;
        }
    }
}
.state{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    .state-item{
        display: inline-block;
        width: 50%;
        text-align: center;
        div:first-child{
            color: #444950;
            font-weight: bold;
            font-size: 20px;
        }
        div:nth-child(2){
            color: #409eff;
            margin-top: 5px;
            font-size: 18px;
        }
    }
    // 选择前两个元素添加边框
    .state-item:nth-child(-n+1){
        border-right: 1px dashed #444;
    }

}
.iconfont{
    margin-right: 5px;
}
.more-info{
    line-height: 1.5;
    .title{
        font-weight: 600;
    }
    a:hover{
        color: #409eff;
    }
}

</style>