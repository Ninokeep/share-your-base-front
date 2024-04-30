<script setup lang="ts">
const inputValue = ref("");
const typingTimer = ref(null);

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();
const props = defineProps({
  placeholder: String,
});
const sendRequestApi = () => {
  emit("change", inputValue.value);
};

const debounceSendRequestApi = () => {
  clearTimeout(typingTimer.value);
  typingTimer.value = setTimeout(sendRequestApi, 500);
};

watch(inputValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    debounceSendRequestApi();
  }
});
</script>
<template>
  <Input
    class="w-[300px] mx-4 my-5"
    v-model.lazy="inputValue"
    :placeholder="$props.placeholder"
  />
</template>
