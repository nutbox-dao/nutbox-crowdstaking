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


  export const getBonded = async () => {
      const api = await getApi()
      const sub = await api.query.staking.bonded(store.state.account.address, (bonded) => {
          console.log('bonded', bonded.toJSON());
        store.commit('saveBonded', bonded.toJSON())
      })
  }

  export const getNominators = async () => {

  }