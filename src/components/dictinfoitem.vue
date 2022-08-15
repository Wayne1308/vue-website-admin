<template>
	<template v-if="dicts" v-for="(dictitem,dictindex) in dicts">
		<el-tag class="mx-1" effect="dark" v-if="value == dictitem.value" :type="colors[dictindex]">{{ dictitem.label }}
		</el-tag>
	</template>
</template>

<script>
	import config from "../public/config.js";
	export default {
		props: ['dicts',  'value'],
		data() {
			return {
				colors: config.colors,
			}
		}
	}
</script>

<style>
</style>
