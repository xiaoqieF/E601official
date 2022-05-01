<template>
    <div class="container" >
        <div class="header" :class="navClass">
            <el-row>
                <el-col :offset="6" :span="12">
                    <div class="nav-item">
                        <router-link to="/home"><span class="iconfont icon-home" style="font-size: 20px"> </span>首页</router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/users"><span class="iconfont icon-person" style="font-size: 20px"> </span>成员</router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/about"><span class="iconfont icon-folder-open" style="font-size: 20px"> </span>关于</router-link>
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
        <el-carousel height="80vh" :autoplay="true" :interval="5000">
            <el-carousel-item>
                <img src="../assets/11.jpg" alt="" style="width: 100%">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../assets/Panos_00050305.jpeg" style="width: 100%" alt="">
            </el-carousel-item>
        </el-carousel>

        <!--主体部分-->
        <el-row>
            <el-col :offset="2" :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>

        <!-- 底部信息 -->
        <div class="footer">
            <div class="copyright">
                <span>Copyright © 2021~2022 | </span> <a class="foot-link" target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备2021039158号-1</a>
            </div>
            <div>
                <span>Designed by <a href="#" style="color: #bbb">小切</a></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    mounted() {
        window.addEventListener('scroll', this.scrollHandler)
        this.lastHeight = window.scrollY
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler)
    },
    data() {
        return {
            navClass: 'header-nav-top',
            // 滚动页面所处高度
            lastHeight: 0,
        }
    },
    methods: {
        scrollHandler(event) {
            let height = event.srcElement.scrollingElement.scrollTop
            if (height > this.lastHeight) {
                // console.log('下滚')
                this.navClass = 'header-nav-down'
            } else if (height < this.lastHeight) {
                // console.log('上滚')
                this.navClass = 'header-nav-up'
            }
            if (height === 0) {
                this.navClass = 'header-nav-top'
            }
            this.lastHeight = height
        },
    }
}
</script>

<style lang='less' scoped>
.container{
    height: 100%;
}

.header{
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: transparent;
    transition: transform 0.2s linear;
    .nav-item{
        display: inline-block;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        font-weight: 500;
        padding: 0 15px;
        color: #fff;
        a{
            color: #fff;
            display: inline-block;
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
        color: #fff;
        .sign{
            margin-left: 10px;
            cursor: pointer;
        }
        span:hover{
            color: #999;
        }
        a{
            color: #fff;
            display: inline-block;
            margin-right: 10px;
        }
        a:hover{
            color: #999;
        }
    }
}

.header-nav-down{
    background-color: #333;
    transform: translateY(-100%);
}
.header-nav-up{
    transform: translateY(0);
    background-color: #333;
}

.footer{
    height: 100px;
    width: 100%;
    margin-top: 100px;
    text-align: center;
    background-color: #333;
    font-size: 16px;
    color: #eee;
    .foot-link{
        font-size: 16px;
        color: #bbb;
    }
    .foot-link:hover{
        color: #999;
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