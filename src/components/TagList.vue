<template>
    <div>
        <div class="tag-list">
            <SidebarTitle title="文章标签"></SidebarTitle>
            <div class="tag-box">
                <a v-for="(item,index) in listdata" href="javascript:;" @click="goPage(item._id,index)">
                    <span class="text">{{item.title}} ({{item.articles.length}})</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarTitle from './SidebarTitle'
export default {
    props: {
        listdata: {
            type: Array
        }
    },
    methods: {
        goPage(id, index) {
            this.$bus.$emit('change-tag-taglist', index);
            this.$router.push({ path: '/mylist/' + id })
        }
    },
    components: {
        SidebarTitle
    }
}
</script>

<style>
.tag-list {
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #eaeaea;
}

.tag-list .tag-box {
    padding: 15px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}

.tag-list .tag-box a {
    width: 33.33333333333%;
    padding: 3px;
}

.tag-list .tag-box a .text {
    font-size: 12px;
    color: #999;
    background-color: #f6f6f6;
    text-align: center;
    display: inherit;
    line-height: 30px;
    transition: all .2s;
    -webkit-transition: all .2s;
}

.tag-list .tag-box a .text:hover {
    background-color: #1ab394;
    color: #fff;
}
</style>
