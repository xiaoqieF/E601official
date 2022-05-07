<template>
    <el-card shadow="never" class="container">
        <div class="title">
            编辑相册 -- {{this.albumForm.title}}
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
            <el-form-item prop="urls" label="上传照片(每张照片不超过10MB)：">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture-card"
                    :on-success="handleSuccess"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :file-list="pictureList"
                    :headers="uploadHeader"
                    multiple>
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="form-confirm">
            <el-button type="primary" size="small" @click="submitAlbum">保存</el-button>
        </div>

        <!-- 预览图片对话框 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-card>
</template>

<script>
import api, {removePicture} from "@/utils/api";
import {updateAlbum} from "@/utils/api";
import {getAlbumById} from "@/utils/api";

export default {
    name: "editAlbum",
    created() {
        this.getAlbum();
    },
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
            pictureList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            uploadUrl: api.uploadPicture + this.$route.params.id,
            // 上传文件时的头部
            uploadHeader: {
                Authorization: window.sessionStorage.getItem('token')
            },
            // 用来保存用户要删除的照片名称，在用户点保存时，才真正将其从服务器移除
            deletedPictures: [],
        }
    },
    methods: {
        submitAlbum() {
            this.$refs.albumFormRef.validate(async valid => {
                if (valid) {
                    // 将服务器上相应的照片删除
                    this.deletedPictures.forEach(pic => removePicture(this.$route.params.id, pic));
                    // 不同url之间用空格分开
                    this.albumForm.urls = this.albumForm.urls.join(" ");
                    console.log(this.albumForm);
                    const res = await updateAlbum(this.albumForm);
                    if (res.code === 200) {
                        this.$message.success("更新相册成功！");
                        return await this.$router.push(`/admin/${this.$route.params.id}/album`);
                    }
                    return this.$message.error(res.message);
                }
            })
        },
        handlePictureCardPreview(file) {
            console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 删除照片时，只是将form更改，并没有将服务器照片删除，用户保存时才真正删除
        handleRemove(file) {
            console.log(file);
            // 是后来上传的照片
            if (file.response) {
                this.albumForm.urls = this.albumForm.urls.filter(item => item !== file.response.data.path);
                this.deletedPictures.push(file.response.data.relativePath);
            // 原本相册就有的照片
            } else {
                this.albumForm.urls = this.albumForm.urls.filter(item => item !== file.url);
                this.deletedPictures.push(file.url.split('/').pop());
            }
            console.log(this.albumForm.urls);
        },
        handleSuccess(res) {
            console.log(res);
            if (res.code === 200) {
                this.albumForm.urls.push(res.data.path);
            }
        },
        // 维护pictureList
        handleChange(file, pictureList) {
            this.pictureList = pictureList;
            console.log(pictureList);
        },
        // 获取相册内容
        async getAlbum() {
            const res = await getAlbumById(this.$route.params.albumId);
            console.log(res);
            if (res.code === 200) {
                this.albumForm = res.data;
            }
            this.albumForm.urls = this.albumForm.urls.split(' ');
            this.albumForm.urls.forEach(url => {
                this.pictureList.push({url: url});
            })
        },
        // 用户刷新浏览器，相当于不保存修改，同样需要删除已经上传的照片
        beforeUnloadFn() {
            this.pictureList.forEach(picture => {
                if (picture.response) {
                    removePicture(this.$route.params.id, picture.response.data.relativePath);
                }
            })
        }
    },
    // 拦截用户离开，提示用户是否保存
    async beforeRouteLeave(to, from, next) {
        // 用户点击保存按钮，不拦截
        if (typeof this.albumForm.urls === "string") {
            return next(true);
        }
        const answer = window.confirm('修改将不会生效 是否继续？');
        if (!answer) {
            next(false);
        } else {
            // 用户放弃更改，将新上传的图像删除
            this.pictureList.forEach(picture => {
                if (picture.response) {
                    removePicture(this.$route.params.id, picture.response.data.relativePath);
                }
            })
            next(true);
        }
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