import { get, post } from './axios'
import { API_URL } from '../config'

// 获取展示的卡片信息
export const getCrowdstaking = async () => post(API_URL + '/crowdstaking/find/all')

export const getDarshboardCard = async (param) => post(API_URL + '/crowdstaking/find/summary', param)

export const getNominationSummary = async (param) => post(API_URL + '/crowdstaking/find/nominations', param)