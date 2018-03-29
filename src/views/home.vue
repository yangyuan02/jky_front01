<template>
    <div>
        <Header></Header>
        <div class="conten">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/common/Header";
    export default {
        components: {
            Header
        }
    };
</script>

<style>
    .conten {
        height: 100%;
        background: #edecec;
        display: flex;
        padding-top: 16px;
    }
</style>



