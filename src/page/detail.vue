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
            <el-card v-if="blog.commentEnable" class="comment">
                <el-card shadow='never'>
                    <div class="comment-title">
                        评论区
                    </div>
                    <div class="comment-item" v-for="comment in comments" :key="comment.id">
                        <div class="parent-comment">
                            <el-avatar v-if="comment.avatar !== '' && comment.avatar !== null" :src='comment.avatar'></el-avatar>
                            <el-avatar v-else src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></el-avatar>
                            <div class="comment-main">
                                <div class="comment-info">
                                    <div class="nickname">{{comment.nickname}}</div>
                                    <div class="create-time">{{comment.createTime | dateFormat}}</div>
                                </div>
                                <div class="comment-content">
                                    {{comment.content}}
                                </div>
                            </div>
                            <div class="reply" @click="onReply(comment.id, comment.nickname)">
                                回复
                            </div>

                        </div>
                        <div class="child-comment" v-for="childComment in comment.replyComments" :key="childComment.id">
                            <el-avatar v-if="childComment.avatar !== '' && childComment.avatar !== null" :src='childComment.avatar'></el-avatar>
                            <el-avatar v-else src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></el-avatar>
                            <div class="comment-main">
                                <div class="comment-info">
                                    <div class="nickname">{{childComment.nickname}}</div>
                                    <div class="create-time">{{childComment.createTime | dateFormat}}</div>
                                </div>
                                <div class="comment-content">
                                    {{childComment.content}}
                                </div>
                            </div>
                            <div class="reply" @click="onReply(childComment.id, childComment.nickname)">
                                回复
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow='never'>
                    <el-form
                        :model="commentForm"
                        :rules="commentFormRules"
                        ref="commentFormRef">
                        <div v-if="userInfo.id !== ''" class="user-info">
                            <el-avatar :src='userInfo.avatar'></el-avatar>
                            <span>小切</span>
                        </div>
                        <div v-else class="login">
                            <a href="/admin">登录</a><span>发表评论</span>
                        </div>
                        <el-form-item prop="content">
                            <el-input
                                ref="commentContentRef"
                                type="textarea"
                                :placeholder="commentPlaceholder"
                                :rows="6"
                                v-model="commentForm.content"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary"
                               size="mini"
                               @click="publishComment"
                                :disabled="userInfo.id === ''">发布</el-button>
                    <el-button type="info" size="mini" @click="clearComment">重置</el-button>
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
import {addComment, getCommentsByBlogId, getRenderedBlogById, getUserById} from "@/utils/api";
export default {
    name: 'detail',
    async created() {
        await this.getBlog();
        await this.getComment();
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
        await this.getUserInfo();
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
                avatar: '',
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
            comments:[],
            // 如果登录了则获取用户信息
            userInfo :{
                id: ""
            }
        }
    },
    methods: {
        // 获取博客内容等
        async getBlog() {
            const res = await getRenderedBlogById(this.$route.params.blogId);
            console.log(res);
            this.blog = res.data;
        },
        // 如果登录了则获取用户信息
        async getUserInfo() {
            let userId = window.sessionStorage.getItem("userId");
            if (userId !== null) {
                const res = await getUserById(userId);
                console.log(res);
                this.userInfo = res.data;
                this.commentForm.avatar = res.data.avatar;
                this.commentForm.email = res.data.email;
                this.commentForm.nickname = res.data.nickname;
            }
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
        // 获取当前页的评论信息
        async getComment() {
            const res = await getCommentsByBlogId(this.$route.params.blogId);
            console.log(res)
            if (res.code === 200) {
                this.comments = res.data
            } else {
                this.$message.error('获取评论数据失败:' + res.message)
            }
            this.comments.forEach(comment => {
                // 对每个一级评论的子评论进行扁平化处理
                // 处理之后，评论只有两级
                comment.replyComments = this.traverse(comment.nickname, comment.replyComments)
            });
            console.log(this.comments)
        },

        /**
         * 将多级评论转化为数组评论，并在评论内容前加上对应的 @fatherName
         * @param comments 需要扁平化处理的评论数组(多级评论)
         * @param fatherName 当前评论数组的父亲名称
         * @return *[]
         */
        traverse(fatherName, comments) {
            if (comments.length === 0) {
                return []
            }
            let results = []
            comments.forEach( comment => {
                comment.content = `@${fatherName}：${comment.content}`
                results.push(comment)
                results = [...results, ...this.traverse(comment.nickname, comment.replyComments)]
                // 遍历完孩子之后，将孩子置为空
                comment.replyComments = []
            })
            return results
        },
        // 点击回复时触发的回调
        onReply(parentId, parentNickName) {
            console.log(parentId, parentNickName)
            this.commentForm.parentCommentId = parentId
            this.commentPlaceholder = `@${parentNickName}`
            this.$refs.commentFormRef.$el.scrollIntoView({behavior:'smooth'})
        },
        // 发布评论
        publishComment() {
            this.$refs.commentFormRef.validate(async valid => {
                if (!valid) {
                    return
                }
                const res = await addComment(this.commentForm);
                console.log(res);
                if (res.code !== 200) {
                    this.$message.error(res.message);
                    return;
                }
                this.$message.success("发布成功!");
                this.clearComment();
                await this.getComment();
            })
        },
        // 重置评论
        clearComment() {
            this.commentForm.content = ''
            this.commentForm.parentCommentId = -1
            this.commentPlaceholder = "请输入内容"
            this.$refs.commentFormRef.resetFields();
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

.user-info {
    display: flex;
    align-items: center;
    margin: 10px 0;
    color: #409eff;
    span{
        display: inline-block;
        margin-left: 10px;
    }
}

.login{
    a{
        color:#409eff ;
        display: inline-block;
        margin: 10px 5px;
    }
}

</style>