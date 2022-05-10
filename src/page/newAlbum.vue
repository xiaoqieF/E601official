<template>
        <el-card shadow="never" class="container">
            <div class="title">
                新建相册
            </div>
            <el-form :model="albumForm" :rules="albumRules" ref="albumFormRef" label-width="150px">
                <el-form-item label="相册名称" prop="title">
                    <el-input v-model="albumForm.title"></el-input>
                </el-form-item>
                <el-form-item label="拍摄设备" prop="device">
                    <el-input v-model="albumForm.device"></el-input>
                </el-form-item>
                <el-form-item label="简要描述" prop="description">
                    <el-input v-model="albumForm.description"></el-input>
                </el-form-item>
                <el-form-item prop="urls" label="上传照片(每张照片不超过6MB)：">
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture-card"
                        :on-success="handleSuccess"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :before-upload="beforeUpload"
                        :headers="uploadHeader"
                        multiple>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="form-confirm">
                <el-button type="primary" size="small" @click="submitAlbum">新建相册</el-button>
            </div>

            <!-- 预览图片对话框 -->
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-card>
</template>

<script>
import api, {removePicture} from "@/utils/api";
import {addAlbum} from "@/utils/api";

export default {
    name: "newAlbum",
    mounted() {
        if (window.history && window.history.pushState) {
            window.addEventListener('beforeunload', this.beforeUnloadFn );
        }
    },
    destroyed() {
        window.removeEventListener('beforeunload', this.beforeUnloadFn );
    },
    data() {
        return {
            albumForm: {
                title: '',
                device: '',
                description: '',
                urls: [],
                userId: this.$route.params.id
            },
            albumRules: {
                title: [
                    { required: true, message: '请输入相册名称', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入相册描述', trigger: 'blur' },
                ],
                urls: [
                    { required: true, message: '至少上传一张照片' },
                ],
            },
            dialogImageUrl: '',
            dialogVisible: false,
            uploadUrl: api.uploadPicture + this.$route.params.id,
            // 上传文件时的头部
            uploadHeader: {
                Authorization: window.sessionStorage.getItem('token')
            },
        }
    },
    methods: {
        submitAlbum() {
            this.$refs.albumFormRef.validate(async valid => {
                if (valid) {
                    // 不同url之间用空格分开
                    this.albumForm.urls = this.albumForm.urls.join(" ");
                    console.log(this.albumForm);
                    const res = await addAlbum(this.albumForm);
                    console.log(res);
                    if (res.code === 200) {
                        this.$message.success("创建相册成功！");
                        this.albumForm.urls = [];
                        await this.$router.push(`/admin/${this.$route.params.id}/album`);
                        return;
                    }
                    this.$message.error(res.message);
                }
            })
        },
        handlePictureCardPreview(file) {
            console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file) {
            console.log(file);
            removePicture(this.$route.params.id, file.response.data.relativePath);
            this.albumForm.urls = this.albumForm.urls.filter(item => item !== file.response.data.path);
            console.log(this.albumForm.urls);
        },
        handleSuccess(res) {
            console.log(res);
            if (res.code === 200) {
                this.albumForm.urls.push(res.data.path);
                return;
            }
            return this.$message.error("上传失败！");
        },
        // 用户刷新浏览器，相当于不保存修改，同样需要删除已经上传的照片
        beforeUnloadFn() {
            // 用户放弃更改，将上传的图像删除
            this.albumForm.urls.forEach(url => {
                let path = url.split('/').pop();
                removePicture(this.$route.params.id, path);
            })
        },
        beforeUpload(file) {
            console.log(file.size);
            const isLt6M = file.size / 1024 / 1024 < 6;

            if (!isLt6M) {
                this.$message.error('上传图片大小不能超过 6MB!');
            }
            return isLt6M;
        },
    },
    async beforeRouteLeave(to, from, next) {
        console.log(this.albumForm.urls);
        // 用户上传了照片后想要离开
        if (this.albumForm.urls.length !== 0) {
            const answer = window.confirm('修改将不会生效 是否继续？');
            if (!answer) {
                next(false);
            } else {
                // 用户放弃更改，将上传的图像删除
                this.albumForm.urls.forEach(url => {
                    let path = url.split('/').pop();
                    removePicture(this.$route.params.id, path);
                })
                next(true);
            }
        }
        next(true);
    }
}
</script>

<style lang="less" scoped>
.container{
    margin-top: 20px;
    .title{
        text-align: center;
        line-height: 2;
        font-size: 28px;
        color: #444950;
        font-weight: bold;
    }
}

.form-confirm{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>