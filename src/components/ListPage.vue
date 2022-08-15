<!-- 通用的列表界面可以定义为一个组件进行调用， -->
<template>
	<div class="operation">
		<el-button-group>
			<el-button type="primary" @click="add" v-if="needadd">
				<el-icon>
					<plus />
				</el-icon>
				<span>添加数据</span>
			</el-button>
			<!-- <el-button type="primary">
				<el-icon>
					<upload />
				</el-icon>
				<span>导入数据</span>
			</el-button> -->
			<el-button type="danger" @click="delete_" v-if="needdelete">
				<el-icon>
					<delete />
				</el-icon>
				<span>批量刪除</span>
			</el-button>
		</el-button-group>
		<el-button-group :style="{marginLeft:needadd?'10px':'0px' }" v-if="needdownload">
			<el-dropdown>
				<el-button type="primary">
					<el-icon>
						<download />
					</el-icon>
					<span>导出数据</span>
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="exportCheck">导出全部</el-dropdown-item>
						<el-dropdown-item @click="exportAll">导出选中</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</el-button-group>
	</div>
	<!-- 列表区 -->
	<div class="container">
		<el-row>
			<el-col :span="13" style="line-height: 60px;">
				<!-- 当前搜索项目展示 -->
				<span>搜索项目：</span>
				<template v-for="(item,index) in table.search.defaultsearch">
					<el-tag class="mx-1" closable type="danger">{{ item.key.label }}:{{ item.value }}</el-tag>
				</template>
				<span v-if="!table.search.defaultsearch || table.search.defaultsearch.length<=0">无</span>
			</el-col>
			<el-col :span="11">
				<!-- 搜索功能区 -->
				<el-form :model="table.search.searchform" label-width="100px">
					<el-form-item label="快捷搜索:" :gutter="10">
						<el-col :span="3">
							<el-select v-model="table.search.searchform.type" placeholder="项目"
								@change="searchTypeChange">
								<template v-for="(item,index) in table.entityfileds" :key="item.name">
									<el-option :label="item.label" :value="item.name" v-if="item.canDefaultSearch" />
								</template>
							</el-select>
						</el-col>
						<el-col :span="7">
							<div style="padding-left:10px">
								<!-- 此处的内容动态生成 -->
								<template v-for="(item,index) in table.entityfileds" :key="item.name">
									<el-input v-model="table.search.searchform.value"
										v-if="item.name == table.search.searchform.type && item.canDefaultSearch && (item.type == 'text' || item.type == 'textarea')"
										:placeholder="'请输入'+item.label" />
									<el-select v-model="table.search.searchform.value"
										v-else-if="item.name == table.search.searchform.type && item.canDefaultSearch && (item.type == 'dict')"
										:placeholder="'请选择'+item.label" :multiple="item.canSearchMultiple">
										<template v-if="table.dicts[item.dictkey]"
											v-for="(dictitem,dictindex) in table.dicts[item.dictkey]">
											<el-option :label="dictitem.label" :value="dictitem.label" />
										</template>
									</el-select>
									<el-select v-model="table.search.searchform.value"
										v-else-if="item.name == table.search.searchform.type && item.canDefaultSearch && (item.type == 'object')"
										:placeholder="'请选择'+item.label">
	
									</el-select>
									<el-date-picker style="width:100%" v-model="table.search.searchform.value"
										v-else-if="item.name == table.search.searchform.type && item.canDefaultSearch && (item.type == 'date')"
										:placeholder="'请选择'+item.label" type="datetime" clearable editable
										:format="item.formate" />
								</template>
							</div>
						</el-col>
						<el-col :span="1"></el-col>
						<el-col :span="13">
							<el-button-group>
								<el-button type="primary" @click="search">
									<el-icon>
										<search />
									</el-icon>
									<span>搜索数据</span>
								</el-button>
								<el-button type="primary" @click="refresh">
									<el-icon>
										<refresh />
									</el-icon>
									<span>刷新列表</span>
								</el-button>
								<el-button type="danger" @click="searchmore">
									<el-icon>
										<operation />
									</el-icon>
									<span>高级搜索</span>
								</el-button>
							</el-button-group>
						</el-col>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<div>
			<!-- 列表区 -->
			<el-table ref="tableele" :data="table.page.result.datas" style="width:100%" border stripe
				:height="(height-60-32-36-10-80)" highlight-current-row="true" @cell-dblclick="dbHandleInfo" v-loading="loading">
				<el-table-column type="selection" width="55" fixed align="center" v-if="check" />
				<template v-for="(item,index) in table.entityfileds" :key="item.name">
					<el-table-column resizable show-overflow-tooltip="true" :align="item.align" :label="item.label"
						:width="item.width" :sortable="item.sortable" :property="item.name"
						v-if="item.type == 'date' && item.defaultShow">
						<template #default="scope">
							{{scope.row[item.name]&&item.formate ?new Date(scope.row[item.name]).format(item.formate):""}}
						</template>
					</el-table-column>
					<el-table-column resizable show-overflow-tooltip="true" :align="item.align" :label="item.label"
						:width="item.width" :sortable="item.sortable" :property="item.name"
						v-else-if="item.type == 'image' && item.show">
						<template #default="scope">
							<el-image z-index="9999" :src="scope.row[item.name]" lazy
								:preview-src-list="table.page.result.images" :initial-index="index" fit="cover" />
						</template>
					</el-table-column>
					<el-table-column resizable show-overflow-tooltip="true" :align="item.align" :label="item.label"
						:width="item.width" :sortable="item.sortable" :property="item.name"
						v-else-if="item.type == 'object' && item.show">
						<template #default="scope">
							{{scope.row[item.name]?scope.row[item.name][item.showname]:""}}
						</template>
					</el-table-column>
					<el-table-column resizable show-overflow-tooltip="true" :align="item.align" :label="item.label"
						:width="item.width" :sortable="item.sortable" :property="item.name"
						v-else-if="item.type == 'dict' && item.defaultShow" :formatter="dictformatter">
						<template #default="scope">
							<template v-if="table.dicts[item.dictkey]"
								v-for="(dictitem,dictindex) in table.dicts[item.dictkey]">
								<el-tag class="mx-1" effect="dark" v-if="scope.row[item.name] == dictitem.value"
									:type="colors[dictindex]">{{ dictitem.label }}</el-tag>
							</template>
						</template>
					</el-table-column>
					<el-table-column resizable show-overflow-tooltip="true" :align="item.align" :label="item.label"
						:width="item.width" :sortable="item.sortable" :property="item.name"
						v-else-if="item.defaultShow" />
				</template>
				<el-table-column label="操作" :width="optionwidth">
					<template #default="scope">
						<el-button-group>
							<el-button size="small" @click="handleEdit(scope.$index, scope.row)"  v-if="neededit">编辑</el-button>
							<el-button size="small" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
							<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"  v-if="needdelete">删除
							</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区 -->
			<div style="padding-top: 10px;">
				<el-pagination v-model:currentPage="table.page.pama.pageNo" background v-model:page-size="table.page.pama.pageSize"
					:page-sizes="table.page.pama.pagelimits" :default-page-size="table.page.pama.pageSize" page-count="table.page.result.totalPage" :small="small"
					layout="total, sizes, prev, pager, next, jumper" :total="table.page.result.total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePreChange" @next-click="handleNextChange"/>
			</div>
		</div>
	</div>
	
	<!-- 添加数据对话框，可将内容提取到一个单独的组件中进行调用 -->
