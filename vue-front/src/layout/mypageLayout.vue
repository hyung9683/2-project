<template>
<div>
    <nav class="navbar navbar-expand-md navbar-light">
            <button class="navbar-toggler ml-auto mb-2 bg-light" type="button" data-toggle="collapse" data-target="#sidebar">
                <span class="navbar-toggle-icon"></span>
            </button>
        <Header class="header" ref="header" />
            <MyPageSideBar></MyPageSideBar>
            <mypage-side-bar></mypage-side-bar>
            <topbar></topbar>
    </nav>
        <div class="content">
            <router-view></router-view>
        </div>
</div>
</template>

<script>
import MyPageSideBar from './mypagemenu.vue';
import Header from './header.vue';

export default {
    name: 'mypage',
    components: {
        MyPageSideBar, Header
    }
}
</script>

<style scoped>
.content {
    padding-left: 150px;
    margin: auto;
}
</style>