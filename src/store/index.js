import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from "vue-cookies"
import { LOCALE_KEY } from '../config'
import { subBonded } from '../utils/staking'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: null,
    apiState: null,
    lang: Cookie.get(LOCALE_KEY),
    subBalance: {},
    subLocked: {},
    subNominators: {},
    subBonded: {},
    bonded: '',
    nominators: [],
    communitys: [],
    crowdstakings:[],
    isConnected: true,
    loadingStaking: true,
    account: Cookie.get('polkadot-account'),
    allAccounts: [],
    balance: 0,
    locked: 0,
    currentBlockNum: {},
  },
  mutations: {
    saveCommunitys: (state, communitys) => {
      state.communitys = communitys
    },
    saveCrowdstakings: (state, crowdstakings) => {
      state.crowdstakings = crowdstakings
    },
    saveSubBalance: (state, subBalance) => {
      state.subBalance = subBalance
    },
    saveSubLocked: (state, subLocked) => {
      state.subLocked = subLocked
    },
    saveSubNominators: (state, subNominators) => {
      state.subNominators = subNominators
    },
    saveSubBonded: (state, subBonded) => {
      state.subBonded = subBonded
    },
    saveLang: (state, lang) => {
      state.lang = lang;
      Cookie.set(LOCALE_KEY, lang, '30d')
    },
    saveBonded: (state, bonded) => {
      state.bonded = bonded
    },
    saveNominators: (state, nominators) => {
      state.nominators = nominators
    },
    saveApiState: (state, apiState) => {
      state.apiState = apiState
    },
    saveIsConnected: (state, isConnected) => {
      state.isConnected = isConnected
    },
    saveLoadingStaking: (state, loadingStaking) => {
      state.loadingStaking = loadingStaking
    },
    saveApi: (state, api) => {
      state.api = api
    },
    // saveIsConnected: (state, isConnected) => {
    //   state.isConnected = isConnected
    // },
    saveAccount: (state, account) => {
      state.account = account,
      Cookie.set('polkadot-account', account, '30d')
    },
    saveAllAccounts: (state, allAccounts) => {
      state.allAccounts = allAccounts
    },
    saveBalance: (state, balance) => {
      state.balance = balance
    },
    saveLocked: (state, locked) => {
      state.locked = locked
    },
    saveCurrentBlockNum: (state, blockNum) => {
      state.currentBlockNum = blockNum
    },
  },
  getters: {
    available: (state) => {
      if (state.balance && state.locked){
        return state.balance.sub(state.locked)
      }else{
        return 0
      }
    }
  },
  actions: {},
  modules: {}
})
