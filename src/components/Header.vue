<template>
    <div>
        <div class="header">
            <span class="header-btn back" @click="backPage()">
                <i class="iconfont">&#xe605;</i>
            </span>
            <div class="container">
                <a href="#">
                    <img src="http://djshen.cn/Blog/logo.png" height="52">
                </a>
                <ul class="nav clearfix">
                    <li>
                        <router-link to="/index">首页</router-link>
                    </li>
                    <li>
                        <router-link to="/mylist">我的文章</router-link>
                    </li>
                    <li>
                        <a href="javascript:;" @click="showMessage()">给我留言</a>
                    </li>
                    <li>
                        <a href="http://www.djshen.cn/mine">关于我</a>
                    </li>
                </ul>
            </div>
            <span class="header-btn menu" @click="showMenu()">
                <i class="iconfont">&#xe61f;</i>
            </span>
        </div>
    </div>
</template>

<script>
import SmallMenu from './SmallMenu'
export default {
    data() {
        return {
            menuListShow: false
        }
    },
    methods: {
        backPage() {
            window.history.go(-1);
        },
        showMenu() {
            const that = this;
            that.menuListShow = !that.menuListShow;
            that.$bus.$emit('showMenu', that.menuListShow);
        },
        showMessage() {
            this.$bus.$emit('toggleShow', true);
        }
    },
    components: {
        SmallMenu
    }
}
</script>

<style>
.header {
    width: 100%;
    height: 80px;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: #fff;
    margin-bottom: 15px;
    border-bottom: 1px solid #eaeaea;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .03);
}

.header .container {
    -webkit-justify-content: space-between;
    justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    padding: 0 15px;
}

.header .header-btn {
    display: inline-block;
    position: absolute;
    top: 50%;
    margin-top: -21px;
    z-index: 3;
    display: none;
}

.header .header-btn.back {
    left: 5px;
}

.header .header-btn.menu {
    right: 15px;
    margin-top: -21px;
    font-size: 26px;
}

.header .header-btn.menu .iconfont {
    font-size: 24px;
}

.header .iconfont {
    font-size: 30px;
    color: #999;
}

.nav li {
    float: left;
}

.nav li a {
    display: block;
    padding: 0 15px;
    color: #666;
    font-size: 18px;
}

.nav li a:hover {
    color: #1ab394;
}

.nav li a.router-link-active {
    color: #1ab394;
}
</style>
