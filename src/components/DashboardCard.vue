<template>
  <div>
    <div class="loading-bg" v-if="isLoading">
      <img src="~@/static/images/loading.gif" alt="" />
      <p class="font16">{{ $t("tip.loading") }}</p>
    </div>
    <div class="row" v-else>
      <div
        class="col-lg-4 col-md-6"
        v-for="(item, index) of items"
        :key="index"
      >
        <div class="c-card">
          <div class="card-title-box flex-start-center">
            <div class="icons">
              <img class="icon1" :src="item.community.iconUrl" alt="" />
            </div>
            <div class="title-text font20 font-bold">
              <span>{{ item.community.communityName }} {{$t('cs.community')}}</span>
            </div>
          </div>
          <div class="h-line"></div>
          <div class="detail-info-box">
            <div class="project-info-container">
              <span class="name"> {{ $t("dashboard.nominators") }} </span>
              <div class="info">{{ item.nominatorCount }}</div>
            </div>
          </div>
          <button class="primary-btn" @click="downloadCsv(index)">
            {{ $t("dashboard.export") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CsvExportor from "csv-exportor";
import { getDarshboardCard, getNominationSummary } from "../apis/api";
import { formatBalance } from "../utils/polkadot";

export default {
  data() {
    return {
      items: [],
      isLoading: true,
      csvHeader: ["communityName", "communityId", "nominator", "createAt"],
    };
  },
  methods: {
    async getRaised(raise) {
      const raised = await formatBalance(raise);
      return raised;
    },
    downloadCsv(index) {
      const card = this.items[index];
      const projectId = card.projectId;
      const communityId = card.communityId;
      getNominationSummary({
        communityId,
        projectId,
      })
        .then(async (res) => {
          let result = [];
          console.log("csv1", res);
          result = res.map((n) => ({
            communityName: n.community.communityName,
            communityId: n.communityId,
            nominator: n.nominator,
            createAt: n.createAt,
          }));
          console.log("csv", result);
          CsvExportor.downloadCsv(
            result,
            { header: this.csvHeader },
            card.community.communityName + ".csv"
          );
        })
        .catch((err) => {
          console.error("down load crowdloan info fail", err);
        });
    },
  },
  created() {
    getDarshboardCard({
      projectId: this.$store.state.account.address,
    })
      .then((res) => {
        this.isLoading = false;
        this.items = res;
        console.log("summary", res);
      })
      .catch((e) => {
        console.log("summary error", e);
      });
  },
};
</script>

<style lang="less" scoped>
.loading-bg {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    margin-top: 12rem;
  }
  p {
    margin-top: 1rem;
    font-weight: 400;
    color: #bdbfc2;
    line-height: 22px;
  }
}
</style>