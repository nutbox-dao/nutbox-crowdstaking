<template>
  <div>
    <span class="text-grey-light">
      {{ percent + " " }}
    </span>
    <span>
      {{ " " + fundInfo && fundInfo.funds.length + " " }}
    </span>
    <span class="text-grey-light"> contributors </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    paraId: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters(["getFundInfo"]),
    fundInfo() {
      return this.getFundInfo(this.paraId);
    },
    
    percent() {
      if (!this.fundInfo) return;
      return (
        this.fundInfo.cap.isZero()
        ? "100.00%"
        : (this.fundInfo.raised.muln(10000).div(this.fundInfo.cap).toNumber() / 100).toFixed(2) + "% "
      );
    },
  },
};
</script>

<style lang="less" scoped>
</style>