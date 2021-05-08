<template>
  <div class="tip-modal">
    <img
      class="close-btn"
      src="~@/static/images/close.svg"
      alt=""
      @click="hide"
    />
    <div class="tip-contribute">
      <div class="text-center mb-4 font20">
        {{ $t('cs.bond')}}
      </div>
      <div class="input-group-box">
        <div class="label">{{ $t('cs.available')}}: {{ 12 }} DOT</div>
        <div class="flex-between-center">
          <input
            type="number"
            v-model="inputAmount"
          />
        </div>
      </div>
      <button class="primary-btn" @click="confirm" :disabled="isComtribution">
        <b-spinner small type="grow" v-show="isComtribution"></b-spinner>{{ $t('cs.bondAndNominate') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { validAddress } from "../../utils/polkadot";
import BN from "bn.js";

export default {
  data() {
    return {
      inputAmount: "",
      inputNonimator: "",
      paraTokenSymbol: '',
      isComtribution: false,
    };
  },
  props: {
    communityId: {
      type: String,
    },
    projectId: {
      type: Number,
    }
  },
  computed: {
    ...mapState(["symbol", "balance", "lang"]),
    ...mapGetters(["getFundInfo", "decimal"]),
  },
  methods: {
    hide() {
      if (this.isComtribution) return;
      this.$emit("hideContribute");
    },
    checkInput() {
      const reg = /^\d+(\.\d+)?$/;
      const res = reg.test(this.inputAmount);
      if (!res) {
        this.$bvToast.toast("Input error!", {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      this.inputNonimator = this.inputNonimator?.trim()
      if (
        this.inputNonimator &&
        this.inputNonimator.length > 0 &&
        !validAddress(this.inputNonimator)
      ) {
        this.$bvToast.toast(this.$t('tip.wrongNominatorAddress'), {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }

      const amount = parseFloat(this.inputAmount);

      if (amount < 1) {
        this.$bvToast.toast(
          this.$t('tip.belowMinContribution'),
          {
            title: this.$t('tip.tips'),
            autoHideDelay: 5000,
            variant: "warning",
          }
        );
        return;
      }

      // below cap
      const fund = this.getFundInfo(this.paraId);
      const raised = fund.raised;
      const cap = fund.cap;
      const gap = cap.sub(raised);
      if (gap.lt(new BN(amount))) {
        this.$bvToast.toast(this.$t(tip.outOfCap), {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      if (this.balance.lte(new BN(amount).mul(new BN(10).pow(this.decimal)))) {
        this.$bvToast.toast(this.$t('tip.insufficientBalance'), {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      return true;
    },
    async confirm() {
      if (!this.checkInput()) {
        return;
      }
      try {
       
      } catch (e) {
        console.log("eee", e);
        this.$bvToast.toast(e.message, {
          title: this.$t('tip.error'),
          autoHideDelay: 5000,
          variant: "danger",
        });
      } finally {
      }
    },
  },
  mounted() {
  },
};
</script>

<style lang="less">
.tip-modal {
  position: relative;
  .close-btn {
    position: absolute;
    right: 0;
    width: 1rem;
    height: 1rem;
  }
  .primary-btn {
    width: 100%;
    margin-top: 1rem;
  }
  .big {
    background-image: linear-gradient(
      to right,
      var(--primary-custom),
      var(--primary-custom)
    );
    background-size: 90% 50%;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: 50%;
  }
}
.input-group-box {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  input {
    flex: 1;
    border: none;
    background: rgba(246, 247, 249, 1);
    font-size: 0.8rem;
    height: 2.4rem;
    padding: 0.4rem 0.8rem;
    box-sizing: border-box;
    border-radius: 0.8rem;
    margin-right: 1rem;
  }
  span {
    display: inline-block;
    min-width: 5rem;
  }
}
.label{
  text-align: left;
  margin-bottom: 12px;
}
</style>
