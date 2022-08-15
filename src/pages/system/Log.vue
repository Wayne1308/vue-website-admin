<template>
	<ListPage ref="listtable" :userinfo="userinfo" :needadd="needadd" :needdelete="needdelete" :needdownload="needdownload" :neededit="neededit" :entitytype="entitytype" :dataurl="dataurl" :check="check" :optionwidth="optionwidth" @dictloaded="dictloaded" @toinfo="toinfo"></ListPage>
	<LogInfo ref="info" @edit="toform" :dicts="dicts"></LogInfo>
</template>

<script>
	import api from "../../public/api.js";
	import ListPage from "../../components/ListPage.vue";
	import LogInfo from './LogInfo.vue'
	
	export default {
		props: ['userinfo'],
		components:{
			ListPage,
			LogInfo
		},
		data() {
			return {
				needadd:false,
				needdelete:false,
				needdownload:true,
				neededit:false,
				entitytype:'log',
				optionwidth:80,
				check:true,
				dataurl:api.server_urls.log_url,
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
			}
		}
	}
</script>

<style>
</style>
