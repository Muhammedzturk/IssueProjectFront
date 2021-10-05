<template>
	<div class="layout-footer">
		<span class="font-medium ml-2">Turkuvaz İn ovasyon</span>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		computed: {
			darkTheme() {
				return this.$appState.theme.startsWith('saga');
			}
		}
	}
</script>

<style scoped>

</style>