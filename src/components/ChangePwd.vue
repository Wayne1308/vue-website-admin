<template>
	<el-dialog v-model="addDialogForm.visible" title="修改密码" center draggable destroy-on-close width="600px">
		<el-scrollbar :max-height="400">
			<el-form :model="addDialogForm.form" ref="addDialogForm" :rules="addDialogForm.rules">
				<el-form-item label="原始密码" :label-width="120">
					<el-input type="password" v-model="addDialogForm.form.oldpassword" required placeholder="请输入原始密码" autocomplete="off"
						style="width:58%" />
				</el-form-item>
				<el-form-item label="新密码" :label-width="120">
					<el-input type="password" v-model="addDialogForm.form.newpassword" required placeholder="请输入新密码" autocomplete="off"
						style="width:58%" />
				</el-form-item>
				<el-form-item label="密码确认" :label-width="120">
					<el-input type="password" v-model="addDialogForm.form.newpassword1" required placeholder="请输入密码确认" autocomplete="off"
						style="width:58%" />
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
	import utils from "../public/utils.js";
	import api from "../public/api.js";
	import config from "../public/config.js";
	import $ from 'jquery';
	
	export default {
		props: ['userinfo'],
		data() {
			return {
				height: $(window).height(),
				loading:false,
				addDialogForm: { //表单也可以根据实体配置自动生成，此处暂不处理，后续进行扩展
					visible: false,
					form: {
						oldpassword: '',
						newpassword: '',
						newpassword1: '',
					},
					rules: {
						oldpassword: [{
								required: true,
								message: '请输入原始密码',
								trigger: 'blur'
							},
							{
								min: 1,
								max: 1024,
								message: '长度必须大于0小于6',
								trigger: 'blur'
							}
						],
						newpassword: [{
								required: true,
								message: '请输入新密码',
								trigger: 'blur'
							},
							{
								min: 1,
								max: 1024,
								message: '长度必须大于0小于6',
								trigger: 'blur'
							}
						],
						newpassword1: [{
								required: true,
								message: '请输入密码确认',
								trigger: 'blur'
							},
							{
								min: 1,
								max: 1024,
								message: '长度必须大于0小于6',
								trigger: 'blur'
							}
						]
					}
				}
			}
		},
		mounted:function(){
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
				if (!this.addDialogForm.form.oldpassword) {
					utils.showerror("旧密码不能为空");
					return;
				}
				if (!this.addDialogForm.form.newpassword) {
					utils.showerror("新密码不能为空");
					return;
				}
				if (this.addDialogForm.form.newpassword != this.addDialogForm.form.newpassword1) {
					utils.showerror("两次密码不一致");
					return;
				}
				//这些参数后台自动生成
				if(!this.addDialogForm.form.id){
					this.addDialogForm.form.id = new Date().getTime();
				}
			
				utils.showsuccess("修改成功");
				this.addDialogForm.visible = false;
				
				this.$emit('addsuccess',this.addDialogForm.form);
			},
			show:function(){
				this.addDialogForm.visible = true;
			}
		}
	}
	

</script>

<style>
	
</style>
