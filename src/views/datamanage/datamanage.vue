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
        height: auto;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
    }
</style>


