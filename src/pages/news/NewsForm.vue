<template>
	<el-dialog v-model="addDialogForm.visible" title="添加数据" center draggable destroy-on-close width="80%">
		<el-scrollbar :max-height="height*0.8-200">
			<el-form :model="addDialogForm.form" ref="addDialogForm" :rules="addDialogForm.rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="标题" :label-width="120">
							<el-input v-model="addDialogForm.form.title" required placeholder="请输入标题" autocomplete="off"
								style="width:58%" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="副标题" :label-width="120">
							<el-input v-model="addDialogForm.form.subtitle" placeholder="请输入副标题" autocomplete="off"
								style="width:58%" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="图标" :label-width="120">
							<el-upload class="upload-demo" drag action="文件上上传地址" limit="1">
								<el-icon class="el-icon--upload">
									<upload-filled />
								</el-icon>
								<div class="el-upload__text">
									拖动到此处或者 <em>点击此处上传</em>
								</div>
								<template #tip>
									<div class="el-upload__tip">
										jpg/png 文件且大小不能超过 500kb
									</div>
								</template>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="12"></el-col>
				</el-row>
				<!-- /内容使用富文本的方式 -->
				<el-form-item label="内容" :label-width="120">
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
						title: '',
						subtitle: '',
						icon: '',
						content: '',
						description: ''
					},
					rules: {
						title: [{
								required: true,
								message: '请输入标题',
								trigger: 'blur'
							},
							{
								min: 1,
								max: 1024,
								message: '长度必须大于0小于1024',
								trigger: 'blur'
							}
						],
						subtitle: [{
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
			
				//图标,此处需配合后台，暂不测试
				this.addDialogForm.form.icon = '/src/assets/1.jpeg';
				//内容
				this.addDialogForm.form.content = this.addDialogForm.editor.txt.html();
				if (!this.addDialogForm.form.title) {
					utils.showerror("标题不能为空");
					return;
				}
				if (!this.addDialogForm.form.content) {
					utils.showerror("內容不能为空");
					return;
				}
				//这些参数后台自动生成
				if(!this.addDialogForm.form.id){
					this.addDialogForm.form.status = "1";
					this.addDialogForm.form.user = this.userinfo;
					this.addDialogForm.form.createDate = new Date().getTime();
					this.addDialogForm.form.id = new Date().getTime();
					this.addDialogForm.form.viewcount = 0;
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
					that.addDialogForm.editor.config.placeholder = '请输入新闻正文';
					// 配置服务器端地址
					// editor.config.uploadImgServer = '/src'
					that.addDialogForm.editor.create();
				
					//设置内容
					that.addDialogForm.editor.txt.html(that.addDialogForm.form.content);
				
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
