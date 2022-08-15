<template>
	<ListPage ref="listtable" :userinfo="userinfo" :needadd="needadd" :needdelete="needdelete" :needdownload="needdownload" :neededit="neededit" :entitytype="entitytype" :dataurl="dataurl" :check="check" :optionwidth="optionwidth" @dictloaded="dictloaded" @toinfo="toinfo" @toform="toform"></ListPage>
	
	<CaseForm ref="form" :userinfo="userinfo" @addsuccess="addsuccess"></CaseForm>
	<CaseInfo ref="info" @edit="toform" :dicts="dicts"></CaseInfo>
</template>

<script>
	import api from "../../public/api.js";
	import ListPage from "../../components/ListPage.vue";
	import CaseInfo from './CaseInfo.vue'
	import CaseForm from './CaseForm.vue'
	
	export default {
		props: ['userinfo'],
		components:{
			ListPage,
			CaseInfo,
			CaseForm
		},
		data() {
			return {
				needadd:true,
				needdelete:true,
				needdownload:true,
				neededit:true,
				entitytype:'case',
				optionwidth:180,
				check:true,
				dataurl:api.server_urls.case_url,
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
