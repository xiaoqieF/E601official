<template>
    <div class="container" >
        <div class="header">
            <el-row>
                <el-col :offset="6" :span="12">
                    <div class="nav-item">
                        <router-link to="/home">首页</router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/home">成员</router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/home">关于</router-link>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="login">
                        <router-link to="/admin">登录</router-link>
                        <span>|</span>
                        <span class="sign">注册</span>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!--主体部分-->
        <el-row>
            <el-col :offset="2" :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>

        <!-- 底部信息 -->
        <div class="footer">
            <div class="copyright">
                <span>Copyright © 2021~2022 | </span> <el-link class="foot-link" target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备2021039158号-1</el-link>
            </div>
            <div>
                <span>Designed by 小切</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            
        }
    },
}
</script>

<style lang='less' scoped>
.container{
    height: 100%;
}

.header{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    background-color: rgba(0,92,169, 1);
    .nav-item{
        display: inline-block;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        font-weight: 500;
        padding: 0 15px;
        a{
            color: #eeeeee;
        }
    }
    .nav-item:hover{
        background-color: #999;
    }

    .login{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        color: #eee;
        .sign{
            margin-left: 10px;
            cursor: pointer;
        }
        span:hover{
            color: #999;
        }
        a{
            color: #eee;
            display: inline-block;
            margin-right: 10px;
        }
        a:hover{
            color: #999;
        }
    }
}

.footer{
    height: 100px;
    width: 100%;
    margin-top: 100px;
    text-align: center;
    background-color: rgba(0,92,169, 1);
    font-size: 16px;
    .foot-link{
        font-size: 16px;
        color: rgb(243, 75, 75);
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
</style>