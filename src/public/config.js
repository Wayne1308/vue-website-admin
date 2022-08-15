//界面全局配置参数，如分页数、每页数量等，可以写死也可以从后台请求刷新
export default {
	name: '全局配置',
	colors:['success','info','danger','warning'],
	table: {
		pageSize: 10,//每页数量
		pageNo: 1,//初始页码
		pageLimits:[10, 30, 50, 100],//每页切换数量
	}
}
