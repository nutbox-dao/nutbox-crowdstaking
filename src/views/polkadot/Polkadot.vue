<template>
  <div class="p-page crowdloan-page">
    <div class="bg" v-if="Object.keys(projectFundInfos).length>0"></div>
    <div class="empty-bg" v-else>
      <img src="~@/static/images/empty-data.png" alt="">
      <p>No ongoing auction</p>
    </div>    <div class="cards-container">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <CrowdloanCard chainId="0" projectId="0" communityId="0"
                           @showWithdrawModal="withdrawModal=true"
                           @showContributeModal="contributeModal=true"/>
          </div>
          <div class="col-lg-4 col-md-6">
            <CrowdloanCard chainId="0" projectId="1" communityId="1"
                           @showWithdrawModal="withdrawModal=true"
                           @showContributeModal="contributeModal=true"/>
          </div>
          <div class="col-lg-4 col-md-6">
            <CrowdloanCard chainId="0" projectId="2" communityId="2"
                           @showWithdrawModal="withdrawModal=true"
                           @showContributeModal="contributeModal=true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CrowdloanCard from '../../components/CrowdloanCard'
import { mapMutations } from 'vuex'
export default {
  name: 'Polkadot',
  components: {
    CrowdloanCard,
  },
  data () {
    return {
      contributeModal: false,
      withdrawModal: false,
      projectFundInfos: []
    }
  },
  methods: {
    ...mapMutations(['saveProjectStatus', 'saveProjectName', 'saveCommunityName']),
    async getCommunityInfo () {
      this.saveProjectStatus({
        chainId: '0',
        project: '0',
        status: 'Active'
      })
      this.saveProjectStatus({
        chainId: '0',
        project: '1',
        status: 'Retired'
      })
      this.saveProjectStatus({
        chainId: '0',
        project: '2',
        status: 'Completed'
      })

      this.saveProjectName({
        projectId: '0',
        name: 'Plasma'
      })
      this.saveProjectName({
        projectId: '1',
        name: 'Acala'
      })
      this.saveProjectName({
        projectId: '2',
        name: 'Phala'
      })

      this.saveCommunityName({
        communityId: '0',
        name: 'BML'
      })
      this.saveCommunityName({
        communityId: '1',
        name: 'Nutbox'
      })
      this.saveCommunityName({
        communityId: '2',
        name: 'Peanut'
      })
    }
  },
  async created () {
    await this.getCommunityInfo()
  },
}
</script>

<style lang="less" scoped>
//.cards-container {
//  padding: 24px 64px;
//  display: flex;
//  align-content: center;
//  flex-wrap: wrap;
//  justify-content: space-evenly;
//}
</style>
