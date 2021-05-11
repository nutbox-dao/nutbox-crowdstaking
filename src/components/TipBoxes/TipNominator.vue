<template>
  <div class="tip-modal">
    <img
      class="close-btn"
      src="~@/static/images/close.svg"
      alt=""
      @click="hide"
    />
    <div class="tip-contribute">
      <div class="text-center mb-4 font20" v-if="lang === 'en'">
        Nominate to<span class="big"> BML's </span>validators <br />
        through<span class="big"> {{ cardInfo.name }} </span>community
      </div>
      <div class="text-center mb-4 font20" v-else>
        通过<span class="big"> {{ cardInfo.name }} </span>社区<br />
        为<span class="big"> BML </span>的验证者节点投票<br />
      </div>

      <div v-if="needToCancelValidators > 0">
        <p style="text-align: center">
          {{ $t("cs.cancelValidorsInfo", { n: needToCancelValidators }) }}
        </p>
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          name="flavour-2"
        >
          <div v-for="item of availableNominators" :key="item.address">
            <b-form-checkbox class="checkbox-item" :value="item.address">
              <Identicon
                class="ident-icon"
                :size="30"
                theme="polkadot"
                :value="item.address"
              />
              <div>
                <span class="stake-info">{{ item.nick }}</span>
                <span class="stake-info">otherStake:{{ item.otherStake }}</span>
                <span class="stake-info">ownStake:{{ item.ownStake }}</span>
                <span class="stake-info">count:{{ item.nominatorCount }}</span>
                <span class="stake-info">commission:{{ item.commission }}</span>
              </div>
            </b-form-checkbox>
          </div>
        </b-form-checkbox-group>
      </div>

      <button
        class="primary-btn"
        @click="confirm"
        :disabled="isNominating || !canNominate"
      >
        <b-spinner small type="grow" v-show="isNominating"></b-spinner
        >{{ $t("cs.confirm") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Test_Validators, PROJECTID } from "../../config";
import { nominate } from "../../utils/staking";
import { MAX_NOMINATE_VALIDATOR } from "../../constant";
import Identicon from "@polkadot/vue-identicon";

export default {
  data() {
    return {
      selected: [],
      inputAmount: "",
      inputNonimator: "",
      paraTokenSymbol: "",
      isNominating: false,
    };
  },
  props: {
    cardInfo: {
      type: Object,
    },
  },
  components: {
    Identicon,
  },
  computed: {
    ...mapState(["symbol", "balance", "lang", "bonded", "nominators"]),
    availableNominators() {
      return this.nominators.filter((n) => Test_Validators.indexOf(n) === -1);
    },
    needToCancelValidators() {
      return (
        this.availableNominators.length +
        Test_Validators.length -
        MAX_NOMINATE_VALIDATOR
      );
    },
    // 确认按钮是否可点击
    canNominate() {
      if (this.needToCancelValidators) {
        return this.selected.length >= this.needToCancelValidators;
      } else {
        return true;
      }
    },
  },
  methods: {
    hide() {
      if (this.isNominating) return;
      this.$emit("hideNominate");
    },
    getNominateValidators() {
      if (this.needToCancelValidators > 0) {
        // 从用户选择的列表获取投票
        return this.availableNominators
          .filter((n) => this.selected.indexOf(n.address) !== -1)
          .map(({ address }) => address)
          .concat(Test_Validators);
      } else {
        // 直接拼接节点
        return this.availableNominators
          .map(({ address }) => address)
          .concat(Test_Validators);
      }
    },
    async confirm() {
      try {
        this.isNominating = true;
        const validators = this.getNominateValidators();
        console.log('selecet validator', validators);
        await nominate(
          validators,
          this.cardInfo.communityId,
          PROJECTID,
          (info, param) => {
            this.$bvToast.toast(info, param);
          },
          () => {
            this.$emit("hideNominate");
          }
        );
      } catch (e) {
        console.log("eee", e);
        this.$bvToast.toast(e.message, {
          title: this.$t("tip.error"),
          autoHideDelay: 5000,
          variant: "danger",
        });
      } finally {
        this.isNominating = false;
      }
    },
  },
  mounted() {},
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
.stake-info{
  display: block;
}
.checkbox-item {
  margin-bottom: 10px;
  margin-left: 1.2rem;

  .custom-control-label {
    display: flex;
    align-content: flex-start;
    span {
      margin-left: 12px;
    }
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
.label {
  text-align: left;
}
</style>
