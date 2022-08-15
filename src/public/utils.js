import {
	ElLoading
} from 'element-plus'
import {
	ElMessage
} from 'element-plus'
import {
	ElMessageBox
} from 'element-plus'

export default {
	name: 'utils工具方法',
	lodding: null, //加载动画
	/**
	 * 检测是否已经登录
	 */
	islogined: function () {
		//此处通过浏览器store实现，真实项目应该调用后台实现
		return localStorage.getItem("logined");
	},
	/**
	 * 用户登录
	 */
	login: function (logininfo, callback) {
		if (!logininfo || !logininfo.account) {
			callback && callback('error');
			return;
		}
		//调用接口登录系统
		localStorage.setItem("logininfo", logininfo);
		localStorage.setItem("logined", true);

		callback && callback('success');
	},
	/**
	 * 用户登出
	 */
	logout: function (callback) {
		localStorage.removeItem("logininfo");
		localStorage.removeItem("logined");

		callback && callback('success');
	},
	/**
	 * 显示加载动画
	 */
	showloadding: function () {
		this.lodding = ElLoading.service({
			background: "rgba(10, 0, 0, 0.8)",
			fullscreen: true
		});
	},
	/**
	 * 隐藏加载动画
	 */
	hiddenloadding: function () {
		if (this.lodding) {
			this.lodding.close();
		}
	},
	/**
	 * 显示异常信息
	 * @param {Object} msg 异常提示
	 */
	showerror: function (msg) {
		ElMessage.error(msg)
	},
	/**
	 * 显示成功信息
	 * @param {Object} msg 成功提示
	 */
	showsuccess: function (msg) {
		ElMessage({
			message: msg ? msg : '操作成功！',
			type: 'success',
		})
	},
	/**
	 * 弹出选择框
	 * @param {Object} title 标题
	 * @param {Object} msg 消息
	 * @param {Object} callback 回调函数
	 */
	confirm: function (title, msg, callback) {
		ElMessageBox.confirm(
			msg,
			title, {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			center: true,
			type: 'warning',
		})
			.then(() => {
				callback && callback('success');
			})
			.catch(() => {
				callback && callback('cancel');
			})
	}
};

Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
		}
	}
	return fmt;
}
