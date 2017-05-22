<template>
  <div>
    <div class="article-box" v-if="render==true">
      <div class="article-header">
        <h1 class="article-title">{{info.title}}</h1>
        <div class="article-meta">
          <span class="date">{{info.meta.createAt | formatTime}}</span>
          <span class="tag">标签：
            <b v-for="item in info.tag">{{item.title}} </b>
          </span>
          <span class="view">阅读 {{info.view_count}}</span>
          <span class="comment">评论 ({{info.comment_count}})</span>
        </div>
      </div>
      <div class="article-content" v-html="remarked(info.content)"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import '../assets/css/atom-one-dark.css'
import moment from 'moment'
export default {
  props: {
    info: {
      type: Object
    },
    render: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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
  },
  filters: {
    formatTime(value) {
      return moment(value).format('YYYY/MM/DD')
    },
  }
}
</script>

<style>
.article-box .article-header {
  margin-bottom: 20px;
  padding: 25px 0;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.article-box .article-header .article-title {
  font-size: 26px;
  line-height: 36px;
  color: #555;
  margin: 0 auto;
}

.article-box .article-header .article-meta {
  font-size: 12px;
  color: #999;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  margin-top: 10px;
}

.article-box .article-header .article-meta span {
  margin: 0 15px;
}

.article-content {
  font-size: 15px;
  line-height: 25px;
  word-wrap: break-word;
  margin-bottom: 25px;
  padding: 0 15px;
}

.article-content pre {
  overflow-x: scroll;
  background-color: rgb(232, 232, 232);
  padding: 0 15px;
  border-radius: 4px;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  line-height: initial;
}

.article-content img {
  width: 100%;
}

.article-content h2 {
  font-size: 20px;
  margin: 15px 0;
}

.article-content p {
  line-height: normal;
}
</style>
