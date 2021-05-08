<template>
  <div id="account-connector">
    <div v-show="isConnected" @click="pageRoute('/user')">
      <p>{{ account }}</p>
      <img src="../../static/images/account.png" alt="" />
    </div>
    <div v-show="!isConnected">
        <ConnectWallet/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ConnectWallet from '../Buttons/ConnectWallet'
export default {
  name: "AccountConnector",
  computed: {
    ...mapState(["isConnected", "account"]),
  },
  components: {
      ConnectWallet,
  },
  methods: {
    pageRoute (url) {
      this.$router.push(url)
    }
  }
};
</script>

<style lang="less" scoped>
#account-connector{
    div{
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        img{
            margin-right: 8px;
            width: 18px;
            height: 18px;
        }
    }
}
</style>
