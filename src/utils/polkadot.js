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
  let uni = new BN(b)
  let unit = ' '
  uni = uni.div(new BN(1e6))
  if (uni >= 1e22) {
    uni = uni.div(new BN(1e18));
    unit = " E";
  } else if (uni >= 1e19) {
    uni = uni.div(new BN(1e15));
    unit = " P";
  } else if (uni >= 1e16) {
    uni = uni.div(new BN(1e12));
    unit = " T";
  } else if (uni >= 1e13) {
    uni = uni.div(new BN(1e9));
    unit = " B";
  } else if (uni >= 1e10) {
    uni = uni.div(new BN(1e6));
    unit = " M";
  } else if (uni >= 1e7) {
    uni = uni.div(new BN(1e3))
    unit = " K"
  }
  uni = parseFloat(uni)
  uni = uni/1e4
  return uni + unit + 'DOT';
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
