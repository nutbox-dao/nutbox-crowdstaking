import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from "vue-cookies"
import { LOCALE_KEY } from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: null,
    apiState: null,
    lang: Cookie.get(LOCALE_KEY),
    subBalance: {},
    bonded: '',
    nominators: '',
    communitys: [],
    isConnected: true,
    loadingStaking: true,
    account: Cookie.get('polkadot-account'),
    allAccounts: [],
    balance: 0,
    projectFundInfos: [],
    currentBlockNum: {},
  },
  mutations: {
    saveCommunitys: (state, communitys) => {
      state.communitys = communitys
    },
    saveSubBalance: (state, subBalance) => {
      state.subBalance = subBalance
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
    saveLoadingStaking: (state, loadingStaking) => {
      state.loadingStaking = loadingStaking
    },
    saveApi: (state, api) => {
      state.api = api
    },
    saveIsConnected: (state, isConnected) => {
      state.isConnected = isConnected
    },
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
    saveCurrentBlockNum: (state, blockNum) => {
      state.currentBlockNum = blockNum
    },
  },
  getters: {},
  actions: {},
  modules: {}
})
