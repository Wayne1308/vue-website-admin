import api from "../api";

/**
 * 获取头部列表信息
 * @returns {Promise<*|{}>}
 */
 export async function fetchHeaderStatusData() {
  const res = await api.loadData("src/data/header/status.json");
  return res?.data || {}
}