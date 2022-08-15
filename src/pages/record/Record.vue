<template>
	<ListPage :userinfo="userinfo" :needadd="needadd" :needdelete="needdelete" :needdownload="needdownload" :neededit="neededit" :entitytype="entitytype" :dataurl="dataurl" :check="check" :optionwidth="optionwidth" @dictloaded="dictloaded" @toinfo="toinfo" @toform="toform"></ListPage>
	
	<RecordInfo ref="info" :dicts="dicts"></RecordInfo>
</template>

<script>
	import api from "../../public/api.js";
	import ListPage from "../../components/ListPage.vue";
	import RecordInfo from './RecordInfo.vue'
	
	export default {
		props: ['userinfo'],
		components:{
			ListPage,
			RecordInfo
		},
		data() {
			return {
				needadd:false,
				needdelete:false,
				needdownload:true,
				neededit:false,
				entitytype:'record',
				optionwidth:80,
				check:true,
				dataurl:api.server_urls.records_url,
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
			}
		}
	}
</script>

<style>
</style>
