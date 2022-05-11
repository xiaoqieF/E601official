<template>
    <el-card shadow="never" class="container">
        <div class="title">
            发布博客
        </div>
        <el-form ref="blogFormRef" :model="blog" :rules="blogFormRules">
            <el-form-item prop="title">
                <el-input placeholder="请输入标题" v-model="blog.title">
                    <el-select v-model="blog.flag" slot="prepend" placeholder="请选择">
                        <el-option label="原创" value="原创"></el-option>
                        <el-option label="转载" value="转载"></el-option>
                        <el-option label="翻译" value="翻译"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <!-- 博客摘要 -->
            <el-form-item prop="description">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入博客摘要"
                    v-model="blog.description">
                </el-input>
            </el-form-item>
            <!-- markdown编辑器 -->
            <el-form-item prop="content">
                <mavon-editor v-model="blog.content" ref="mdEditor" @imgAdd="mdImgAdd"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox label="开启赞赏" v-model="blog.appreciation"></el-checkbox>
                <el-checkbox label="开启评论" v-model="blog.commentEnable"></el-checkbox>
                <el-checkbox label="推荐本文" v-model="blog.recommend"></el-checkbox>
                <el-checkbox label="转载声明" v-model="blog.shareStatement"></el-checkbox>
            </el-form-item>
            <!-- 分类和标签 -->
            <el-form-item class="inline-item" prop="typeId">
                <el-select
                    v-model="blog.typeId"
                    clearable
                    placeholder="请选择分类"
                    style="width:260px">
                    <el-option
                        v-for="item in cateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="inline-item" prop="tagId">
                <el-select
                    v-model="blog.tagId"
                    multiple
                    placeholder="请选择标签"
                    style="width:460px">
                    <el-option
                        v-for="item in tagList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!-- 上传文章首页图 -->
        <el-upload
            class="upload-first-picture"
            ref="upload"
            :action="uploadUrl"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :headers="uploadHeader"
            :multiple="false"
            :limit="1"
            :on-exceed="handleExceed"
            list-type="picture">
            <el-button size="small" type="primary">点击上传文章首图</el-button>
        </el-upload>
        <span style="font-size: 12px">不超过6M,若不上传则采用默认图片</span>
        <div class="form-confirm">
            <el-button type="primary" size="small" @click="saveBlog">保存</el-button>
            <el-button type="primary" size="small" @click="submitBlog">发布</el-button>
        </div>

        <!-- 预览图片对话框 -->
        <el-dialog
            title="预览文章首图"
            :visible.sync="previewDialogVisible"
            width="50%">
            <img :src="blog.firstPicture" alt="首图" style="width:100%">
        </el-dialog>
    </el-card>
</template>

<script>
import {getCateByUserId, getTagsByUserId, uploadBlogPicture} from "@/utils/api";
import api from "@/utils/api";
import {addBlog} from "@/utils/api";
import {removeFirstPicture} from "@/utils/api";

export default {
    name: 'publish',
    created() {
        this.getAllCate();
        this.getAllTags();
    },
    data() {
        return {
            blog: {
                title: '',
                flag: '原创',
                content: '',
                description: '',
                appreciation: false,
                commentEnable: true,
                recommend: false,
                shareStatement: false,
                firstPicture: '',
                typeId: '',
                userId: this.$route.params.id,
                tagId:[],
                published: false,
            },
            fileList:[],
            // 上传文件时的头部
            uploadHeader: {
                Authorization: window.sessionStorage.getItem('token')
            },
            uploadUrl: api.uploadFirstPicture,
            // 分类列表数据
            cateList: [],
            // 标签列表数据
            tagList: [],
            // 博客验证规则
            blogFormRules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入博客摘要', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '博客内容不能为空' },
                ],
                typeId: [
                    { required: true, message: '必须选择分类', trigger: 'blur' },
                ],
                tagId: [
                    { required: true, message: '必须选择标签', trigger: 'blur' },
                ],
            },
            previewDialogVisible: false,
        }
    },
    methods: {
        handleExceed() {
            this.$message.error("只能上传一张首页图片！替换请删除之前上传的图片");
        },
        handleSuccess(res) {
            console.log(res);
            this.blog.firstPicture = res.data.path;
            this.$message.success("上传成功！");
        },
        handlePreview() {
            this.previewDialogVisible = true;
        },
        handleRemove(file) {
            const res = removeFirstPicture(file.response.data.relativePath);
            console.log(res);
        },
        beforeUpload(file) {
            console.log(file.size);
            const isLt6M = file.size / 1024 / 1024 < 6;

            if (!isLt6M) {
                this.$message.error('上传图片大小不能超过 6MB!');
            }
            return isLt6M;
        },
        // 获取全部分类标签
        async getAllCate() {
            const res = await getCateByUserId(this.$route.params.id);
            console.log(res);
            this.cateList = res.data;
        },
        // 获取全部标签
        async getAllTags() {
            const res = await getTagsByUserId(this.$route.params.id);
            console.log(res);
            this.tagList = res.data;
        },
        // markdown编辑器添加图片时的回调
        async mdImgAdd(pos, file) {
            const formdata = new FormData()
            formdata.append('file', file)
            const res = await uploadBlogPicture(formdata);
            console.log(res)
            if (res.code !== 200) {
                this.$message.error('图片上传失败：' + res.message);
                return
            }
            this.$refs.mdEditor.$img2Url(pos, res.data.path)
        },
        // 保存博客
        async saveBlog() {
            // 用户填写部分域
            if (this.blog.title !== '' || this.blog.description !== '' || this.blog.content !== ''
            || this.blog.typeId !== '' || this.blog.tagId.length !== 0) {
                const res = await addBlog(this.blog);
                if (res.code === 200) {
                    this.$message.success("保存成功！");
                    this.blog = '';
                    await this.$router.push(`/admin/${this.$route.params.id}/manage`);
                }
            }else {
                this.$message.error("保存失败，空白博客！");
            }
        },
        // 发布博客
        submitBlog()
        {
            this.$refs.blogFormRef.validate(async valid => {
                if (valid) {
                    this.blog.published = true;
                    const res = await addBlog(this.blog);
                    if (res.code === 200) {
                        this.$message.success("发布成功！");
                        this.blog = '';
                        await this.$router.push(`/admin/${this.$route.params.id}/manage`);
                    }
                }
            })
        },
    },
    // 用户想离开
    async beforeRouteLeave(to, from, next) {
        // 用户填写了blog想要离开
        // 排除用户保存和确定的情况
        if (this.blog !== '') {
            if (this.blog.title !== '' || this.blog.description !== '' || this.blog.content !== ''
                || this.blog.typeId !== '' || this.blog.tagId.length !== 0) {
                const answer = window.confirm('您编辑的博客将不会被保存 是否继续？');
                if (!answer) {
                    next(false);
                    return;
                } else {
                    next(true);
                }
            }
        }
        next(true);
    }
}
</script>

<style lang='less' scoped>
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
.el-select{
    width: 100px;
}
.form-confirm{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
.inline-item{
    display: inline-block;
    margin-right: 10px;
}
</style>