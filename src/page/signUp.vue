<template>
    <div class="sign-up-container">
        <div class="form-container">
            <el-form :model="userForm" :rules="userFormRules" ref="userFormRef" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password"></el-input>
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
import {signup} from "@/utils/api";
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
        reset() {
            this.$refs.userFormRef.resetFields();
        },
        submit() {
            this.$refs.userFormRef.validate(async valid => {
                if (valid) {
                    console.log(this.userForm)
                    const res = await signup(this.userForm);
                    console.log(res)
                    if (res.code !== 200) {
                        this.$message.error(res.message);
                    } else {
                        this.$message.success("注册成功！");
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