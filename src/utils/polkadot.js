import {
  ApiPromise,
  WsProvider
} from "@polkadot/api"
import {
  isHex,
  hexToU8a,
  formatBalance as fb
} from "@polkadot/util"
import {
  encodeAddress,
  decodeAddress,
} from "@polkadot/util-crypto"
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import BN from "bn.js"
import {
  POLKADOT_CHAIN_WEB_SOCKET_MAP
} from "../config"
import store from "../store"
import { decimal } from "../constant"

export async function getApi() {
  if (store.state.api) {
    return store.state.api
  }
  const wsProvider = new WsProvider(POLKADOT_CHAIN_WEB_SOCKET_MAP["POLKADOT"])
  const api = await ApiPromise.create({
    provider: wsProvider,
    rpc: jsonrpc,
    types: {
      PalletId: 'Raw'
    }
  })
  store.commit('saveApi', api)
  return api
}

export function uni2Token(uni, decimal) {
  return uni.div(new BN(10).pow(decimal))
}

export const getDecimal = async () => {
  if (store.getters.decimal > 0) {
    return store.getters.decimal
  }
  const api = await getApi()
  const decimal = new BN(api.registry.chainDecimals[0]);
  store.commit('saveDecimal', decimal)
  return decimal
}

export const formatBalance = (b) => {
  const dec = new BN(decimal)
  const uni = new BN(b).div(new BN(10).pow(dec))
  return fb(uni)
}

export const validAddress = (address) => {
  try {
    encodeAddress(
      isHex(address) ?
      hexToU8a(address) :
      decodeAddress(address)
    );
    return true
  } catch (e) {
    return false
  }
}

// 将地址统一成substrate的格式
export const stanfiAddress = (address) => {
  try {
    return encodeAddress(
      isHex(address) ?
      hexToU8a(address) :
      decodeAddress(address),
      42
    );
  } catch (e) {
    return false
  }
}

export function getNodeId(address) {
  if (!address) return new Uint8Array(8)
  const isAddress = validAddress(address)
  return isAddress ? decodeAddress(address).slice(0, 8) : new Uint8Array(8);
}
