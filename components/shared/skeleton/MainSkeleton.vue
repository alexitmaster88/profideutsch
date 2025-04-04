<template>
	<div class="h-screen min-w-full bg-primary flex flex-col gap-2 justify-center items-center">
		<!-- <video autoplay muted loop class="h-[15rem]" playsinline preload="auto">
			<source :src="videoSrc" type="video/mp4"  />
		</video> -->
		<img :src="videoSrc" class="h-[15rem] bg-transparent" alt="loading" />
		<div class="text-white text-2xl font-normal">Yuklanmoqda...</div>
	</div>
</template>

<script setup lang="ts">
import videoSrc from "@/assets/video/loader-small.gif";
</script>
