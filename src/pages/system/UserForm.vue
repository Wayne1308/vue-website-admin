<template>
	<el-dialog v-model="addDialogForm.visible" title="添加数据" center draggable destroy-on-close width="80%" style="z-index: 10;">
		<el-scrollbar :max-height="height*0.8-200">
			<el-form :model="addDialogForm.form" ref="addDialogForm" :rules="addDialogForm.rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名" :label-width="120">
							<el-input v-model="addDialogForm.form.name" required placeholder="请输入姓名" autocomplete="off"
								style="width:58%" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户名" :label-width="120">
							<el-input v-model="addDialogForm.form.username" placeholder="请输入用户名" autocomplete="off"
								style="width:58%" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="电话" :label-width="120">
							<el-input v-model="addDialogForm.form.phone" required placeholder="请输入电话" autocomplete="off"
								style="width:58%" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="角色" :label-width="120">
							<el-select
								v-model="addDialogForm.form.role"
								remote
								reserve-keyword
								placeholder="请选择用户角色"
								:remote-method="loadRoleData"
								:loading="loading"
								style="width:58%" 
								autocomplete="off"
							  >
								<el-option
								  v-for="item in roles"
								  :key="item.id"
								  :label="item.name"
								  :value="item.name"
								/>
							  </el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="密码" :label-width="120">
							<el-input type="password" v-model="addDialogForm.form.password" required placeholder="请输入密码" autocomplete="off"
								style="width:58%" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
					</el-col>
				</el-row>
	
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
	
	export default {
		props: ['userinfo'],
		data() {
			return {
				height: $(window).height(),
				loading:false,
				addDialogForm: { //表单也可以根据实体配置自动生成，此处暂不处理，后续进行扩展
					visible: false,
					editor: null,
					form: {
						id:null,
						name: '',
						username: '',
						phone: '',
						password: '',
						role: {},
						description: ''
					},
					rules: {
						name: [{
								required: true,
								message: '请输入名称',
								trigger: 'blur'
							},
							{
								min: 1,
								max: 1024,
								message: '长度必须大于0小于1024',
								trigger: 'blur'
							}
						],
						username: [{
								required: true,
								message: '请输入名称',
								trigger: 'blur'
							},{
							min: 0,
							max: 1024,
							message: '长度必须大于0小于1024',
							trigger: 'blur'
						}]
					}
				},
				roles:[]
			}
		},
		mounted:function(){
			this.loadRoleData();
		},
		methods: {
			loadRoleData:function(){
				var that = this;
				this.loading = true;
				api.loadRole(function(res){
					that.loading = false;
					if (!res || res.status != 200) {
						utils.showerror("加载失败");
					}
					if (!res.data) {
						utils.showerror("数据为空");
					}
					that.roles = res.data;
				});
			},
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
			
				if (!this.addDialogForm.form.name) {
					utils.showerror("名称不能为空");
					return;
				}
				if (!this.addDialogForm.form.username) {
					utils.showerror("用户名不能为空");
					return;
				}
				//这些参数后台自动生成
				if(!this.addDialogForm.form.id){
					this.addDialogForm.form.id = new Date().getTime();
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
