import { get, post } from './axios'
import { API_URL } from '../config'

// 获取展示的卡片信息
export const getCrowdstacking = async () => post(API_URL + '/crowdstaking/all')