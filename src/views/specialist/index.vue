<template>
    <div class="box">
        <main>
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>

<script>
    // import asideNav from "./asidenav";
    export default {
        components: {
            // asideNav
        }
    }
</script>

<style>
.box{
    display: flex;
    width:100%;
}
main {
        width: 100%;
        height: auto;
        /* background: #fff; */
        /* box-shadow: 1px 1px 8px #ccc; */
    }
</style>


