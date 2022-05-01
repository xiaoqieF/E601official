<template>
    <div class="container">
        <el-row class="header">
            <el-col :span="4" class="admin-logo">
                <div class="logo-content">
                    后台管理系统
                </div>
            </el-col>
            <!-- 导航栏 -->
            <el-col :span="12">
                <el-menu
                    :default-active="activeIndex"
                    mode="horizontal"
                    background-color= "#333"
                    text-color="#fff"
                    active-text-color="#fff"
                    router>
                    <!-- 这里使用了路由路径参数，其值为用户的id -->
                    <el-menu-item
                        :index="`/admin/${this.$route.params.id}/publish`">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">发布博客</span>
                    </el-menu-item>
                    <el-menu-item
                        :index="`/admin/${this.$route.params.id}/album`">
                        <i class="el-icon-folder-opened"></i>
                        <span slot="title">管理相册</span>
                    </el-menu-item>
                    <el-menu-item
                        :index="`/admin/${this.$route.params.id}/manage`">
                        <i class="el-icon-folder-opened"></i>
                        <span slot="title">管理博客</span>
                    </el-menu-item>

                </el-menu>
            </el-col>
            <!-- 头像 -->
            <el-col :span="4" :offset="2">
                <!-- <el-avatar style="float:right" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> -->
                <div class="header-right">
                    <el-dropdown @command="handleCommand">
                    <span>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="home">首页</el-dropdown-item>
                            <el-dropdown-item command="modify">修改个人信息</el-dropdown-item>
                            <el-dropdown-item command="upload">上传头像</el-dropdown-item>
                            <el-dropdown-item command="logOut">注销</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="welcome-user">欢迎你：小切</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <!-- 中央区域 -->
            <el-col :span="18" :offset="3" :xl="{span:14, offset:5}">
                <router-view></router-view>
            </el-col>
        </el-row>
        <!-- 底部信息 -->
        <!-- 底部信息 -->
        <div class="footer">
            <div class="copyright">
                <span>Copyright © 2021~2022 | </span> <a class="foot-link" target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备2021039158号-1</a>
            </div>
            <div>
                <span>Designed by <a href="#" style="color: #bbb">小切</a></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'blogAdmin',
    created() {
        this.activeIndex = this.$route.path
    },
    data() {
        // 自定义邮箱验证规则
        const checkEmail = (rule, value, callback) => {
            const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (reg.test(value)){
                callback();
            }
            callback(new Error('邮箱格式错误'));
        };
        return {
            activeIndex: "",
        }
    },
    methods: {
        // 头像下拉菜单回调
        handleCommand(command) {
            console.log(command)
        },

    },
    // 监听路由路径变化，改变当前导航栏激活项
    watch: {
        '$route.path': function(val) {
            console.log("current router path:", val)
            this.activeIndex = val
        }
    }
}
</script>

<style lang='less' scoped>
.container{
    height: 100%;
}
.header, .footer{
    background-color: #333;
}
.el-menu{
    border-bottom: 0;
}
.global_search{
    margin-top: 10px;
}
.el-avatar{
    float: right;
    margin-right: 20px;
    margin-top: 10px;

}
.footer{
    height: 100px;
    width: 100%;
    margin-top: 100px;
    text-align: center;
    background-color: #333;
    font-size: 16px;
    color: #eee;
    .foot-link{
        font-size: 16px;
        color: #bbb;
    }
    .foot-link:hover{
        color: #999;
    }
    .copyright{
        padding-top: 20px;
        margin-top: 20px;
    }
    .small-title{
        color: #eee;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
    }
}
.logo-content{
    text-align: center;
    color: #409eff;
    font-size: 20px;
    font-weight: bold;
    padding: 15px 0;
    height: 100%;
}
.header-right{
    display: flex;
    justify-content: center;
    align-items: center;
    .welcome-user{
        font-size: 16px;
        padding-top: 5px;
        color: #eee;
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

</style>