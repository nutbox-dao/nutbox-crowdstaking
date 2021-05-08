<template>
  <div class="contribution-page">
    <div class="container">
      <div class="font-bold font32 mt-3 mb-3 text-left">{{ $t('account.dashboard') }}</div>
      <div class="c-tabs-box">
        <div
          class="tab"
          v-for="tab of tabList"
          :key="tab.key"
          :class="activeTab === tab.key ? 'active' : ''"
        >
          {{ tab.label }}
        </div>
      </div>
      <DashboardCard :chain='item.key' v-show="activeTab === item.key" v-for="item of tabList" :key="item.key"/>
    </div>
  </div>
</template>

<script>
import DashboardCard from "../../components/DashboardCard.vue";

export default {
  name: "Dashboard",
  components: {
    DashboardCard,
  },
  data() {
    return {
      activeTab: "ROCOCO",
      tabList: [
        { key: "KUSAMA", label: "Kusama" },
        { key: "POLKADOT", label: "Polkadot" },
        { key: "ROCOCO", label: "Rococo" },
      ],
      cards:[]
    };
  },
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
.table-card {
  border-radius: 1.4rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.02);
  border: none;
}
.Active {
  color: rgba(80, 191, 0, 1);
}
.Retired {
  color: rgba(248, 182, 42, 1);
}
.Completed {
  color: rgba(255, 91, 77, 1);
}
.change-page-box {
  margin: 1rem auto;
}
.c-tabs-box {
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  height: 2.4rem;
  background-color: rgba(227, 229, 232, 1);
  border-radius: 2.4rem;
  margin: 1rem auto 2rem auto;
  .tab {
    flex: 1;
    height: 2.4rem;
    line-height: 2.4rem;
    &.active {
      background-color: var(--primary-custom);
      border-radius: 2.4rem;
    }
  }
}
</style>
