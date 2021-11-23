<template>
  <div class="page__container">
    <!-- <section class="ash_price">
      <h1>Watch the ASH fly</h1>
      <span class="h1">${{ash_price.toFixed(3)}}</span>
    </section> -->
    <section class="cards">
      <card
        style="background: linear-gradient(135deg, #00FABA 0%, #00D8FF 100%);"
        img="nifty.svg"
        link="https://niftygateway.com/itemdetail/primary/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/8"
      >
        <ol>
          <li class="mb-2 text-lg">Nifty Gateway</li>
          <li class="text-xs opacity-30">Cube floor</li>
          <li>$39,00</li>
        </ol>
      </card>
      <card
        class="mb-16"
        style="background: linear-gradient(45deg, #1868B7 0%, #2BCDE4 100%);"
        img="opensea.svg"
        link="https://opensea.io/assets/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/22700080007"
      >
        <ol>
          <li class="mb-2 text-lg">Opensea Gateway</li>
          <li class="text-xs opacity-30">Cube floor</li>
          <li>$39,00</li>
        </ol>
      </card>
      <card
        burning
        video="https://media.niftygateway.com/video/upload/q_auto:good,w_800/v1618196543/Pak/ACube.mp4"
        link="https://burn.art/"
      >
        <ol>
          <li class="mb-2 text-lg font-bold">Burnt Cubes</li>
          <li>3,259 <span class="text-xs opacity-40">/ 6165</span></li>
        </ol>
      </card>
    </section>
    <section class="ash_stats">
      <div></div>
      <div class="bg-dark"></div>
    </section>
    <section class="credits"></section>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  components: { Card },
  async fetch() {
    let data = (await this.$http.$post("/", process.env.DATA_API + "/ashStats")).data;

    this.eth_price = parseFloat(data.bundle.ethPriceUSD);
    // this.ash_price = (this.eth_price * parseFloat(data.token.derivedETH)).toFixed(3);
    this.setAshPrice(this.eth_price * parseFloat(data.token.derivedETH));
  },
  data: () => ({
    eth_price: 0,
    ash_price: 40,
  }),

  created() {
    //   setTimeout(this.fetch)
  },

  methods: {
    setAshPrice(new_val) {
      let start = this.ash_price;
      let end = new_val;

      var range = end - start;
      var current = start;
      var increment = end > start ? 0.001 : -1;
      var stepTime = 1;
      var timer = setInterval(() => {
        current += increment;
        this.ash_price = current;
        if (current >= end) {
          clearInterval(timer);
        }
      }, stepTime);
    },
  },
};
</script>

<style lang="postcss">
section.ash_price {
  @apply h-screen w-2/3;
  @apply pl-12;
  @apply flex flex-col justify-center;
  @apply bg-dark text-white;
}
section.cards {
  height: 80vh;
  @apply w-full;
  @apply bg-white;
  @apply flex justify-center items-center gap-8;
}
section.ash_stats {
  height: 80vh;
  @apply w-full;
  @apply grid;
  grid-template-columns: 1fr 2fr;
}
section.credits {
  @apply h-32 w-full;
}
</style>
