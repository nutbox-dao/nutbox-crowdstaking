
  import store from "../store"
  import { getApi } from './polkadot'

// subscribe new block
export const subBlock = async () => {
    if (store.getters.getSubBlock()) return;
    const api = await getApi()
    // console.log('sub block');
    const subBlock = await api.rpc.chain.subscribeNewHeads((header) => {
      try {
        const number = header.number.toNumber()
        store.commit('saveCurrentBlockNum', number)
      } catch (e) {
  
      }
    })
    store.commit('saveSubBlock', subBlock)
  }