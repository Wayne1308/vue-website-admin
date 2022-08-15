<template>
	<ListPage ref="listtable" :userinfo="userinfo" :needadd="needadd" :needdelete="needdelete" :needdownload="needdownload" :neededit="neededit" :entitytype="entitytype" :dataurl="dataurl" :check="check" :optionwidth="optionwidth" @dictloaded="dictloaded" @toinfo="toinfo" @toform="toform"></ListPage>
	
	<UserForm ref="form" :userinfo="userinfo" @addsuccess="addsuccess"></UserForm>
	<UserInfo ref="info" @edit="toform" :dicts="dicts"></UserInfo>
</template>

<script>
	import api from "../../public/api.js";
	import ListPage from "../../components/ListPage.vue";
	import UserInfo from './UserInfo.vue'
	import UserForm from './UserForm.vue'
	
	export default {
		props: ['userinfo'],
		components:{
			ListPage,
			UserInfo,
			UserForm
		},
		data() {
			return {
				needadd:true,
				needdelete:true,
				needdownload:true,
				neededit:true,
				entitytype:'user',
				optionwidth:180,
				check:true,
				dataurl:api.server_urls.user_url,
				dicts:[]
			}
		},
		mounted: function() {
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
