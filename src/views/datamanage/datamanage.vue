<template>
  <div>
      <Header></Header>
      <div class="conten">
        <asideNav></asideNav>
        <Main></Main>
      </div>
  </div>
</template>

<script>

import Header from '@/components/common/Header'

import asideNav from './asidenav'

import Main from './main'

export default {
    components:{
        Header,
        asideNav,
        Main
    }
}
</script>

<style>
    .conten{
        height:100%;
        background: #edecec;
        display: flex;
    }
</style>


