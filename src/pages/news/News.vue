<template>
	<ListPage ref="listtable" :userinfo="userinfo" :needadd="needadd" :needdelete="needdelete" :needdownload="needdownload" :neededit="neededit" :entitytype="entitytype" :dataurl="dataurl" :check="check" :optionwidth="optionwidth" @dictloaded="dictloaded" @toinfo="toinfo" @toform="toform"></ListPage>
	
	<!-- 添加数据对话框，可将内容提取到一个单独的组件中进行调用 -->
	<NewsForm ref="form" :userinfo="userinfo" @addsuccess="addsuccess"></NewsForm>
	<NewsInfo ref="info" @edit="edit" :dicts="dicts"></NewsInfo>
</template>

<script>
	import utils from "../../public/utils.js";
	import api from "../../public/api.js";
	import config from "../../public/config.js";
	import ListPage from "../../components/ListPage.vue";
	import NewsForm from "./NewsForm.vue";
	import NewsInfo from "./NewsInfo.vue";
	import $ from 'jquery';
	
	export default {
		props: ['userinfo'],
		components:{
			ListPage,
			NewsForm,
			NewsInfo
		},
		data() {
			return {
				needadd:true,
				needdelete:true,
				needdownload:true,
				neededit:true,
				entitytype:'news',
				optionwidth:180,
				check:true,
				dataurl:api.server_urls.new_url,
				dicts:[]
			}
		},
		methods: {
			dictloaded:function(dicts){
				this.dicts = dicts;
			},
			toinfo:function(row){
				this.$refs.info.show(row);
			},
			toform:function(row){
				this.$refs.form.show(row);
			},
			addsuccess:function(data){
				this.$refs.listtable.addsuccess(data);
			}
		}
	}
</script>

<style>
	
</style>
