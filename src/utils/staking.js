import {
  u8aConcat,
  u8aToHex,
} from "@polkadot/util"
import {
  blake2AsU8a,
  encodeAddress,
  decodeAddress
} from "@polkadot/util-crypto"
import BN from "bn.js"
import {
  PARA_STATUS,
  CHAIN_ID,
} from "../config"
import store from "../store"

import {
  $t
} from '../i18n'

import {
  getApi,
  uni2Token,
  token2Uni,
  getDecimal,
  getNodeId,
  stanfiAddress,
  getTxPaymentInfo
} from './polkadot'
import {
  injectAccount
} from './account'
/**
 * 监听用户的绑定储蓄账户
 */
export const subBonded = async () => {
  let subBonded = store.state.subBonded
  try {
    subBonded()
  } catch (e) {}
  const api = await getApi()
  subBonded = await api.query.staking.bonded(store.state.account.address, (bonded) => {
    if (!bonded.toJSON()) {
      store.commit('saveBonded', null)
      return;
    }
    store.commit('saveBonded', bonded.toJSON())
    console.log('bonded', bonded.toJSON());
  })
  store.commit('saveSubBonded', subBonded)
}

/**
 * 监听用户的投票人数
 */
export const subNominators = async () => {
  let subNominators = store.state.subNominators
  try {
    subNominators()
  } catch (e) {}
  const api = await getApi()
  const nominators = await api.query.staking.nominators(store.state.account.address, (nominators) => {
    if (!nominators.toJSON()) {
      store.commit('saveNominators', null)
      return;
    }
    store.commit('saveNominators', nominators.toJSON().targets)
    console.log('nominatores', nominators.toJSON().targets);
  })
  store.commit('saveSubNominators', subNominators)
}

/**
 * 为社区投票, 适用已经有绑定的用户来操作
 * @param {Array} nominators 要投票的节点列表（处理好的所有投票列表）
 * @param {string} communityId 社区id
 * @param {string} projectId 项目id
 */
export const nominate = async (nominators, communityId, projectId) => {

}

/**
 *  绑定DOT，并为社区投票
 * @param {number} amount 要绑定的DOT数量， 以DOT为单位
 * @param {Array} nominators 要投票的节点列表（处理好的所有投票列表）
 * @param {string} communityId 社区id
 * @param {string} projectId 项目id
 * @param {function} toast toast
 * @param {function} callback callback
 */
export const bondAndNominate = async (amount, nominators, communityId, projectId, toast, callback) => {
  const from = store.state.account && store.state.account.address
  communityId = stanfiAddress(communityId)
  projectId = stanfiAddress(projectId)
  if (!from) {
    reject('no account')
  }
  const api = await injectAccount(store.state.account)
  const uni = api.createType('Compact<BalanceOf>', token2Uni(amount))
  const bondTx = api.tx.staking.bond(store.state.account.address, uni, {
    Staked: null
  })

  const nominatorTx = api.tx.staking.nominate(nominators)
  const remark = encodeRemark(communityId, projectId)
  const remarkTx = api.tx.system.remarkWithEvent(remark)
  const nonce = (await api.query.system.account(from)).nonce.toNumber()


  //   const bondFee = await getTxPaymentInfo(api.tx.utility.batch([bondTx, nominatorTx, remarkTx]))
  //   console.log('bondfee', bondFee);

  const unsub = await api.tx.utility
    .batch([bondTx, nominatorTx, remarkTx]).signAndSend(from, {
      nonce
    }, ({
      status,
      dispatchError
    }) => {
      try {
        handelBlockState(status, dispatchError, toast, callback, unsub)
      } catch (e) {
        toast(e.message, {
          title: $t('tip.error'),
          variant: 'danger'
        })
      }
    })
}

/**
 * 内部方法， 处理交易的block状态
 * @param {*} status 交易状态
 * @param {*} dispatchError 交易错误信息
 * @param {*} toast toast
 * @param {*} callback callback
 * @param {*} unsub unsub
 * @returns 
 */
function handelBlockState(status, dispatchError, toast, callback, unsub) {
  if (status.isInBlock || status.isFinalized) {
    if (dispatchError) {
      let errMsg = ''
      if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        const decoded = api.registry.findMetaError(dispatchError.asModule);
        const {
          documentation,
          name,
          section
        } = decoded;
        errMsg = `${section}.${name}: ${documentation.join(' ')}`
        console.log(`${section}.${name}: ${documentation.join(' ')}`);
      } else {
        // Other, CannotLookup, BadOrigin, no extra info
        console.log(dispatchError.toString());
        errMsg = dispatchError.toString()
      }
      toast(errMsg, {
        title: $t('tip.error'),
        variant: 'danger'
      })
      unsub()
      return false
    }
  }
  if (status.isBroadcast) {
    if (callback) callback()
    setTimeout(() => {
      toast($t('transaction.broadcasting'), {
        title: $t('tip.tips'),
        autoHideDelay: 5000,
        variant: 'warning'
      })
    }, 700);
  } else if (status.isInBlock) {
    console.log("Transaction included at blockHash.", status.asInBlock.toJSON());
    toast($t('transaction.inBlock'), {
      title: $t('tip.tips'),
      autoHideDelay: 6000,
      variant: 'warning'
    })
  } else if (status.isFinalized) {
    unsub()
    toast($t('transaction.nominateOk'), {
      title: $t('tip.success'),
      autoHideDelay: 5000,
      variant: "success",
    });
    // 上传daemon
    return true
  }
}

export function encodeRemark(communityId, projectId) {
  // 01 表示使用dot投票
  return "0x01" + communityId + projectId;
}
