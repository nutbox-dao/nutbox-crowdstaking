import { get, post } from './axios'
import { API_URL } from '../config'

// 获取所有注册的社区信息
export const getCommnunitys = async () => post(API_URL + '/community/all')

/**
 * 上传contribution数据
 * params：
 * relaychain: 'rococo,
 * blockHash:'sdfsfasdf',
 * communityId:'',
 * nominatorId:'',
*/
export const postContribution = async (params) => post(API_URL+'/contrib/submit', params)

/**
 * 获取要展示的卡片信息
 * relaychain： ‘rococo'
*/
export const getOnshowingCrowdloanCard = async (params) => post(API_URL+'/crowdloan/live', params)

/**
 * 获取个人界面的contribution记录
 * relaychain:'rococo',
 * contributor:'address',
 * offset:0
 * limit:7
*/
export const getUserContributions = async (params) => post(API_URL+'/contrib/find/contributor', params)

/**
 * 获取社区的某个众贷导出数据
 * relaychain:'rococo',
 * communityId:'',
 * paraId:'',
 * limit: null,
 * offset: null,
 * 
*/
export const getExportContributionInfo = async (params) => post(API_URL+'/contrib/find/crowdloan', params)

/**
 * 获取dashboard需要显示的数据
 * relaychain: 'rococo'
*/
export const getDashboardSummary = async (params) => post(API_URL+'/crowdloan/summary', params)