<!-- 	<component :is="formcomponent" v-if="neededit || needadd" ref="form" :userinfo="userinfo" @addsuccess="addsuccess"></component>
	<component :is="infocomponent" ref="info" @edit="edit" :dicts="table.dicts"></component> -->
</template>

<script>
	import {
		defineAsyncComponent 
	} from 'vue'
	
	import utils from "../public/utils.js";
	import api from "../public/api.js";
	import config from "../public/config.js";
	import $ from 'jquery';
	
	export default {
		props: ['userinfo',"needadd","needdelete","needdownload","neededit","entitytype","dataurl","optionwidth","check"],
		data() {
			return {
				colors: config.colors,
				height: $(window).height(),
				table: {
					dicts: {}, //列表要用到的数据字典，从后台加载
					entityfileds: [],
					search: {
						defaultsearch: [],
						searchform: {
							type: "",
							value: ""
						}
					},
					page: {
						pama: {
							pageSize: config.table.pageSize,
							pageNo: config.table.pageNo,
							pageLimits: config.table.pageLimits
						},
						result: {
							totalPage: 0,
							total:0,
							images: [], //用于图片预览
							datas: []
						}
					}
				}
			}
		},
		mounted: function() {
			var that = this;
			//加载列表属性配置
			api.loadEntityFiledsDatas(function(res) {
				if (!res || res.status != 200 || !res.data) {
					utils.showerror("信息加载失败！");
					return;
				}
				res.data.news.sort(function(a, b) {
					return a.sort - b.sort;
				});
				var fristtype = null;
				res.data[that.entitytype].forEach(function(item, index) {
					that.table.entityfileds.push(item);
					if (fristtype == null && item.canDefaultSearch) {
						fristtype = item;
					}
				})
				if (fristtype) {
					that.table.search.searchform.type = fristtype.name;
				}
				that.$forceUpdate();
	
				//字段菜蔬加载完毕后再加载列表数据
				that.loadData();
			});
			//加载数据字典数据,
			api.loadDictDatas(function(res) {
				if (!res || res.status != 200 || !res.data) {
					utils.showerror("信息加载失败！");
					return;
				}
				for (var key in res.data) {
					that.table.dicts[key] = res.data[key];
				}
				that.$forceUpdate();
				
				that.$emit('dictloaded', that.table.dicts);
			});
	
		},
		methods: {
			loadData: function() {
				var that = this;
				var entity = {};
				entity[this.table.search.searchform.type] = this.table.search.searchform.value;
				api.loadPageDatas(this.dataurl, {
					pageSize: this.table.page.pama.pageSize,
					pageNo: this.table.page.pama.pageNo,
					entity: entity
				}, function(res) {
					if (!res || res.status != 200 || !res.data) {
						utils.showerror("信息加载失败！");
						return;
					}
					that.table.page.result.totalPage = res.data.totalPage;
					that.table.page.result.total = res.data.total;
					res.data.datas.forEach(function(item, index) {
						if(that.table.search.searchform.value && item[that.table.search.searchform.type] != that.table.search.searchform.value){//模拟，不符合搜索条件,但是页码会有问题
						return;
						}
						that.table.page.result.datas.push(item);
						that.table.page.result.images.push(item.icon);
					})
					that.$forceUpdate();
				});
			},
			refresh:function(){
				//清除旧的数据
				this.table.page.result.datas.splice(0, this.table.page.result.datas.length);
				this.table.page.result.images.splice(0, this.table.page.result.datas.length);
				this.loadData();
			},
			search:function(){
				this.table.page.pama.pageNo = config.table.pageNo;
				this.refresh();
				
				//此处显示当前搜索条件
				this.table.search.defaultsearch.splice(0, this.table.search.defaultsearch.length);
				var key = null;
				for (var i = 0; i < this.table.entityfileds.length; i++) {
					if(this.table.entityfileds[i].name == this.table.search.searchform.type){
						key = this.table.entityfileds[i];
						break;
					}
				}
				if(key && this.table.search.searchform.value){
					this.table.search.defaultsearch.push({
						key: key,
						value: this.table.search.searchform.value
					});
				}
			},
			searchmore:function(){
				// 弹出高级搜索框，可进行复合搜索
				utils.showerror("待开发");
			},
			searchTypeChange: function() {
				this.table.search.searchform.value = null;
				this.$forceUpdate();
			},
			handleSizeChange: function() {
				this.refresh();
			},
			handleCurrentChange: function() {
				this.refresh();
			},
			add: function() { //添加数据
				// this.$refs.form.show(null);
				this.$emit('toform', null);
			},
			addsuccess: function(data) { //添加数据
				var olditem = null;
				var olditemindex = null;
				this.table.page.result.datas.forEach(function(item,index){
					if(data.id == item.id){
						olditem = item;
						olditemindex =  index;
					}
				})
				if(olditem!=null){//更新
					this.table.page.result.datas[olditemindex] = data;
					this.table.page.result.images[olditemindex] = data.icon;
				}else{
					this.table.page.result.datas.push(data);
					this.table.page.result.images.push(data.icon);
					
					this.table.page.result.total = this.table.page.result.total+1;
					this.table.page.result.totalPage = this.table.page.result.total/this.table.page.pama.pageSize;
					if(this.table.page.result.total%this.table.page.pama.pageSize!=0){
						this.table.page.result.totalPage++;
					}
				}
			},
			delete_: function() {
				var datas = this.$refs.tableele.getSelectionRows();
				if (!datas || datas.length <= 0) {
					utils.showerror("请至少选中一条数据");
					return;
				}
				var that = this;
				utils.confirm('确定', '确定要删除这几条数据吗？', function(res) {
					if (res != 'success') {
						return;
					}
					datas.forEach(function(item, index) {
						for (var i = 0; i < that.table.page.result.datas.length; i++) {
							if (that.table.page.result.datas[i].id == item.id) {
								that.table.page.result.datas.splice(i, 1);
								that.table.page.result.images.splice(i, 1);
								i--;
								
								that.table.page.result.total = that.table.page.result.total-1;
								that.table.page.result.totalPage = that.table.page.result.total/that.table.page.pama.pageSize;
								if(that.table.page.result.total%that.table.page.pama.pageSize!=0){
									that.table.page.result.totalPage++;
								}
							}
						}
					})
				})
			},
			exportCheck: function() {
				var datas = this.$refs.tableele.getSelectionRows();
				if (!datas || datas.length <= 0) {
					utils.showerror("请至少选中一条数据");
					return;
				}
				//需后台模拟
				utils.showsuccess("导出成功");
			},
			exportAll: function() {
				//需后台模拟
				utils.showsuccess("导出成功");
			},
			dbHandleInfo:function(row, column, cell, event){
				this.handleInfo(null,row);
			},
			handleEdit:function(index,row){
				// this.$refs.form.show(row);
				this.$emit('toform', row);
			},
			handleInfo:function(index,row){
				// this.$refs.info.show(row);
				this.$emit('toinfo', row);
			},
			edit:function(row){
				// this.$refs.form.show(row);
				this.$emit('toform', row);
			},
			handleDelete:function(index,row){
				var that = this;
				utils.confirm('确定', '确定要删除吗？', function(res) {
					if (res != 'success') {
						return;
					}
					for (var i = 0; i < that.table.page.result.datas.length; i++) {
						if (that.table.page.result.datas[i].id == row.id) {
							that.table.page.result.datas.splice(i, 1);
							that.table.page.result.images.splice(i, 1);
							i--;
							
							that.table.page.result.total = that.table.page.result.total-1;
							that.table.page.result.totalPage = that.table.page.result.total/that.table.page.pama.pageSize;
							if(that.table.page.result.total%that.table.page.pama.pageSize!=0){
								that.table.page.result.totalPage++;
							}
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>
