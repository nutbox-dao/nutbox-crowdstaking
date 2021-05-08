<template>
  <div id="app">
    <div class="page-container">
      <div class="page-header">
        <div class="container">
          <b-navbar toggleable="lg">
            <b-navbar-brand>
              <img src="~@/static/images/logo.png" alt="" class="logo-brand"
                   @click="selectMenu('home', '/')">
            </b-navbar-brand>
            <div class="mobile-menu">
              <div v-b-toggle.sidebar-backdrop>
                <img src="~@/static/images/menu-btn.svg" alt="">
              </div>
              <b-sidebar id="sidebar-backdrop" right no-header ref="sidebar"
                         width="60%" sidebar-class="menu-sidebar"
                         backdrop-variant="dark" backdrop z-index="100">
                <div class="close-btn">
                  <img v-b-toggle.sidebar-backdrop.close src="~@/static/images/close.svg" alt="">
                </div>
                <div class="v-menu">
                  <div class="v-menu-item flex-start-center">
                    <img src="~@/static/images/logo.png" alt="" class="logo-brand"
                         @click="selectMenu(0, '/')">
                  </div>
                  <div class="v-menu-item flex-start-center" v-for="item,idx of vMenuOptions" :key="idx"
                       @click="selectMenu(item.id, item.url)">
                    <div class="v-menu-line" :class="item.id === activeNav?'active':''"></div>
                    <span class="font-bold">{{item.label}}</span>
                  </div>
                </div>
              </b-sidebar>
            </div>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="mr-auto">
                <b-nav-item v-for="item of hMenuOptions" :key="item.id"
                            href="javascript:void(0)" :class="activeNav === item.id? 'active':''"
                            @click="selectMenu(item.id, item.url)">{{ item.label }}
                </b-nav-item>
              </b-navbar-nav>
              <div class="mobile-address">
                <p style="word-break: break-all">{{ account && account.address}}</p>
              </div>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="pc-menu">
                <b-nav-item class="user-address">
                  <div v-if="isConnected" class="p-2">
                    <b-dropdown toggle-class="accounts-toggle" variant="text" right no-caret>
                      <template #button-content>
                        <div class="flex-between-center font18" @click="accountsPop=!accountsPop">
                          <Identicon :size='30' theme='polkadot' v-if="account" :value="account.address"/>
                          <b-avatar v-else class="mr-2" size="sm" text=""></b-avatar>
                          <span style="margin-left:8px">{{ formatUserAddress(account && account.meta.name) }}</span>
                        </div>
                      </template>
                      <b-dropdown-item v-for="(item,index) of (allAccounts ? allAccounts : [])" :key="index" @click="changeAccount(item)">
                        <template>
                          <div class="flex-between-center">
                            <Identicon class="ident-icon" :size='30' theme='polkadot' :value="item.address"/>
                            <div class="account-info">
                              <div class="font-bold">{{ item.meta.name }}</div>
                              <div>{{ formatUserAddress(item.address) }}</div>
                            </div>
                            <img class="ml-3" v-if="item.address===(account && account.address)" src="~@/static/images/selected.png" alt="">
                          </div>
                        </template>
                      </b-dropdown-item>
                      <b-dropdown-divider v-if="Object.keys(allAccounts || []).length>0"></b-dropdown-divider>
                      <b-dropdown-item>
                        <div class="flex-start-center" @click="selectMenu('contributions', '/contributions')">
                          <!-- <b-avatar square size="sm" class="mr-2" style="opacity: .2">·</b-avatar> -->
                          <img class="menu-icon" :src="contributionsIcon" alt="">
                          <span class="menu-text">{{$t('account.contributions')}}</span>
                        </div>
                      </b-dropdown-item>
                      <b-dropdown-item>
                        <div class="flex-start-center" @click="selectMenu('dashboard', '/dashboard')" v-if="commnunityIds.indexOf(account && account.address) !== -1">
                          <!-- <b-avatar square size="sm" class="mr-2" style="opacity: .2">·</b-avatar> -->
                          <img class="menu-icon" :src="dashboardIcon" alt="">
                          <span class="menu-text">{{ $t('account.dashboard') }}</span>
                        </div>
                      </b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item>
                        <div class="flex-start-center" @click="selectMenu('en', 'en')">
                          <!-- <b-avatar square size="sm" class="mr-2" style="opacity: .2">·</b-avatar> -->
                          <img class="menu-icon" :src="enIcon" alt="">
                          <span class="menu-text">English</span>
                        </div>
                      </b-dropdown-item>
                      <b-dropdown-item>
                        <div class="flex-start-center" @click="selectMenu('zh', 'zh-CN')">
                          <!-- <b-avatar square size="sm" class="mr-2" style="opacity: .2">·</b-avatar> -->
                          <img class="menu-icon" :src="cnIcon" alt="">
                          <span class="menu-text">中文</span>
                        </div>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <ConnectWallet v-else/>
                </b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </div>
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ConnectWallet from './components/Buttons/ConnectWallet'
import Identicon from '@polkadot/vue-identicon'
import { getBalance, loadAccounts } from './utils/account'
import { getCommnunitys } from './apis/api'

