<template>
  <div>
    <div class="nav-tag-box">
      <ul class="nav-tag">
        <li v-for="(item,index) in listdata" :class="{active:index==selected}" @click="toggleType(item._id,index)">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listdata: {
      type: Array,
      default:[]
    },
    selected: {
      type: Number,
      default: 0
    }
  },
  methods: {
    toggleType(id, index) {
      this.$bus.$emit('change-tag-nav',index);
      this.$router.push({ path: '/mylist/' + id });
    }
  }
}
</script>

<style>
.nav-tag-box {
  width: 100%;
  height: 34px;
  line-height: 34px;
  background-color: #1ab394;
}

.nav-tag-box .nav-tag {
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  overflow-x: auto;
  padding: 0 15px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.nav-tag-box .nav-tag li {
  padding: 0 10px;
  color: rgba(255, 255, 255, .6);
  cursor: pointer;
}

.nav-tag-box .nav-tag li:hover {
  background-color: rgba(255, 255, 255, .08);
  color: #fff;
}

.nav-tag-box .nav-tag li.active {
  color: #fff;
}
</style>
