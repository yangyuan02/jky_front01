<template>
    <div>
        <header>
            <div class="systemname" @click="goTo('/home/datamanage')">
                省级政府履行教育职责测评系统
            </div>
            <div class="person_bar">
                <div class="massage">
                    <!-- <i class="iconfont">&#xe60e;</i> -->
                    <!-- <span>截止日期:{{person.end_at}}</span> -->
                    <!-- <i class="iconfont">&#xe614;</i> -->
                    <!-- <span>通知</span> -->
                </div>
                <div class="person">
                    <div class="user" @click="toggle()">
                        <span>{{person.name}}</span>
                        <!-- <i class="iconfont">&#xe656;</i> -->
                    </div>
                    <div class="sub" v-bind:class="{ active: isActive }">
                        <ul>
                            <!-- <li>账户信息</li> -->
                            <li @click="logout()">退出登录</li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <div class="nav">
            <ul>
                <li @click="goTo(nav[person.level][0].path)">
                    <a href="javascript:;" v-bind:class="{ active: 'datamanage'== path|'upload'== path}">{{nav[person.level][0].title}}</a>
                </li>
                <li @click="goTo(nav[person.level][1].path)">
                    <a href="javascript:;" v-bind:class="{ active: 'grade'== path}">{{nav[person.level][1].title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      path: "",
      isActive: true,
      person: {},
      nav: [
        [
          {
            path: "/home/datamanage",
            title: "资料管理"
          },
          {
            path: "/home/grade",
            title: "评分标准"
          }
        ],
        [
          {
            path: "/home/specialist",
            title: "专家预评"
          },
          {
            path: "/home/specialist/grade",
            title: "评分标准"
          }
        ],
        [
          {
            path: "/home/specialist",
            title: "专家预评"
          },
          {
            path: "/home/specialist/grade",
            title: "评分标准"
          }
        ],
        [
          {
            path: "/home/supervisor",
            title: "评估进度"
          },
          {
            path: "/home/supervisor/result",
            title: "评估结果"
          }
        ]
      ]
    };
  },
  methods: {
    ...mapActions(["updataIsData"]),
    goTo(url) {
      console.log(url);
      this.$router.push(url);
      this.updataIsData("/api/role_points");
    },
    getPersonInfo() {
      console.log(window.localStorage.getItem("user"));
      this.person = JSON.parse(window.localStorage.getItem("user"));
      if (this.person.role == "省用户") {
        this.$set(this.person, "level", 0);
      }
      if (this.person.role == "网评专家") {
        this.$set(this.person, "level", 1);
      }
      if (this.person.role == "实地专家") {
        this.$set(this.person, "level", 2);
      }
      if (this.person.role == "督导") {
        this.$set(this.person, "level", 3);
      }
    },
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      this.$router.replace({
        path: "/"
      });
    },
    toggle() {
      this.isActive = !this.isActive;
    },
    getPath() {
      if (this.$route.path.indexOf("upload") != -1) {
        this.path = this.$route.path.slice(6, 12);
      } else {
        this.path = this.$route.path.slice(6);
      }
    }
  },
  created() {
    // console.log(this.person)
    this.getPath();
    this.getPersonInfo();
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.getPath();
    }
  }
};
</script>

<style>
header {
  width: 100%;
  height: 72px;
  background: #327bca;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
}
header .systemname {
  font-size: 20px;
  color: #fff;
  /* margin-left: 30px; */
  /* margin-right: 100px; */
  cursor: pointer;
}
.nav ul {
  display: flex;
}
.nav ul li {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 118px;
  color: #fff;
  height: 42px;
  cursor: pointer;
}
.nav ul li a.active {
  border-bottom: 2px solid #ffce00;
  color: #327bca;
}
header .person_bar {
  width: 140px;
  height: 72px;
  /* margin-left: 410px; */
  display: flex;
  align-items: center;
  color: #fff;
}
header .person {
  width: 116px;
  height: 30px;
  background: #fff;
  border-radius: 40px;
  color: #666;
  text-align: center;
  line-height: 30px;
  position: relative;
  margin-left: 10px;
}
header .person .user span {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
header .person .sub {
  position: absolute;
  top: 32px;
  left: 9px;
  width: 100px;
}
header .person .sub.active {
  display: none !important;
}
header .person .sub ul li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #fff;
  color: #666;
  cursor: pointer;
}
</style>



