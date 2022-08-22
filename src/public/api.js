import axios from 'axios';
import utils from './utils';
const config = {
	// baseURL: process.env.baseURL
	baseURL: 'http://localhost:8888/',
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
	},
};
const api = axios.create(config);

// 默认 post 请求，使用 application/json 形式
api.defaults.headers.post['Content-Type'] = 'application/json';

export default {
	name: "api",
	/**
	 * 接口地址配置
	 */
	server_urls : {
		userinfo_url: 'src/data/userinfo.json', //个人信息加载地址
		menu_url: 'src/data/Menu.json', //菜单数据加载地址
		viewrecord_url: 'src/data/ViewRecord.json', //访问量数据加载地址
		entityfileds_url: 'src/data/entityfiles.json', //实体属性
		dict_url: 'src/data/dicts.json', //数据字典, 
		new_url: 'src/data/newsdata.json', //新闻数据, 
		records_url: 'src/data/recordsdata.json', //访问记录数据
		team_url: 'src/data/teamdata.json', //核心团队数
		case_url: 'src/data/casedata.json', //成功案例数据
		link_url: 'src/data/linkdata.json', //友情链接数据
		job_url: 'src/data/jobdata.json', //招聘岗位数据
		user_url: 'src/data/userdata.json', //用户管理数据
		rolelist_url: 'src/data/rolelistdata.json', //用户管理数据
		role_url: 'src/data/roledata.json', //角色管理数据
		menu_page_url: 'src/data/menudata.json', //菜单管理数据
		log_url: 'src/data/logdata.json', //日志管理数据
		dict_url: 'src/data/dictdata.json', //数据字典数据
		setting_url: 'src/data/settingdata.json', //数据字典数据
	},
	loadUserInfoData: function(callback) {
		utils.showloadding();
		axios({
			method: 'post',
			url: config.baseURL + this.server_urls.userinfo_url,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(response => {
			utils.hiddenloadding();
			callback && callback(response);
		})
	},
	loadMenu: function(callback) {
		utils.showloadding();
		axios({
			method: 'get',
			url: config.baseURL + this.server_urls.menu_url,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(response => {
			utils.hiddenloadding();
			callback && callback(response);
		})
	},
	loadRole: function(callback) {
		utils.showloadding();
		axios({
			method: 'get',
			url: config.baseURL + this.server_urls.rolelist_url,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(response => {
			utils.hiddenloadding();
			callback && callback(response);
		})
	},
	loadViewRecordData: function(callback) {
		utils.showloadding();
		axios({
			method: 'get',
			url: config.baseURL + this.server_urls.viewrecord_url,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).then(response => {
			utils.hiddenloadding();
			callback && callback(response);
		})
	},
	loadEntityFiledsDatas: function(callback) {
		utils.showloadding();
		axios({
			method: 'get',
			url: config.baseURL + this.server_urls.entityfileds_url,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			responseType: 'json', // default
			responseEncoding: 'utf8', // default
			dataType: 'json',
		}).then(response => {
			utils.hiddenloadding();
			callback && callback(response);
		})
	},
	loadDictDatas: function(callback) {
		utils.showloadding();
		axios({
			method: 'get',
			url: config.baseURL + this.server_urls.dict_url,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			responseType: 'json', // default
			responseEncoding: 'utf8', // default
			dataType: 'json',
		}).then(response => {
			utils.hiddenloadding();
			callback && callback(response);
		})
	},
	loadPageDatas: function(url, pama, callback) {
		utils.showloadding();
		axios({
			method: 'get',
			url: config.baseURL + url,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			data:JSON.stringify(pama),
			responseType: 'json', // default
			responseEncoding: 'utf8', // default
			dataType: 'json',
		}).then(response => {
			utils.hiddenloadding();
			callback && callback(response);
		})
	},
}
