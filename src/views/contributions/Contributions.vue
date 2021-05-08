<template>
  <div class="contribution-page">
    <div class="container">
      <div class="font-bold font32 mt-3 mb-3 text-left">
        {{ $t("account.contributions") }}
      </div>
      <div class="container" v-for="chain in chainName" :key="chain">
        <UserContributions :chain="chain" />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { CHAIN_NAME } from "../../config";
import UserContributions from "../../components/UserContributions.vue";

export default {
  name: "Contributions",
  components: {
    UserContributions,
  },
  data() {
    return {
      chainName: Object.values(CHAIN_NAME),
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
.contribution-page {
  height: 100%;
  background: rgba(246, 247, 249, 1);
  overflow: scroll;
  position: relative;
  padding-top: 4.6rem;
}
</style>
