<template>
  <div>
    <button @click="connect" class="primary-btn">Connect Wallet</button>
  </div>
</template>

<script>
export default {
  name: "ConnectWallet",
  props: {
    width: {
      type: String,
      default: "160px",
    },
    height: {
      type: String,
      default: "38px",
    },
    radius: {
      type: String,
      default: "8px",
    },
  },
  computed: {
    style() {
      return (
        "width:" +
        this.width +
        ";" +
        "height:" +
        this.height +
        ";" +
        "border-radius:" +
        this.radius +
        ";"
      );
    },
  },
  methods: {
    connect() {},
  },
};
</script>

<style lang="less" scoped>
</style>
