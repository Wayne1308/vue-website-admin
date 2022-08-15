<template>
	<el-dialog v-model="visible" title="详情" center draggable destroy-on-close width="80%">
		<el-scrollbar :max-height="height*0.8-200">
			<el-form :model="data" ref="Form">
				<el-row>
					<el-col :span="12">
						<el-form-item label="操作人:" :label-width="120">
							<span>{{data.user.name}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="IP:" :label-width="120">
							<span>{{data.ip}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="操作:" :label-width="120">
							<span>{{data.op}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="时间:" :label-width="120">
							<span>{{data.createDate}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-form-item label="操作内容:" :label-width="120">
						{{data.msg}}
				</el-form-item>

				<el-form-item label="备注:" :label-width="120">
						{{data.description}}
				</el-form-item>
			</el-form>
		</el-scrollbar>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="visible = false">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
	import utils from "../../public/utils.js";
	import api from "../../public/api.js";
	import config from "../../public/config.js";
	import $ from 'jquery';
	
	import dictinfoitem from "../../components/dictinfoitem.vue";
	
	export default {
		props: ['dicts'],
		components:{
			dictinfoitem
		},
		data() {
			return {
				colors: config.colors,
				height: $(window).height(),
				visible: false,
				data: {}
			}
		},
		methods: {
			show: function(data) {
				//TODO 此处最好从后台再加载一次数据并填充到界面中
				if (data) { //对象赋值
					for (let key in data) {
						this.data[key] = data[key];
					}
				}
				this.visible = true;
			},
			edit: function() {
				this.visible = false;
				this.$emit('edit', this.data);
			}
		}
	}
</script>

<style>
</style>
