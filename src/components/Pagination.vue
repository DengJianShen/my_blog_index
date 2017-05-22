<template>
  <div>
    <div class="pagination">
      <ul>
        <li class="prev-page" @click="togglePage(selected - 1)">上一页</li>
        <li v-for="i in (Math.ceil(total / limit))" :class="{active:i == selected}" @click="togglePage(i)">{{i}}</li>
        <li>...</li>
        <li class="next-page" @click="togglePage(selected + 1)">下一页</li>
        <li>共 {{Math.ceil(total / limit)}} 页</li>
      </ul>
    </div>
  
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selected: 1
    }
  },
  methods: {
    togglePage(page) {
      const that = this;
      if (page == 0) {
        alert('已是首页');
      } else if (page > (Math.ceil(that.total / that.limit))) {
        alert('已是尾页');
      } else {
        that.selected = page;
        that.$bus.$emit('on-change', page);
      }
    }
  },
}
</script>

<style>
.pagination {
  border-radius: 4px;
  margin: 0;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
}

.pagination ul li {
  margin: 0 2px;
  float: left;
  padding: 5px 12px;
  background-color: #ddd;
  color: #666;
  border-radius: 2px;
  opacity: .88;
}

.pagination ul li:hover {
  cursor: pointer;
}

.pagination ul li.active {
  background-color: #1ab394;
  color: #fff;
}
</style>

