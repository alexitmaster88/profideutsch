<template>
	<div class="px-0 bg-red-100 example1 text-center">
		<marquee direction="left" scrollamount="12" class="text-xl font-semibold text-red-500">{{ $t("sayt_test_rejimida") }}</marquee>
	</div>
</template>

<style>
.example1 {
	width: 100%;
	overflow: hidden;
	position: sticky;
	top: 0;
	z-index: 51;
}
</style>
