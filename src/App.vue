<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 602941 */
  src: url('//at.alicdn.com/t/font_602941_v2x9vvu8bvn53ik9.eot');
  src: url('//at.alicdn.com/t/font_602941_v2x9vvu8bvn53ik9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_602941_v2x9vvu8bvn53ik9.woff') format('woff'),
  url('//at.alicdn.com/t/font_602941_v2x9vvu8bvn53ik9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_602941_v2x9vvu8bvn53ik9.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.clear:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.clear{zoom:1}
html,body,#app{
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color:rgba(0,0,0,0)
}
.move-enter-active,.move-leave-active{
    transition: opacity .5s;
}
.move-enter,.move-leave{
    opacity: 0;
}
div,input{
    box-sizing: border-box;
}
body{
    font-family: "仿宋" !important;
    font-size:14px;
}
body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
    margin: 0;
    padding: 0;
    -moz-user-select:none;-webkit-user-select:none;
    -webkit-tap-highlight-color:transparent;
}
button,
fieldset,
img,
input {
    border: none;
    padding: 0;
    margin: 0;
    outline-style: none;
}
ul,li {
  /* background-color: #ffffff; */
}
ol,
ul {
    list-style: none;
}
input {
    padding-top: 0;
    padding-bottom: 0;
    font-family: "SimSun", "宋体";
}
input,
select {
    vertical-align: middle;
}
input,
select,
textarea {
    font-size: 12px;
    margin: 0;
}
textarea {
    resize: none;
}
/*防止拖动*/
img {
    border: 0;
    vertical-align: middle;
}
/*  去掉图片低测默认的3像素空白缝隙*/
table {
    border-collapse: collapse;
}
/* 去斜体 */
i {
  font-style:normal
}
body {
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
    color: #666;
    background: #fff;
}
a {
    color: #666;
    text-decoration: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    text-decoration: none;
    font-weight: normal;
    font-size: 100%;
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
}
.ac {
    text-align: center;
}
#app{
    width: 1440px;
    min-width: 1440px;
    margin: 0 auto;
}
</style>
