<template>
  <div id="back-to-home-btn">
    <router-link to="/">
      <img src="../../static/images/left-arrow.png" alt="" />
      {{ title }}</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Home",
    },
  },
};
</script>

<style lang="less" scoped>
#back-to-home-btn {
  display: flex;
  align-items: center;
  align-content: left;
  font-size: 20px;
  font-weight: 500;
  img {
    margin-right: 12px;
  }
}
#back-to-home-btn:hover {
  cursor: pointer;
}
</style>