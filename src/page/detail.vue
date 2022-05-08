<template>
    <el-row class="container" :gutter="20">
        <el-col :xs="24" :md="20" :lg="20" :xl="16">
            <el-card>
                <!-- 文章标题 -->
                <div class="title">
                    {{blog.title}}
                </div>
                <!-- 文章信息（发表时间、阅读次数等） -->
                <div class="subtitle">
                    <div><i class="el-icon-edit-outline"></i><span> 发表于 {{blog.createTime | dateFormat2}}</span></div>
                    <div><i class="el-icon-edit-outline"></i><span> 更新于 {{blog.updateTime | dateFormat2}}</span></div>
                    <div><i class="el-icon-view"></i><span> 阅读次数 {{blog.views}}</span></div>
                </div>
                <!-- 文章内容 -->
                <div ref="contentRef" id="content" class="content line-numbers markdown-body-my" v-html="blog.content"></div>
                <div class="thanks">
                    ----- 本文结束，感谢您的阅读 -----
                </div>
                <!-- 底部声明栏 -->
                <el-card shadow="never" class="footer">
                    <div class="author">
                        <!-- 这里确保能够拿到数据，因为向服务器获取数据需要时间 -->
                        <span>本文作者：</span><a href="https://github.com/xiaoqieF">{{blog.user ? blog.user.nickname : ""}}</a>
                    </div>
                    <div class="copyright">
                        <span>版权声明：</span>本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">BY-NC-SA</a> 许可协议。转载请注明出处！
                    </div>
                </el-card>
                <!-- 底部标签区 -->
                <div class="foot-tag">
                    <i v-for="tag in blog.tags" :key="tag.id" class="iconfont icon-tags foot-tag-item">{{tag.name}}</i>
                </div>
            </el-card>
            <!-- 评论区 -->
            <el-card v-if="true" class="comment">
                <el-card shadow='never'>
                    <div class="comment-title">
                        评论区
                    </div>
                    <!--<div class="comment-item" v-for="comment in comments" :key="comment.id">-->
                        <div class="parent-comment">
                            <!--<el-avatar v-if="false" :src='comment.avatar'></el-avatar>-->
                            <el-avatar src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></el-avatar>
                            <div class="comment-main">
                                <div class="comment-info">
                                    <div class="nickname">小切</div>
                                    <div class="create-time">2022-12-12</div>
                                </div>
                                <div class="comment-content">
                                    哈哈哈
                                </div>
                            </div>
                            <div class="reply">
                                回复
                            </div>

                        </div>
                        <!--<div class="child-comment" v-for="childComment in comment.replyComments" :key="childComment.id">-->
                            <el-avatar src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></el-avatar>
                            <div class="comment-main">
                                <div class="comment-info">
                                    <div class="nickname">小切</div>
                                    <div class="create-time">2022-1-12</div>
                                </div>
                                <div class="comment-content">
                                    你好哇
                                </div>
                            </div>
                            <div class="reply">
                                回复
                            </div>
                        <!--</div>-->
                    <!--</div>-->
                </el-card>
                <el-card shadow='never'>
                    <el-form
                        :model="commentForm"
                        :rules="commentFormRules"
                        ref="commentFormRef">
                        <el-form-item prop="nickname" class="comment-name">
                            <el-input
                                v-model="commentForm.nickname"
                                placeholder="请输入昵称"
                                prefix-icon="iconfont icon-person"></el-input>
                        </el-form-item>
                        <el-form-item prop="email" class="comment-email">
                            <el-input
                                v-model="commentForm.email"
                                placeholder="请输入邮箱"
                                prefix-icon="iconfont icon-youxiang"></el-input>
                        </el-form-item>
                        <el-form-item prop="content">
                            <el-input
                                ref="commentContentRef"
                                type="textarea"
                                :placeholder="commentPlaceholder"
                                :rows="6"
                                v-model="commentForm.content"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" size="mini">发布</el-button>
                    <el-button type="info" size="mini">重置</el-button>
                    <div class="comment-tips">来评论吧~~~</div>
                </el-card>
            </el-card>
        </el-col>
        <el-col ref="sideRef" :xs="0" :md="4" :lg="4" :xl="4">
            <!-- 目录区域 -->
            <el-card :class="dirClass" ref="dirRef">
                <div class="dir-title">
                    目录
                </div>
                <!-- 目录内容，由tocbot生成 -->
                <div class="dir-content">
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import Prism from 'prismjs'
import * as tocbot from 'tocbot'
import {getRenderedBlogById} from "@/utils/api";
export default {
    name: 'detail',
    async created() {
        await this.getBlog();
        console.log("got data")
        // 这里使公式和代码格式化并不放在mounted中，因为created和mounted钩子是异步执行的
        // 可能会存在数据还未获取就渲染页面的情况
        console.log(this.$refs.contentRef);
        Prism.highlightAllUnder(this.$refs.contentRef)
        console.log("highlight")
        this.$formula(this.$refs.contentRef)
        tocbot.init({
            // Where to render the table of contents.
            tocSelector: '.dir-content',
            // Where to grab the headings to build the table of contents.
            contentSelector: '.content',
            // Which headings to grab inside of the contentSelector element.
            headingSelector: 'h1, h2, h3',
            // For headings inside relative or absolute positioned containers within content.
            hasInnerContainers: true,
        });
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler)
    },
    data() {
        // 自定义邮箱验证规则
        const checkEmail = (rule, value, callback) => {
            const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (reg.test(value)) {
                callback();
            }
            callback(new Error('邮箱格式错误'));
        };
        return {
            commentForm:{
                nickname: '',
                email: '',
                content: '',
                parentCommentId: -1,
                blogId: this.$route.params.blogId,
            },
            commentFormRules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'change'},
                ],
                content: [
                    { required: true, message: '请输入评论内容', trigger: 'change'},
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'change'},
                    {validator: checkEmail, message:'请输入正确的邮箱', trigger: 'change'},
                ],
            },
            commentPlaceholder: "请输入内容",
            // 目录标签的所属类，用于改变样式
            dirClass: '',
            blog: {},
        }
    },
    methods: {
        // 获取博客内容等
        async getBlog() {
            const res = await getRenderedBlogById(this.$route.params.blogId);
            console.log(res);
            this.blog = res.data;
        },
        scrollHandler(event) {
            // console.log(this.$refs.sideRef)
            // 根据目录标签距离顶部距离来实现贴合效果
            if (this.$refs.sideRef.$el.getBoundingClientRect().top < 0) {
                this.dirClass = 'dir-sticky'
            } else {
                this.dirClass = ''
            }
        },
    },
}
</script>

