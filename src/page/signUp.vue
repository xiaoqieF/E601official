<template>
    <div class="sign-up-container">
        <div class="form-container">
            <el-form :model="userForm" :rules="userFormRules" ref="userFormRef" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="userForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>
                <el-form-item label="座右铭" prop="moto">
                    <el-input v-model="userForm.moto"></el-input>
                </el-form-item>
                <el-form-item label="网站" prop="site">
                    <el-input v-model="userForm.site"></el-input>
                </el-form-item>
                <el-form-item label="个人简介" prop="description">
                    <el-input type="textarea" :rows="3" v-model="userForm.description"></el-input>
                </el-form-item>
                <el-upload
                    class="el-upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
                </el-upload>
                <el-form-item class="btn">
                    <el-button type="primary" >注册</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "signUp",
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
            userForm: {
                username: '',
                nickname: '',
                password: '',
                email: '',
                moto: '',
                description: '',
                avatar: '',
                site: '',
            },
            userFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
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
            }
        }
    },
    methods: {
        handleAvatarSuccess(){

        },
        beforeAvatarUpload() {

        },
        reset() {
            this.$refs.userFormRef.resetFields();
        }
    }
}
</script>

<style lang="less" scoped>
.sign-up-container{
    background-color: #2b4b6b;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .form-container{
        width: 40%;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 10px;
        box-shadow: 0 0 10px #ddd;
        background-color: #fff;
    }
    .btn{
        float: right;
    }
}
.el-upload {
    margin-left: 20%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
.avatar {
    width: 150px;
    height: 150px;
    display: block;
}
</style>