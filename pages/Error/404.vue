<template>
	<section class="flex items-center h-full p-16">
		<div class="flex items-center container flex-col justify-center mx-auto my-8 px-5">
			<div class="max-w-md text-center">
				<h2 class="mb-8 font-bold text-9xl"><span class="sr-only">Xatolik</span> <span class="text-primary">404</span></h2>
				<p class="font-semibold md:text-3xl text-3xl">Kechirasiz, siz qidirgan sahifa topilmadi.</p>
				<LocLink class="btn btn-primary ml-4" to="/" rel="noopener noreferrer">Bosh sahifaga qaytish</LocLink>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import LocLink from '~/components/shared/LocLink.vue';

</script>