<style lang='less' scoped>
@import '../style/tocbot.css';
@import "../style/github-mark.css";
.container{
    margin-top: 20px;
}
.title{
    text-align: center;
    line-height: 2;
    font-size: 28px;
    color: #444950;
    font-weight: bold;
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
.thanks{
    text-align: center;
    color: #ccd0d5;
    font-size: 16px;
    padding: 20px;
}
.footer{
    line-height: 2;
    span{
        font-weight: bold;
    }
    a{
        color: #409eff;
    }
}
.foot-tag{
    margin-top: 20px;
    .foot-tag-item{
        display: inline-block;
        color: #409eff;
        font-size: 16px;
        margin: 10px;
    }
}
.comment{
    margin-top: 20px;
    .comment-item{
        margin-bottom: 40px;
    }
    .el-button{
        margin: 10px 10px 20px auto;
        float: right;
    }
    .comment-tips{
        text-align: center;
        color: #ccd0d5;
        font-size: 16px;
        padding: 20px;
    }
    .comment-name, .comment-email{
        display: inline-block;
        margin-right: 10px;
    }
}

.reply{
    font-size: 14px;
    color: #ff8956;
    cursor: pointer;
}

.comment-title{
    font-size: 24px;
    font-weight: 600;
    color: #444950;
    margin-bottom: 20px;
    padding-left: 20px;
    border-left: 4px solid #ff8956;
}

.parent-comment{
    display: flex;
}

.comment-main{
    display: inline-block;
    margin-left: 20px;
    color: #409eff;
    .create-time{
        font-size: 14px;
        color: #ccd0d5;
        margin-top: 10px;
    }
}
.comment-content{
    color: #444950;
    margin-top: 10px;
}

.child-comment{
    display: flex;
    margin-top: 20px;
    padding-left: 60px;
}

.dir-sticky{
    position: fixed;
    top: 60px;
}
.dir-title{
    padding-left: 10px;
    font-size: 18px;
    border-left: 4px solid #409eff;
}

//.content {
//    padding: 60px;
//    line-height: 2;
//}

.markdown-body-my {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}

@media (max-width: 767px) {
    .markdown-body-my {
        padding: 15px;
    }
}
</style>