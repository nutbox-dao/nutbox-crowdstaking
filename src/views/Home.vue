<template>
  <div class="home-page">
    <div class="bg"></div>
    <div class="container">
      <div class="banner-box">
        <b-carousel
          id="carousel-1"
          :interval="3000"
          indicators
          img-height="20rem"
          background="RGBA(246, 247, 249, 0)"
          style="text-shadow: 1px 1px 2px #333;"
        >
<!--          <b-carousel-slide v-for="(item, index) of bannerImg" :key="index"-->
<!--                            :img-src="item">-->
<!--            <template>-->
<!--              <div class="row">-->
<!--                <div class="col-md-7">-->
<!--                  <div class="font40 font-bold text-black">The Scalable, Multichain <br>-->
<!--                    Network for Radical Innovation.</div>-->
<!--                  <p class="text-grey font14">Unprecedented interoperability and scalability for blockchain developers-->
<!--                    who want to quickly push the limits of what’s possible.</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </template>-->
<!--          </b-carousel-slide>-->
          <b-carousel-slide v-for="(item, index) of bannerImg" :key="index"
                            img-blank img-alt="Blank image">
            <template>
              <div class="row">
                <div class="col-md-7">
                  <div class="font40 font-bold text-black" style="line-height: 2.2rem">The Scalable, Multichain <br>
                    Network for Radical Innovation.</div>
                  <p class="text-grey font14">Unprecedented interoperability and scalability for blockchain developers
                    who want to quickly push the limits of what’s possible.</p>
                </div>
              </div>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class='crowd-select card-1' @click="goto('/kusama')">
            <img src="~@/static/images/kusama-logo.png" alt="">
            <div class="font28 font-bold mt-2 mb-4">{{ 'Kusuma ' + $t('homePage.crowdloan') }}</div>
            <button class="primary-btn">{{ $t('homePage.enter') }}</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="crowd-select card-2">
            <img src="~@/static/images/polkadot-logo.png" alt="">
            <div class="font28 font-bold mt-2 mb-4">{{ 'Polkadot ' + $t('homePage.crowdloan') }}</div>
            <button class="primary-btn">{{ $t('homePage.enter') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountConnector from '../components/Wallet/AccountConnector'

export default {
  components: {
    AccountConnector
  },
  data () {
    return {
      bannerImg: [
        'https://picsum.photos/1024/480/?image=52',
        // 'https://picsum.photos/1024/480/?image=54',
        // 'https://picsum.photos/1024/480/?image=55',
        // 'https://picsum.photos/1024/480/?image=56'
      ]
    }
  },
  methods: {
    goto (network) {
      this.$router.push(network)
    }
  }
}
</script>
<style scoped lang="less">
.home-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  overflow: auto;
  margin-bottom: 2rem;
  padding-top: 3.6rem;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30rem;
    background-image: url("~@/static/images/bg.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center top;
  }
  .banner-box {
    height: 20rem;
    overflow: hidden;
    padding: 3rem 0;
    border-radius: 1.4rem;
  }
}

#account{
  display: flex;
  flex-direction: row-reverse;
}
.crowd-select{
  width: 100%;
  height: 16rem;
  margin-top: 40px;
  border-radius: 1.4rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &.card-1 {
    border-bottom: 4px solid #000000;
  }
  &.card-2 {
    border-bottom: 4px solid #E61C84;
  }
  img {
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 3.2rem;
    margin: 0 auto;
    border: 1px solid #E3E5E8;
  }
}
.crowd-select:hover{
  cursor: pointer;
}
</style>
