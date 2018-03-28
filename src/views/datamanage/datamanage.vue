<template>
    <div class="box">
        <asideNav></asideNav>
        <main>
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>

<script>
    import asideNav from "./asidenav";
    export default {
        components: {
            asideNav
        }
    }
</script>

<style>
.box{
    display: flex;
}
main {
        width: 1136px;
        height: 670px;
        border: 1px solid red;
        background: #fff;
    }
</style>


