<template>
	<ListPage ref="listtable" :userinfo="userinfo" :needadd="needadd" :needdelete="needdelete" :needdownload="needdownload" :neededit="neededit" :entitytype="entitytype" :dataurl="dataurl" :check="check" :optionwidth="optionwidth" @dictloaded="dictloaded" @toinfo="toinfo" @toform="toform"></ListPage>
	
	<SettingForm ref="form" :userinfo="userinfo" @addsuccess="addsuccess"></SettingForm>
	<SettingInfo ref="info" @edit="toform" :dicts="dicts"></SettingInfo>
</template>

<script>
	import api from "../../public/api.js";
	import ListPage from "../../components/ListPage.vue";
	import SettingInfo from './SettingInfo.vue'
	import SettingForm from './SettingForm.vue'
	
	export default {
		props: ['userinfo'],
		components:{
			ListPage,
			SettingInfo,
			SettingForm
		},
		data() {
			return {
				needadd:true,
				needdelete:true,
				needdownload:true,
				neededit:true,
				entitytype:'setting',
				optionwidth:180,
				check:true,
				dataurl:api.server_urls.setting_url,
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
