<template>
    <div>
        <div class="tag-info">
            <div class="tag-head">
                <span class="title">{{info.title}}</span>
            </div>
            <div class="tag-body">
                {{info.info}}
                <a :href="info.link">[ 百科 ]</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        info: {
            type: Object
        }
    }
}
</script>

<style>
.tag-info {
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.24);
    padding: 15px;
    margin-bottom: 20px;
}

.tag-info .tag-head .title {
    font-weight: 500;
    font-size: 18px;
}

.tag-info .tag-head .icon .iconfont {
    font-size: 20px;
}

.tag-info .tag-body {
    color: #666;
    margin-top: 15px;
}

.tag-info .tag-body a {
    color: #005F3C;
    display: inline-block;
}
</style>
