#实体属性说明
&emsp;&emsp;可通过后台定义实体进行保存配置，配置后前端加载并解析展示。
格式说明：

"news": [{ //列表要用到的数据字典，从后台加载
	"name": "icon",//字段名称
	"label": "图标",//字段文本说明
	"fixed": false, //是否左侧固定列
	"dictkey": "", //字段时数据字典时对应的数据字典标识
	"sort":1,//顺序
	"sortable": false, //是否可排序
	"type": "image", //类型，text文本，image图片，date日期时间，dict数据字典，object对象
	"formate": "",//时间的格式
	"width": 100, //列宽度
	"showname": "", //是一个关联对象时展示对象的字段名称
	"align": "center", //对其方式
	"defaultShow": true, //是否默认展示
	"show": true, //是否可展示
	"canSearchMultiple":false,//是否批量搜索，即多个地段同时搜索
	"canSearch": false, //是否可搜索
	"canDefaultSearch": false //是否默认搜索
}]
#数据字典说明
数据自定通过后台进行配置，前端加载后解析对应数据