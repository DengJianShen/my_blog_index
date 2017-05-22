<template>
    <ul class="m-nav" v-if="show==true">
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
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showMessage() {
            this.$bus.$emit('toggleShow', true);
        }
    },
    watch: {
        show() {
            const that = this;
            that.$bus.$emit('mNavShow', that.show);
        }
    }
}
</script>

<style>
.m-nav {
    margin-top: -15px;
    margin-bottom: 15px;
    width: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    background-color: #fff;
}

.m-nav li {
    width: 50%;
    text-align: center;
    height: 35px;
    line-height: 35px;
}

.m-nav li:nth-of-type(1) a {
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.m-nav li:nth-of-type(2) a {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.m-nav li:nth-of-type(3) a {
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.m-nav li:nth-of-type(4) a {
    border-bottom: 1px solid #ccc;
}

.m-nav li a {
    color: #333;
    width: 100%;
    height: 100%;
    display: inline-block;
}

.m-nav li a.router-link-active {
    color: #1ab394;
    border-bottom-color: #1ab394;
}
</style>
