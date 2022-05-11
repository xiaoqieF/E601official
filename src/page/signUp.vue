<template>
    <div class="sign-up-container">
        <div class="form-container">
            <el-form :model="userForm" :rules="userFormRules" ref="userFormRef" label-width="120px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="userForm.checkPass" type="password"></el-input>
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
                    <el-input type="textarea" :rows="2" v-model="userForm.description"></el-input>
                </el-form-item>
                <el-form-item label="授权码" prop="authCode">
                    <el-input v-model="userForm.authCode"></el-input>
                </el-form-item>
                <el-form-item prop="avatar">
                    <div class="buttons">
                        <el-upload
                            class="el-upload"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
                        </el-upload>
                        <div>
                            <el-button type="primary" @click="submit">注册</el-button>
                            <el-button type="info" @click="reset">重置</el-button>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {login, signup} from "@/utils/api";
import api from "@/utils/api"
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
        // 定义密码验证规则
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.userForm.password !== '') {
                    this.$refs.userFormRef.validateField('checkPass');
                }
                callback();
            }
        };
        // 确认密码验证
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                username: '',
                nickname: '',
                password: '',
                checkPass: '',
                email: '',
                moto: '',
                description: '',
                avatar: '',
                site: '',
                type: 1,
                authCode: ''
            },
            uploadUrl: api.uploadAvatar,
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
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
                    {validator: validatePass, trigger: 'blur'}
                ],
                checkPass: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    {validator: validatePass2, trigger: 'blur'}
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator: checkEmail, trigger: 'blur'},
                ],
                moto: [
                    // { required: true, message: '请输入座右铭', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入个人简介', trigger: 'blur' },
                ],
                authCode: [
                    { required: true, message: '请输入授权码', trigger: 'blur' },
                ],
                avatar: [
                    { required: true, message: '请上传头像', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        handleAvatarSuccess(res){
            console.log(res);
            this.userForm.avatar = res.data.path;
        },
        beforeAvatarUpload(file) {
            console.log(file)
            const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPic) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isPic && isLt2M;
        },
        reset() {
            this.$refs.userFormRef.resetFields();
        },
        submit() {
            this.$refs.userFormRef.validate(async valid => {
                if (valid) {
                    console.log(this.userForm)
                    const res = await signup(this.userForm, this.userForm.authCode);
                    console.log(res)
                    if (res.code !== 200) {
                        this.$message.error(res.message);
                    } else {
                        this.$message.success("注册成功！");
                        // 注册成功时登录
                        const res = await login(this.userForm);

                        // 登录成功时保存服务端下发的token
                        window.sessionStorage.setItem('token', res.data.token)
                        window.sessionStorage.setItem('userId', res.data.user.id);
                        await this.$router.push("/home");
                    }
                }
            })
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
}
.el-upload {
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
.buttons{
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>