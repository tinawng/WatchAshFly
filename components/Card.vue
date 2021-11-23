<template>
  <div ref="card" class="card__container" :class="{'card__burning': burning}">
    <div v-if="img" class="card__logo_container"><img class="card__logo" :src="`/img/${img}`" alt="" /></div>
    <div v-else-if="video">
      <video class="rounded-t-2xl" loop autoplay muted name="media" :src="video"></video>
    </div>
    <div class="card__slot_container">
      <slot />
    </div>
    <a class="absolute -bottom-5 left-16 button" :class="{'dark': burning}" :href="link">
      <span v-if="burning">Burn</span>
      <span v-else>Buy</span>
    </a>
  </div>
</template>

<script>
export default {
  props: { img: String, link: String, video: String, burning: Boolean },

  mounted() {
    if (!this.burning) return;
    let el = this.$refs["card"];
    var s = document.createElement("svg");
    var p = document.createElement("polygon");
    console.log(s);
    // el.appendChild(cross);

    // <polygon points="225 9 234 0 243 9 252 0 261 9 252 18 261 27 252 36 243 27 234 36 225 27 234 18 225 9"></polygon>
  },
};
</script>

<style lang="postcss" scoped>
.card__container {
  @apply relative z-50;
  @apply h-96 w-64;
  @apply rounded-2xl;
  @apply grid;
  grid-template-rows: 2fr 1fr;
}

.card__logo_container {
  @apply flex justify-center items-center;
}
.card__logo {
  @apply w-1/2;
}

.card__slot_container {
  @apply px-8 py-4;
  @apply bg-dark rounded-b-2xl text-white;
}

.card__burning {
  @apply shadow-md;
}
.card__burning > .card__slot_container {
  @apply bg-white rounded-b-2xl text-dark;
}
</style>