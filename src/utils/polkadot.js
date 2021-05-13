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

export async function getApi() {
  if (store.state.api) {
    return store.state.api
  }
  store.commit('saveIsConnected', false)

  console.log('connecting');
  const wsProvider = new WsProvider(POLKADOT_CHAIN_WEB_SOCKET_MAP["POLKADOT"])
  const api = await ApiPromise.create({
    provider: wsProvider,
    rpc: jsonrpc,
    types: {
      PalletId: 'Raw'
    }
  })
  console.log('connected');
  
  await api.rpc.chain.subscribeNewHeads(async (header) => {
    const { number } = header
    const blockHash = await api.rpc.chain.getBlockHash(number);
    const signedBlock = await api.rpc.chain.getBlock(blockHash); 

    const allRecords = await api.query.system.events.at(
      signedBlock.block.header.hash
    );
    const data = {};

    // map between the extrinsics and events
    signedBlock.block.extrinsics.forEach(
      ({ method: { method, section } }, index) => {
        // filter the specific events based on the phase and then the
        // index of our extrinsic in the block
        const events = allRecords
          .filter(
            ({ phase }) =>
              phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
          )
          // test the events against the specific types we are looking for
          .forEach(({ event, phase }) => {
            const types = event.typeDef;
            const fields = {};
            if (event.section !== 'utility' && event.method !== 'batch') return;

            // Loop through each of the parameters, displaying the type and data
            event.data.forEach((data, index) => {
              fields[types[index].type] = data.toString();
            });

            data[`${event.section}:${event.method}`] = fields;
          });
      }
    );
    if (Object.keys(data).length === 0) return;
    console.log(1244, data);
  })

  store.commit('saveIsConnected', true)
  store.commit('saveApi', api)
  return api
}

export function uni2Token(uni, decimal = 10) {
  return uni.div(new BN(10).pow(decimal))
}

export function token2Uni (amount, decimal = 10) {
  amount = parseFloat(amount)
  // need to convert amount to int first.Other wise the new BN method will cast the decimal part
  return new BN(amount * 1e6).mul(new BN(10).pow(new BN(decimal - 6)))
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
  if (uni >= 1e28) {
    uni = uni.div(new BN(1e24));
    unit = " E";
  } else if (uni >= 1e25) {
    uni = uni.div(new BN(1e21));
    unit = " P";
  } else if (uni >= 1e22) {
    uni = uni.div(new BN(1e18));
    unit = " T";
  } else if (uni >= 1e19) {
    uni = uni.div(new BN(1e15));
    unit = " B";
  } else if (uni >= 1e16) {
    uni = uni.div(new BN(1e12))
    unit = " M";
  } else if (uni >= 1e13) {
    uni = uni.div(new BN(1e9))
    unit = " K"
  } else if (uni >= 1e9){
    uni = uni.div(new BN(1e6))
  } else if (uni >= 1e6){
    uni = uni.div(new BN(1e3))
    unit = " milli "
  }
  uni = parseFloat(uni)
  uni = (uni/1e4).toFixed(4)
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
      0
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


/**
 * 估计交易的手续费
 * @param {object} tx 待执行的交易 
 */
export async function getTxPaymentInfo(tx) {
  const info = await tx.paymentInfo(store.state.account.address)
  console.log(info.partialFee.toHuman());
  return info.partialFee.toNumber()
}