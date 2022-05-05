<template>
    <el-card shadow="never" class="container">
        <div class="title">
            博客管理
        </div>
        <!-- 博客清单 -->
        <el-table
            :data="blogList"
            stripe
            style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column label="创建时间" width="120px">
                <template v-slot="scope">
                    {{scope.row.createTime | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column label="更新时间" width="120px">
                <template v-slot="scope">
                    {{scope.row.updateTime | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="user.nickname" label="作者" width="60px"></el-table-column>
            <el-table-column label="分类" width="80px">
                <template v-slot="scope">
                    <el-tag size="small">{{ scope.row.type.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="标签" width="250px">
                <template v-slot="scope">
                    <el-tag
                        type="success"
                        size="small"
                        v-for="item in scope.row.tags"
                        :key="item.id"
                        style="margin:5px">
                        {{ item.name }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否发表">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.published" size="small" type="success">是</el-tag>
                    <el-tag v-else size="small" type="danger">否</el-tag>
                </template>
            </el-table-column>
            <!-- 编辑和删除博客操作栏 -->
            <el-table-column label="操作" width="140px">
                <!-- 通过作用域插槽获取组件内部数据 -->
                <template slot-scope="scope">
                    <!-- 修改、删除和分配角色按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini"
                               @click="editBlog(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"
                               @click="deleteBlog(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagin">
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="blogQuery.pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="blogQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalBlogs">
            </el-pagination>
        </div>
        <!-- 分类和标签 -->
        <div class="cate-tag">
            <div class="title">
                分类 &amp; 标签管理
            </div>
            <div class="content">
                <!-- 分类管理 -->
                <el-card shadow="never" class="cate">
                    <div class="cate-tag-title">
                        分类
                    </div>
                    <div class="cate-content">
                        <el-tag
                            v-for="item in cateList"
                            :key="item.id"
                            closable
                            @close="handleCateClose(item.id)">
                            {{ item.name }}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="cateInputVisible"
                            v-model="cateInputValue"
                            ref="saveCateInput"
                            size="small"
                            @keyup.enter.native="handleCateInputConfirm"
                            @blur="handleCateInputConfirm">
                        </el-input>
                        <el-button v-else size="small" @click="showCateInput">+ 添加分类</el-button>
                    </div>
                </el-card>
                <!-- 标签管理 -->
                <el-card shadow="never" class="tag">
                    <div class="cate-tag-title">
                        标签
                    </div>
                    <div class="tag-content">
                        <el-tag v-for="item in tagList"
                                :key="item.id"
                                closable
                                @close="handleTagClose(item.id)"
                                type="success">
                            {{ item.name }}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="tagInputVisible"
                            v-model="tagInputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleTagInputConfirm"
                            @blur="handleTagInputConfirm">
                        </el-input>
                        <el-button v-else size="small" @click="showTagInput">+ 添加标签</el-button>
                    </div>
                </el-card>
            </div>
        </div>
    </el-card>
</template>

<script>
import {getCateByUserId} from "@/utils/api";
import {addCate} from "@/utils/api";
import {deleteCate} from "@/utils/api";
import {getTagsByUserId} from "@/utils/api";
import {addTag} from "@/utils/api";
import {deleteTag} from "@/utils/api";
import {getBlogsByUserId} from "@/utils/api";

export default {
    name: 'manage',
    created() {
        this.getAllCate();
        this.getAllTags();
        this.getAllBlogs();
    },
    data() {
        return {
            blogQuery: {
                pageNum: 1,
                pageSize: 5,
            },
            totalBlogs: 0,
            // 全部分类列表
            cateList: [],
            // 全部标签列表
            tagList: [],
            blogList: [],
            // 分类添加tag框
            cateInputVisible: false,
            cateInputValue: '',
            // 标签添加tag框
            tagInputVisible: false,
            tagInputValue: '',
        }
    },
    methods: {
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
        // 添加分类框确认回调
        async handleCateInputConfirm() {
            if (this.cateInputValue.trim() === '') {
                this.cateInputValue = '';
                this.cateInputVisible = false;
                return;
            }
            const res = await addCate(this.$route.params.id, this.cateInputValue);
            console.log(res);
            if (res.code !== 200) {
                this.$message.error(res.message);
                return;
            }
            await this.getAllCate();
            this.cateInputVisible = false;
            this.cateInputValue = '';
        },
        // 显示输入分类输入框
        showCateInput() {
            this.cateInputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveCateInput.$refs.input.focus();
            })
        },
        // 删除分类时回调
        async handleCateClose(cateId) {
            console.log("cateId:", cateId);
            const res = await deleteCate(cateId);
            console.log(res);
            if (res.code !== 200) {
                this.$message.error(res.message);
                return;
            }
            this.$message.success("删除分类成功！");
            await this.getAllCate();
        },
        // 添加标签框确认回调
        async handleTagInputConfirm() {
            if (this.tagInputValue.trim() === '') {
                this.tagInputValue = '';
                this.tagInputVisible = false;
                return;
            }
            const res = await addTag(this.$route.params.id, this.tagInputValue);
            console.log(res);
            if (res.code !== 200) {
                this.$message.error(res.message);
                return;
            }
            await this.getAllTags();
            this.tagInputVisible = false;
            this.tagInputValue = '';
        },
        // 显示添加标签的输入框
        showTagInput() {
            this.tagInputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            })
        },
        // 删除标签回调
        async handleTagClose(tagId) {
            console.log("tagId:", tagId);
            const res = await deleteTag(tagId);
            console.log(res);
            if (res.code !== 200) {
                this.$message.error(res.message);
                return;
            }
            this.$message.success("删除标签成功！");
            await this.getAllTags();
        },

        async getAllBlogs() {
            const res = await getBlogsByUserId(this.$route.params.id, this.blogQuery);
            console.log(res);
            if (res.code === 200) {
                this.blogList = res.data.blogList;
                this.totalBlogs = res.data.total;
            } else {
                this.$message.error(res.message);
            }
        },
        // 分页页面大小变化后重新获取数据
        handleSizeChange(newSize) {
            this.blogQuery.pageSize = newSize;
        },
        // 当前选择页面变化后重新获取数据
        handleCurrentChange(newPage) {
            this.blogQuery.pageNum = newPage;
        },
        // 删除博客
        async deleteBlog(id) {
            console.log(id);

        },
        editBlog(id) {
            console.log(id);
        }
    },
}
</script>

<style lang='less' scoped>
.container {
    margin-top: 20px;

    .title {
        text-align: center;
        line-height: 2;
        font-size: 28px;
        color: #444950;
        font-weight: bold;
    }
}

.cate-tag {
    margin-top: 20px;

    .cate-tag-title {
        font-weight: bold;
        font-size: 20px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }

    .el-tag {
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .tag {
        margin-top: 20px;
    }

    .input-new-tag {
        width: 90px;
    }
}

.pagin {
    display: flex;
    justify-content: center;

    .el-pagination {
        margin-top: 20px;
    }
}

</style>