import api from "../api";

/**
 * 九轴图数据
 * @param tab 选项名
 * @returns {Promise<*|{}>}
 */
export async function fetchJzData(tab) {
  const CHART_OPTIONS = {
    textStyle: "#1987c0",
    color: ["#5bbb47", "#444ae3", "#820a51"],
    legend: {
      show: true,
      top: 0,
      right: 0,
      textStyle: {
        color: "#cb0131",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      top: 10,
      bottom: "15%",
    },
    xData: [],
    valueData: [],
  };
  const res = await api.loadData("src/data/charts/jzsj.json");
  const data = res?.data[tab] || {};
  CHART_OPTIONS.xData = data.xData || [];
  CHART_OPTIONS.valueData = data.valueData || [];
  return CHART_OPTIONS;
}

/**
 * Iperf数据
 * @returns {Promise<*|{}>}
 */
export async function fetchLperData() {
  const CHART_OPTIONS = {
    textStyle: "#1987c0",
    color: ["#cb0131", "#bbbd11"],
    legend: {
      show: true,
      top: 0,
      right: 0,
      textStyle: {
        color: "#cb0131",
      },
    },
    grid: {
      left: "10%",
      right: 10,
      top: 10,
      bottom: "15%",
    },
  };
  const res = await api.loadData("src/data/charts/Iperf.json");
  CHART_OPTIONS.xData = res.data?.xData || [];
  CHART_OPTIONS.valueData = res.data?.valueData || [];
  return CHART_OPTIONS;
}

/**
 * Iperf数据
 * @returns {Promise<*|{}>}
 */
export async function fetchLperData() {
  const CHART_OPTIONS = {
    textStyle: "#1987c0",
    color: ["#cb0131", "#bbbd11"],
    legend: {
      show: true,
      top: 0,
      right: 0,
      textStyle: {
        color: "#cb0131",
      },
    },
    grid: {
      left: "10%",
      right: 10,
      top: 10,
      bottom: "15%",
    },
  };
  const res = await api.loadData("src/data/charts/Iperf.json");
  CHART_OPTIONS.xData = res.data?.xData || [];
  CHART_OPTIONS.valueData = res.data?.valueData || [];
  return CHART_OPTIONS;
}
