<template>
    <div class="container">
        <div class="title">
            当前所有用户
        </div>
        <el-divider></el-divider>
        <div class="user-content">
            <userItem class="user-item"/>
            <userItem class="user-item"/>
            <userItem class="user-item"/>
            <userItem class="user-item"/>
        </div>

    </div>
</template>

<script>
import userItem from "@/components/userItem";
export default {
    name: "users",
    components: {
        userItem
    }
}
</script>

<style lang="less" scoped>
.container{
    margin-top: 20px;
    box-shadow: 2px 2px 5px #eee;
    padding: 20px;
}
.title{
    text-align: center;
    font-size: 24px;
    font-weight: 600;

}
.user-content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .user-item{
        margin-bottom: 20px;
    }
}
</style>