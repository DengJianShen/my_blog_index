<template>
    <div>
        <div class="notice-list">
            <ul class="notice-head">
                <li class="active">网站公告</li>
            </ul>
            <ul class="notice-body">
                <li v-for="(item,index) in info">
                    <span class="text">{{item.title}}</span>
                    <span class="time">{{item.meta.createAt | formatTime}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        info: {
            type: Array
        }
    },
    filters: {
        formatTime(value) {
            return moment(value).format('MM/DD')
        }
    }
}
</script>

<style>
.notice-list {
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #eaeaea;
}

.notice-list .notice-head {
    background-color: #fbfbfb;
    line-height: 36px;
    height: 36px;
    border-bottom: 1px solid #eaeaea;
}

.notice-list .notice-head li {
    float: left;
    width: 25%;
    text-align: center;
    color: #999;
    border-right: 1px solid #eaeaea;
    cursor: pointer;
}

.notice-list .notice-head li.active {
    background-color: #fff;
    color: #666;
    font-weight: bold;
    cursor: default;
}

.notice-list .notice-body {
    width: 100%;
    padding: 15px;
    color: #666;
    font-size: 13px;
    line-height: 24px;
}

.notice-list .notice-body li {
    transition: color .3s;
    -webkit-transition: color .3s;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 44px;
    position: relative;
}

.notice-list .notice-body .time {
    cursor: default;
    color: #bbb;
    position: absolute;
    right: 0px;
}
</style>
