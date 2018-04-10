<template>
    <div class="progress">
        <div class="progress_bar" :style="{width:progress}"></div>
    </div>
</template>

<script>
    export default {
        props:['progress']
    }
</script>

<style>
    .progress {
        width: 200px;
        height: 18px;
        margin: 0px 8px;
        background: #e2e0e0;
        border-radius: 12px;
    }
    .progress .progress_bar {
        height: 18px;
        background: #61aef8;
        border-radius: 12px;
    }
</style>

