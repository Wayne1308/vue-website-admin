<template>
	<el-dialog v-model="addDialogForm.visible" title="添加数据" center draggable destroy-on-close width="80%">
		<el-scrollbar :max-height="height*0.8-200">
			<el-form :model="addDialogForm.form" ref="addDialogForm" :rules="addDialogForm.rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="职位" :label-width="120">
							<el-input v-model="addDialogForm.form.name" required placeholder="请输入职位" autocomplete="off"
								style="width:58%" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="招聘人数" :label-width="120">
							<el-input type="number" v-model="addDialogForm.form.limitcount" placeholder="请输入招聘人数" autocomplete="off"
								style="width:58%" />
						</el-form-item>
					</el-col>
				</el-row>
				<!-- /内容使用富文本的方式 -->
				<el-form-item label="要求" :label-width="120">
					<div id="need" style="height:350px;width: 95%;"></div>
				</el-form-item>
				
				<!-- /内容使用富文本的方式 -->
				<el-form-item label="职责" :label-width="120">
					<div id="content" style="height:350px;width: 95%;"></div>
				</el-form-item>
	
				<el-form-item label="备注" :label-width="120">
					<el-input v-model="addDialogForm.form.description" :rows="5" type="textarea" placeholder="请输入备注"
						autocomplete="off" style="width:95%" />
				</el-form-item>
			</el-form>
		</el-scrollbar>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addDialogForm.visible = false">取消</el-button>
				<el-button type="primary" @click="submitAdd">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
	import utils from "../../public/utils.js";
	import api from "../../public/api.js";
	import config from "../../public/config.js";
	import $ from 'jquery';
	
	import E from "wangeditor"
	export default {
		props: ['userinfo'],
		data() {
			return {
				height: $(window).height(),
				addDialogForm: { //表单也可以根据实体配置自动生成，此处暂不处理，后续进行扩展
					visible: false,
					editor: null,
					form: {
						id:null,
						name: '',
						limitcount: 1,
						need: '',
						content: '',
						description: ''
					},
					rules: {
						name: [{
								required: true,
								message: '请输入姓名'
							},
							{
								min: 1,
								max: 1024,
								message: '长度必须大于0小于1024',
								trigger: 'blur'
							}
						],
						need: [{
							min: 0,
							max: 1024,
							message: '长度必须大于0小于1024',
							trigger: 'blur'
						}],
						content: [{
							min: 0,
							max: 1024,
							message: '长度必须大于0小于1024',
							trigger: 'blur'
						}]
					}
				},
			}
		},
		methods: {
			submitAdd: function() {
				//获取表单数据，并进行验证等
				var isok = true;
				this.$refs.addDialogForm.validate(function(valid, fields) {
					console.log(valid);
					console.log(fields);
					if (!valid) {
						isok = false;
						return;
					}
				})
				if (!isok) {
					utils.showerror("请检查表单信息");
					return;
				}
			
				//内容
				this.addDialogForm.form.content = this.addDialogForm.editor.txt.html();
				this.addDialogForm.form.need = this.addDialogForm.need.txt.html();
				if (!this.addDialogForm.form.name) {
					utils.showerror("岗位名称不能为空");
					return;
				}
				//这些参数后台自动生成
				if(!this.addDialogForm.form.id){
					this.addDialogForm.form.createDate = new Date().getTime();
					this.addDialogForm.form.id = new Date().getTime();
					// this.addDialogForm.form.viewcount = 0;
				}
			
				utils.showsuccess("添加成功");
				this.addDialogForm.visible = false;
				
				this.$emit('addsuccess',this.addDialogForm.form);
			},
			show:function(data){
				//TODO 此处最好从后台再加载一次数据并填充到表单中
				
				if(data){//对象赋值
					for (let key in data) {
						this.addDialogForm.form[key] = data[key];
					}
				}
				this.addDialogForm.visible = true;
				var that = this;
				setTimeout(function() {
					that.addDialogForm.editor = new E(document.getElementById('content'));
					that.addDialogForm.editor.config.placeholder = '请输入岗位职责';
					// 配置服务器端地址
					// editor.config.uploadImgServer = '/src'
					that.addDialogForm.editor.create();
				
					//设置内容
					that.addDialogForm.editor.txt.html(that.addDialogForm.form.content);
					
					that.addDialogForm.need = new E(document.getElementById('need'));
					that.addDialogForm.need.config.placeholder = '请输入职位要求';
					// 配置服务器端地址
					// editor.config.uploadImgServer = '/src'
					that.addDialogForm.need.create();
									
					//设置内容
					that.addDialogForm.need.txt.html(that.addDialogForm.form.need);
				
				}, 200);
			}
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}
	
	.el-icon.avatar-uploader-icon {
		font-size: 20px;
		color: #8c939d;
		width: 45px;
		height: 45px;
		text-align: center;
	}
</style>
