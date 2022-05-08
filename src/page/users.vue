<template>
    <div class="container">
        <div class="title">
            当前所有用户
        </div>
        <el-divider></el-divider>
        <div class="user-content">
            <userItem v-for="userinfo in userList" :userInfo="userinfo" :key="userinfo.id" class="user-item"/>
        </div>

    </div>
</template>

<script>
import userItem from "@/components/userItem";
import {getAllUsers} from "@/utils/api";

export default {
    name: "users",
    created() {
        this.getUsers();
    },
    components: {
        userItem
    },
    data() {
        return {
            userList: [],
        }
    },
    methods: {
        async getUsers() {
            const res = await getAllUsers();
            console.log(res);
            this.userList = res.data;
        }
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