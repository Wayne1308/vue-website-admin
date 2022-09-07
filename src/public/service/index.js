import api from "../api";

// 首页数据请求


/**
 * 获取首页状态信息
 * @returns {Promise<*|{}>}
 */
 export async function fetchIndexStatusData() {
  const res = await api.loadData("src/data/index/status.json");
  return res?.data || {}
}

/**
 * 获取主机流量信息
 * @returns {Promise<*|{}>}
 */
 export async function fetchIndexZjllData() {
  const res = await api.loadData("src/data/index/zjll.json");
  return res?.data || {}
}

/**
 * 获取在线主机信息
 * @returns {Promise<*|{}>}
 */
 export async function fetchIndexZxzjData() {
  const res = await api.loadData("src/data/index/zxzj.json");
  return res?.data || {}
}

/**
 * 获取DHCP信息
 * @returns {Promise<*|{}>}
 */
 export async function fetchIndexDHCPData() {
  const res = await api.loadData("src/data/index/DHCP.json");
  return res?.data || {}
}

/**
 * 获取应用比例信息
 * @returns {Promise<*|{}>}
 */
 export async function fetchIndexYyblData() {
  const res = await api.loadData("src/data/index/yybl.json");
  return res?.data || {}
}

/**
 * 获取流量监控信息
 * @returns {Promise<*|{}>}
 */
 export async function fetchIndexLljkData() {
  const res = await api.loadData("src/data/index/lljk.json");
  return res?.data || {}
}

/**
 * 获取表信息
 * @returns {Promise<*|{}>}
 */
 export async function fetchIndexTableData() {
  const res = await api.loadData("src/data/index/table.json");
  return res?.data || {}
}