import {
    u8aConcat,
    u8aToHex,
  } from "@polkadot/util"
  import {
    blake2AsU8a,
    encodeAddress,
  } from "@polkadot/util-crypto"
  import BN from "bn.js"
  import {
    PARA_STATUS,
    CHAIN_ID,
  } from "../config"
  import store from "../store"
  
  import { $t } from '../i18n'
  
  import {
    getApi,
    uni2Token,
    getDecimal,
    getNodeId,
    stanfiAddress
  } from './polkadot'
  import {
    injectAccount
  } from './account'
  import {
    NumberTo4BytesU8A
  } from './utils'


  export const subBonded = async () => {
      let subBonded = store.state.subBonded
      try{
          subBonded()
      }catch(e){}
      const api = await getApi()
      subBonded = await api.query.staking.bonded(store.state.account.address, (bonded) => {
          store.commit('saveBonded', bonded)
      })
      store.commit('saveSubBonded', subBonded)
  }

  export const subNominators = async () => {
    let subNominators = store.state.subNominators
    try{
        subNominators()
    }catch (e) {}
    const api = await getApi()
    const nominators = await api.query.staking.nominators(store.state.account.address, (nominators) => {
        store.commit('saveNominators', nominators.toJSON())
    })
    store.commit('subNominators', subNominators)
  }

  export const nominate = async (nominators, communityId, projectId) => {

  }

  export const bondAndNominate = async (nominators, communityId, projectId) => {

  }