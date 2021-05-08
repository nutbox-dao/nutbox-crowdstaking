import {
  web3Accounts,
  web3Enable,
  web3FromSource
} from '@polkadot/extension-dapp'
import keyring from '@polkadot/ui-keyring';

import {
  cryptoWaitReady
} from "@polkadot/util-crypto"
import BN from "bn.js"
import store from "../store"

import { getApi, uni2Token, getDecimal } from './polkadot'

export const loadAccounts = async () => {
  try {
    await web3Enable('crowdloan')
    let allAccounts = await web3Accounts()
    await cryptoWaitReady();
    keyring.loadAll({
      isDevelopment: true
    }, allAccounts)
    console.log('accs:', allAccounts);
    store.commit('saveAllAccounts', allAccounts)
    let account = store.state.account || allAccounts[0]
    store.commit('saveAccount', account)
    getBalance(account)
    // inject
    await injectAccount(account)
  } catch (e) {
    console.error('get all accounts fail:', e);
  }
}

export const injectAccount = async (account) => {
  const injected = await web3FromSource(account.meta.source)
  const api = await getApi()
  api.setSigner(injected.signer)
  return api
}

export const getBalance = async (account) => {
  const api = await getApi()
  // cancel last
  let subBalance = store.state.subBalance
  try {
    subBalance()
  } catch (e) {}

  subBalance = await api.query.system.account(store.state.account.address, ({
    data: {
      free: currentFree
    },
    nonce: currentNonce
  }) => {
    store.commit('saveBalance', new BN(currentFree))
  })
  store.commit('saveSubBalance', subBalance)
}
