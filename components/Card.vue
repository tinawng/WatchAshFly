<template>
  <div ref="card" class="card__container" :class="{'card__dark': burning || dark}">
    <div v-if="img" class="card__logo_container"><img class="card__logo" :src="`/img/${img}`" alt="" /></div>
    <div v-else-if="video" class="bg-black rounded-t-2xl">
      <video class="rounded-t-2xl" loop autoplay muted name="media" :src="video"></video>
    </div>
    <div class="card__slot_container">
      <slot />
    </div>
    <a v-if="link" class="absolute -bottom-5 left-24 button" :class="{'dark': burning || dark}" :href="link">
      <span v-if="burning" class="tracking-wide">Burn</span>
      <span v-else>Collect</span>
    </a>
  </div>
</template>

<script>
export default {
  props: { img: String, link: {type: String, default: null}, video: String, dark: Boolean,  burning: Boolean },

  mounted() {
    if (!this.burning) return;
    let el = this.$refs["card"];
    for (let i = 0; i < 82; i++) {
      var s = document.createElement("img");
      s.setAttribute("src", "/img/burn.svg");
      s.classList.add("burn_icon");

      var speed = this.mapRange(Math.random(), 5, 9);
      var delay = this.mapRange(Math.random(), 0, 5);
      var x_pos = this.mapRange(Math.random(), 0.8, 19.2);
      var rot = this.mapRange(Math.random(), 0, 540);

      s.style.cssText = `--speed: ${speed}s; --delay: ${delay}s; --x-pos: ${x_pos}rem; --rot: ${rot}deg`;

      el.appendChild(s);
    }
  },

  methods: {
    mapRange(num, out_min = 0, out_max = 1, in_min = 0, in_max = 1) {
      return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    },
  },
};
</script>

<style lang="postcss" scoped>
.card__container {
  @apply relative z-50;
  /* @apply h-96 w-64; */
  height: 30rem;
  width: 20rem;
  @apply rounded-2xl;
  @apply grid;
  grid-template-rows: 2fr 1fr;
  @apply shadow-md;
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
.card__title {
  @apply mb-3;
  @apply text-2xl;
}
.card__desc {
  @apply text-base tracking-normal opacity-30;
}
.card__dark .card__desc {
  @apply font-semibold;
}

.card__dark > .card__slot_container {
  @apply bg-white rounded-b-2xl text-dark;
}
</style>

<style lang="postcss">
.burn_icon {
  @apply absolute top-3 -z-1;
  @apply h-3 w-3;
  left: var(--x-pos);
  will-change: transform;

  animation: fly var(--speed) linear var(--delay) infinite;
}

@keyframes fly {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-120vh) rotate(var(--rot));
  }
}
</style>