<template>
	<div>
		<label class="block mb-2 text-sm font-medium text-gray-900">
			{{ label }} <span v-if="required" class="text-red-500">*</span>

			<textarea
				v-model="innerVal"
				class="bg-white my-1 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus-visible:ring-primary focus-visible:outline-none focus:border-primary focus-visible:border-primary block w-full px-4 py-2 text-sm leading-5"
				:class="{ '!border-red-500': error }"
				rows="4"
				:placeholder="placeholder"
				v-bind="$attrs"
			></textarea>
		</label>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type IProps = {
	modelValue: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	error?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const props = withDefaults(defineProps<IProps>(), {
	label: "",
	error: false,
});

const emit = defineEmits(["update:modelValue"]);

const innerVal = computed({
	get() {
		return props.modelValue;
	},
	set(v) {
		emit("update:modelValue", v);
	},
});
</script>