export default {
  name: 'App',
  components: {
    ConnectWallet,
    Identicon
  },
  computed: {
    ...mapState([
      'isConnected',
      'allAccounts',
      'account',
      'communitys',
      'lang'
    ]),
    hMenuOptions () {
      return this.menuOptions.filter(item => {
        return item.h
      })
    },
    vMenuOptions () {
      return this.menuOptions.filter(item => {
        return item.v
      })
    },
    menuOptions () {
      return [
        { id: 'home', url: '/', label: this.$t('homePage.home'), h: true, v: false },
        { id: 'kusama', url: '/kusama', label: 'Kusuma ' + this.$t('homePage.crowdloan'), h: true, v: true },
        { id: 'polkadot', url: '/polkadot', label: 'Polkadot ' + this.$t('homePage.crowdloan'), h: true, v: true },
        { id: 'contributions', url: '/contributions', label: this.$t('account.contributions'), h: false, v: true },
        { id: 'dashboard', url: '/dashboard', label: this.$t('account.dashboard'), h: false, v: true },
        { id: 'en', url: 'en', label: "English", h: false, v: true },
        { id: 'zh', url: 'zh-CN', label: "中文", h: false, v: true }
      ];
    },
    contributionsIcon () {
      return this.activeNav === 'contributions' ? require('./static/images/contributions_selected.png') : require('./static/images/contributions.png')
    },
    dashboardIcon (){
      return this.activeNav === 'dashboard' ? require('./static/images/dashboard_selected.png') : require('./static/images/dashboard.png')
    },
    enIcon (){
      return this.lang === 'en' ? require('./static/images/selected.png') : require('./static/images/selected-gray.png')
    },
    cnIcon (){
      return this.lang === 'zh-CN' ? require('./static/images/selected.png') : require('./static/images/selected-gray.png')
    },
    commnunityIds () {
      return this.communitys.map(c => c.communityId)
    }
  },
  data () {
    return {
      accountsPop: false,
      activeNav: 'home',
      menuIsExpand: false,
    }
  },
  watch: {
    $route () {
      this.setActiveMenu()
    }
  },
  mounted () {
    this.$i18n.locale = this.lang;
    getCommnunitys().then(res => {
      console.log('commnituy', res);
      this.$store.commit('saveCommunitys', res)
    })
    this.setActiveMenu()
    loadAccounts()
  },
  async created () {
    this.$store.commit('saveSymbol', 'ROCOCO')
    // await connect();
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    ...mapMutations(['saveAccount', 'saveCommunitys']),
    setActiveMenu () {
      for (let index = 0; index < this.menuOptions.length; index++) {
        if (this.menuOptions[index].url === this.$route.path) {
          this.activeNav = this.menuOptions[index].id
          break
        }
      }
    },
    selectMenu (id, url) {
      if (id == 'zh' || id == 'en'){
        this.$store.commit('saveLang', url);
        this.$i18n.locale = url;
        return
      }
      if (id === this.activeNav || id === 'polkadot') {
        this.$refs.sidebar.hide()
        return
      }
      this.activeNav = id
      this.$router.push(url)
    },
    formatUserAddress (address) {
      if (!address) return 'Loading Account'
      if (address.length < 16) return address
      const start = address.slice(0, 28)
      const end = address.slice(-5)
      return `${start}...`
    },
    showError (err) {
      this.$bvToast.toast(err, {
        title: 'MFund',
        autoHideDelay: 5000,
        variant: 'danger'
      })
    },
    changeAccount (acc) {
      this.saveAccount(acc)
      getBalance(acc)
    }
  }
}
</script>
<style lang="less">
@import 'static/style/common.less';
:root {
  --yellow-background: #f5ecd8;
  --primary-custom: #ffdb1b;
  --primary-text: #242629;
  --secondary-text: #717376;
  --disable: #bdbfc2;
  --dividers: #e3e5e8;
  --background: #f6f7f9;
  --error: #ff5040;
  --success: #50bf00;
  --link: #408fff;
  --warning: #ff9500;
  --backgroud-state: #b37012;
}
#app,
html,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #242629;
  height: 100%;
}
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;
  overflow: hidden;
}
.page-container {
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.spinner-grow {
  margin-right: 8px;
}
.page-header {
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.04) ;
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  z-index: 10;
  .navbar-expand-lg {
    background: transparent;
  }
  .menu-btn {
    display: none;
    position: relative;
    .navbar-toggler {
      opacity: 0;
      width: 1.6rem;
      height: 1.6rem;
    }
    img {
      position: absolute;
      width: 1.6rem;
      height: 1.2rem;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .navbar-brand {
    display: flex;
    align-items: center;
    min-height: 58px;
  }
  .logo-brand {
    height: 2.8rem;
  }
  .navbar {
    padding: 0;
  }
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .navbar-nav .nav-link {
    height: 3.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    font-size: .8rem;
    opacity: .5;
  }
  .navbar-nav .active > .nav-link {
    color: var(--primary-custom);
    opacity: 1;
    border-bottom: 4px solid var(--primary-custom);
  }
  .dropdown-menu {
    border-radius: 1.2rem;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.02);
    border: none;
    margin-top: .5rem;
    min-width: 15rem;
    padding: .8rem;
    .dropdown-item {
      padding: .2rem .5rem;
    }
    .account-info {
      flex: 1;
      font-size: .7rem;
      margin-left: 6px;
    }
    .dropdown-item:hover {
      background: transparent;
    }
    .menu-icon{
      width: 28px;
      height: 28px;
    }
    .menu-text {
      padding: .4rem 0;
      display: inline-block;
      font-size: .7rem;
      font-weight: bold;
    }
  }
  .ident-icon svg {
    margin-right: .5rem;
  }
  .user-address {
    a {
      opacity: 1 !important;
    }
    img {
      width: 23px;
      margin-right: 10px;
    }
  }
  .menu-sidebar {
    padding: 1rem;
    max-width: 320px;
    .close-btn {
      text-align: right;
      img {
        width: 2rem;
      }
    }
    .v-menu-line {
      width: 4px;
      height: 20px;
      background-color: rgba(0,0,0,.05);
      margin-right: 10px;
      &.active {
        background-color: var(--primary-custom);
      }
    }
    .v-menu-item {
      padding: .8rem;
      white-space: nowrap;
    }
  }
}
.page-content {
  flex: 1;
  overflow: hidden;
  z-index: 1;
}
</style>
