<template>
    <div class="container">
        <el-row class="header">
            <el-col :span="4" class="admin-logo">
                <div class="logo-content">
                    个人中心
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
                <div class="header-right">
                    <el-dropdown @command="handleCommand">
                    <span>
                        <el-avatar :src="userInfo.avatar"></el-avatar>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="home">首页</el-dropdown-item>
                            <el-dropdown-item command="modify">修改个人信息</el-dropdown-item>
                            <el-dropdown-item command="upload">修改头像</el-dropdown-item>
                            <el-dropdown-item command="logOut">注销</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="welcome-user">欢迎你：{{userInfo.nickname}}</div>
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

        <!-- 修改用户信息对话框 -->
        <el-dialog
            title="修改个人信息"
            :visible.sync="modifyDialogVisible"
            width="50%"
            @close="handleModifyDialogClose">
            <el-form :model="userInfo" :rules="userFormRules" ref="userFormRef" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="座右铭" prop="moto">
                    <el-input v-model="userInfo.moto"></el-input>
                </el-form-item>
                <el-form-item label="网站" prop="site">
                    <el-input v-model="userInfo.site"></el-input>
                </el-form-item>
                <el-form-item label="个人简介" prop="description">
                    <el-input type="textarea" :rows="3" v-model="userInfo.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="modifyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyUserInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 上传头像对话框 -->
        <el-dialog
            title="上传头像"
            :visible.sync="uploadDialogVisible"
            width="30%">
            <el-upload
                class="el-upload"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
import api, {getUserByIdPrivate} from "@/utils/api";
import {updateUser} from "@/utils/api";

export default {
    name: 'blogAdmin',
    created() {
        this.activeIndex = this.$route.path;
        this.getUserInfo();
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
            // 用户信息
            userInfo: {

            },
            // 修改用户信息对话框
            modifyDialogVisible: false,
            userFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator: checkEmail, trigger: 'blur'},
                ],
                moto: [
                    { required: true, message: '请输入座右铭', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入个人简介', trigger: 'blur' },
                ],
            },
            uploadDialogVisible:false,
            uploadUrl: api.uploadAvatar,
        }
    },
    methods: {
        // 头像下拉菜单回调
        handleCommand(command) {
            console.log(command)
            if (command === 'home') {
                this.$router.push('/home');
            } else if (command === 'modify') {
                this.modifyDialogVisible = true;
            } else if (command === 'upload') {
                this.uploadDialogVisible = true;
            } else if (command === "logOut") {
                window.sessionStorage.clear();
                this.$message.success("注销成功！");
                this.$router.push('/admin');
            }
        },
        // 获取用户信息(包括密码)
        async getUserInfo() {
            let userId = window.sessionStorage.getItem("userId");
            if (userId !== null) {
                const res = await getUserByIdPrivate(userId);
                console.log(res);
                this.userInfo = res.data;
            } else {
                this.$message.error("请登录");
                await this.$router.push("/admin");
            }
        },
        // 取消修改个人信息
        handleModifyDialogClose() {
            this.getUserInfo();
            this.$refs.userFormRef.resetFields();
        },
        // 确认修改用户信息
        modifyUserInfo() {
            this.$refs.userFormRef.validate(async valid => {
                if (valid) {
                    const res = await updateUser(this.$route.params.id, this.userInfo);
                    if (res.code === 200) {
                        this.$message.success("修改成功！");
                        this.modifyDialogVisible = false;
                    }
                }
            })
        },
        async handleAvatarSuccess(res) {
            console.log(res);
            this.userInfo.avatar = res.data.path;
            const data = await updateUser(this.$route.params.id, this.userInfo);
            if (data.code === 200) {
                this.$message.success("上传头像成功！");
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    display: inline-block;
    margin: 0 auto;
}
.el-upload:hover {
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