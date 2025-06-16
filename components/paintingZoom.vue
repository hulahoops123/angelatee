!<template>
    <div class="inset-0 absolute z-10 p-4 rounded-2xl bg-red-300" @click="emits('closepreview')">
        <p>{{ props.picid }}</p>
        <!-- <NuxtImg loading="lazy" :src="getImageUrl('1')" >        </NuxtImg> -->
        <NuxtImg loading="lazy" :src="getImageUrl(props.picid)" >        </NuxtImg>
        <!-- <img @click="emits('closepreview')" src="/assets/carousel_images/1.jpg" ></img> -->
    </div>
</template>

<script setup>
const props = defineProps(["picid"]);
const emits = defineEmits(['closepreview']);
// watch(props.picid, ()=>{console.log(props.picid);});
// console.log(props.picid);
function getImageUrl(name) {
    return new URL(name, import.meta.url).href

    // return new URL(`/assets/carousel_images/${name}.jpg`, import.meta.url).href
}
// console.log(getImageUrl(props.picid));

</script>

<style lang="scss" scoped>

</style>