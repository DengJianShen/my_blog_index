<template>
    <div>
        <ul class="article-list">
            <li @click="goPage(item._id)" v-for="item in listdata">
                <h2>{{item.title}}</h2>
                <div class="tag-box">
                    <span class="tag" v-if="item.tag.length==0">无标签</span>
                    <span class="tag" v-else v-for="tags in item.tag">{{tags.title}}</span>
                </div>
                <div class="article">{{item.content}}</div>
                <div class="info">
                    <span class="view-count">
                        <i class="iconfont">&#xe628;</i>{{item.view_count}}</span>
                    <span class="comment-count">
                        <i class="iconfont">&#xe69d;</i>{{item.comment_count}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import '../assets/css/atom-one-dark.css'
export default {
    props: {
        listdata: Array
    },
    methods: {
        goPage(id) {
            this.$router.push({ path: '/article/' + id })
        },
        remarked(value) {
            return marked(value);
        }
    },
    mounted() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return highlight.highlightAuto(code).value
            }
        })
    }
}
</script>

<style>
.article-list li {
    border: 1px solid #eaeaea;
    padding: 20px;
    overflow: hidden;
    background-color: #fff;
    cursor: pointer;
}

.article-list li:hover h2 {
    color: #1ab394;
}

.article-list li h2 {
    color: #555;
    font-size: 18px;
}

.article-list li .tag-box {
    padding: 10px 0;
}

.article-list li .tag-box .tag {
    padding: 4px 8px;
    margin-right: 10px;
    background-color: #1ab394;
    color: #fff;
    font-size: 12px;
}

.article-list li .article {
    color: #999;
    word-wrap: break-word;
    line-height: 20px;
    margin-bottom: 10px;
    max-height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.article-list li .info {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    color: #999;
}

.article-list li .info .iconfont {
    margin-right: 5px;
}
</style>
