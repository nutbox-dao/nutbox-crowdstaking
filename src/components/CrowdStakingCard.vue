<template>
  <div class="c-card">
    <div class="card-title-box flex-start-center">
      <div class="icons">
        <img
          class="icon1"
          :src="cardInfo[communityId].icon"
          alt=""
        />
      </div>
      <div class="title-text font20 font-bold">
        <span>{{ cardInfo[communityId].name }}</span>
      </div>
    </div>
    <div class="h-line"></div>
   
    <div v-if="isConnected">
      <button
        class="primary-btn"
        @click="nominate"
      >
        {{ $t('cs.nominate') }}
      </button>
      <!-- <button
        class="primary-btn"
        v-show="status === 'Retired'"
        @click="showWithdraw = true"
      >
        {{ $t('cs.nominated') }}
      </button> -->
    </div>

      <b-modal
      v-model="showNominate"
      modal-class="custom-modal"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
    >
      <TipNominator
        :communityId="communityId"
        :projectId="projectId"
        @hideContribute="showNominate = false"
      />
    </b-modal>

          <b-modal
      v-model="showBondAndNominator"
      modal-class="custom-modal"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
    >
      <TipBondAndNominator
        :communityId="cardInfo[communityId].communityId"
        :projectId="projectId"
        @hideContribute="showBondAndNominator = false"
      />
    </b-modal>
  </div>
</template>

<script>
import TipBondAndNominator from './TipBoxes/TipBondAndNominator'
import TipNominator from './TipBoxes/TipNominator'
import { mapState } from "vuex";
import { TOKEN_SYMBOL, PARA_STATUS, LOCALE_KEY, Test_Crowdstaking_Data } from "../config";

export default {
  data() {
    return {
      showNominate: false,
      showBondAndNominator: false,
      tokenSymbol: TOKEN_SYMBOL,
      status: PARA_STATUS.COMPLETED,
      cardInfo: Test_Crowdstaking_Data
    };
  },
  props: {
    projectId: {
      type: Number,
    },
    communityId: {
      type: String,
    },
  },
  components: {
    TipBondAndNominator,
    TipNominator
  },
  methods: {
    async nominate() {
      console.log(this.bonded , this.nominators);
      if (this.bonded && this.nominators.length > 0){
        this.showNominate = true
      }else {
        this.showBondAndNominator = true
      }
    }
  },
  computed: {
    ...mapState(["isConnected", "lang", 'bonded', 'nominators']),
    completion() {
    },
  },
  mounted() {
  },
};
</script>

<style lang="less">
.c-card {
  width: 100%;
  border-radius: 1.4rem;
  margin-bottom: 12px;
  overflow: hidden;
  border: none;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.02);
  position: relative;
  padding: 2.2rem 1.2rem;
  background-color: white;
  .status-container {
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 3.4rem;
      height: 3.4rem;
    }
  }
  .card-title-box {
    .icons {
      position: relative;
      margin-right: 2.4rem;
      img {
        width: 2rem;
        height:2rem;
      }
      .icon2 {
        position: absolute;
        left: 1.8rem;
        border: 1px solid #e3e5e8;
        border-radius: 1rem;
      }
      .icon1 {
        position: relative;
        left: 0;
        border: 1px solid #e3e5e8;
        box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.05);
        border-radius: 1rem;
      }
    }
    .title-text{
      display: flex;
      justify-items: center;
      align-items: center;
    }

  }
  .h-line {
    width: 1.6rem;
    height: 0.2rem;
    background: var(--primary-custom);
    margin-top: 1.6rem;
    margin-bottom: 0.8rem;
    border-radius: 4px;
  }
  .detail-info-box {
    margin-bottom: 1.2rem;
  }
  .project-info-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.6rem;
    .name {
      flex: 1;
      text-align: left;
      color: rgba(189, 191, 194, 1);
      font-weight: bold;
    }
    .info {
      // flex: 0.8;
      text-align: right;
      font-weight: 500;
    }
  }
}
</style>
