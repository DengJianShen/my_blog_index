<template>
    <div>
        <h3 class="sidebar-title">{{title}}</h3>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>
<style>
.sidebar-title {
    font-size: 18px;
    color: #666;
    border-bottom: 1px solid #eaeaea;
    background-color: #fbfbfb;
    margin: 0;
    padding: 11px 15px 10px;
}
</style>