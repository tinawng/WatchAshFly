<template>
  <div class="page__container">
    <section class="ash_price">
      <div class="text-9xl font-semibold overflow-hidden">
        $<span ref="ash-price">{{ash_price.toFixed(3)}}</span>
      </div>
      <h1>Watch the ASH fly</h1>
    </section>

    <section class="one">
      <div class="text-left">
        <div class="overflow-hidden">
          <span ref="ash-rate" class="text-9xl font-semibold">
            <span class="opacity-0">{{ash_rate.toFixed(3)}}</span>
          </span>
        </div>
        <h1>ASH per <a href="https://burn.art/">burn</a></h1>
      </div>
      <card
        burning
        video="https://media.niftygateway.com/video/upload/q_auto:good,w_800/v1618196543/Pak/ACube.mp4"
        link="https://burn.art/"
      >
        <ol>
          <li class="card__title font-bold">Burnt Cubes</li>
          <li>
            <span class="text-2xl">{{burnt_cube}}</span>
            <span class="opacity-40">/ {{total_cube}}</span>
          </li>
        </ol>
      </card>
    </section>

    <section class="two">
      <card-carousel :cubes="cubes_stats"></card-carousel>
      <div class="text-right">
        <div class="overflow-hidden">
          <span ref="total-ash" class="text-9xl font-semibold">
            <span class="opacity-0">{{numberWithCommas(Math.round(total_ash))}}</span>
          </span>
        </div>
        <h1 class="mt-1">ASH total</h1>
      </div>
    </section>

    <section class="marketplaces">
      <div>
        <h1 class="font-semibold" style="text-align: center">Get</h1>
        <h1 style="text-align: center">$ASH</h1>
      </div>
      <card
        style="background: linear-gradient(-135deg, #FF007A 0%, #FF6EBA 100%);"
        img="uniswap.svg"
        link="https://v2.info.uniswap.org/token/0x64d91f12ece7362f91a6f8e7940cd55f05060b92"
      >
        <ol>
          <li class="card__title">Uniswap</li>
          <li class="card__desc">Price floor</li>
          <li>
            <span class="text-2xl">${{ash_price.toFixed(3)}}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{(ash_price / eth_price).toFixed(4)}}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
      <card
        style="background: linear-gradient(25deg, #00DCFA 0%, #90C2FF 100%);"
        img="gemini.svg"
        link="https://www.gemini.com/prices/burn"
      >
        <ol>
          <li class="card__title">Gemini</li>
          <li class="card__desc">Price floor</li>
          <li>
            <span class="text-2xl">${{49.90.toFixed(2)}}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{(49.90 / eth_price).toFixed(4)}}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
    </section>
    <section class="marketplaces flex-row-reverse">
      <div>
        <h1 class="font-semibold" style="text-align: center">"A Cube"</h1>
        <h1 style="text-align: center">floor</h1>
      </div>
      <card
        style="background: linear-gradient(135deg, #00FABA 0%, #00D8FF 100%);"
        img="nifty.svg"
        link="https://niftygateway.com/itemdetail/primary/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/8"
      >
        <ol>
          <li class="card__title">Nifty Gateway</li>
          <li class="card__desc">Cube floor</li>
          <li>
            <span class="text-2xl">${{numberWithCommas(Math.round(nifty_floor.usd))}}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{nifty_floor.eth.toFixed(2)}}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
      <card
        style="background: linear-gradient(45deg, #1868B7 0%, #2BCDE4 100%);"
        img="opensea.svg"
        link="https://opensea.io/assets/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/22700080007"
      >
        <ol>
          <li class="card__title">Opensea Gateway</li>
          <li class="card__desc">Cube floor</li>
          <li>
            <span class="text-2xl">${{numberWithCommas(Math.round(opensea_floor.usd))}}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{opensea_floor.eth.toFixed(2)}}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
    </section>

    <section class="pak">
      <icon ref="pak" class="w-1/3 opacity-0" variant="pak" />
    </section>

    <section class="credits">
      <p><b>Buy me </b><span class="text-l">☕</span></p>
      <p><b>0xC958c2B65E9840F76E34EE660e27cCf254d75Fa4</b></p>
      <p>Base on <a href="https://watchcubesburn.art/">watchcubesburn.art</a> by [secondstate]</p>
    </section>
  </div>
</template>

<script>
import intersection_helper from "~/mixins/intersection-helper.js";
export default {
  mixins: [intersection_helper],

  async fetch() {
    let data = (await this.$http.$post("/", process.env.DATA_API + "/ashStats")).data;
    this.eth_price = 4241.755785657359203069158769979819;
    this.eth_price = parseFloat(data.bundle.ethPriceUSD);
    this.ash_price = this.eth_price * parseFloat(data.token.derivedETH);
    // this.setAshPrice(this.eth_price * parseFloat(data.token.derivedETH));

    // Market Stats
    data = await this.$http.$post("/", process.env.DATA_API + "/niftyfloorStats");
    this.nifty_floor = {
      usd: data.price_in_cents / 100,
      eth: data.price_in_cents / 100 / this.eth_price,
    };
    data = await this.$http.$post("/", process.env.DATA_API + "/osfloorStats");
    this.opensea_floor = { usd: data.floor_price * this.eth_price, eth: data.floor_price };

    // ASH stats
    data = await this.$http.$post("/", process.env.DATA_API + "/ashLiquidityStats");
    this.total_ash = data.totalSupply / 10e17;
    this.ash_rate = 1e3 * Math.pow(0.5, this.total_ash / 5e6);

    // Cubes stats
    data = await this.$http.$post("/", process.env.DATA_API + "/fungibleStats");
    this.total_cube = data.FungibleTotal;
    this.burnt_cubes = data.TotalCubesBurned;
    Object.assign(this.cubes_stats[0], { burnt: data.ACubeBurned, left: data.ACubeLeft });
    Object.assign(this.cubes_stats[1], { burnt: data.FiveCubesBurned, left: data.FiveCubesLeft });
    Object.assign(this.cubes_stats[2], { burnt: data.TenCubesBurned, left: data.TenCubesLeft });
    Object.assign(this.cubes_stats[3], { burnt: data.TwentyCubesBurned, left: data.TwentyCubesLeft });
    Object.assign(this.cubes_stats[4], { burnt: data.FiftyCubesBurned, left: data.FiftyCubesLeft });
    Object.assign(this.cubes_stats[5], { burnt: data.HundredCubesBurned, left: data.HundredCubesLeft });
    Object.assign(this.cubes_stats[6], { burnt: data.FiveHundredCubesBurned, left: data.FiveHundredCubesLeft });
    Object.assign(this.cubes_stats[7], { burnt: data.ThousandCubesBurned, left: data.ThousandCubesLeft });
  },
  data: () => ({
    eth_price: 4241.755785657359203069158769979819,
    ash_price: 47.139,

    nifty_floor: { usd: 39000, eth: 9.18 },
    opensea_floor: { usd: 37389, eth: 8.8 },

    total_cube: 6165,
    burnt_cube: 3260,

    total_ash: 2766202,
    ash_rate: 680.909,

    cubes_stats: [
      {
        name: "A Cube",
        burnt: 3200,
        left: 1948,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_800/v1618196543/Pak/ACube.mp4",
      },
      {
        name: "Five Cubes",
        burnt: 52,
        left: 523,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618197133/Pak/FiveCubes.mp4",
      },
      {
        name: "Ten Cubes",
        burnt: 3,
        left: 244,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196775/Pak/TenCubes.mp4",
      },
      {
        name: "Twenty Cubes",
        burnt: 4,
        left: 116,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196787/Pak/TwentyCubes.mp4",
      },
      {
        name: "Fifty Cubes",
        burnt: 2,
        left: 36,
        video:
          "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1617754887/Ashley/Pak/Fungible Open Edition/5_Fifty_Cubes_mnfy6l.mp4",
      },
      {
        name: "Hundred Cubes",
        burnt: 0,
        left: 34,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196813/Pak/HundredCubes.mp4",
      },
      {
        name: "Five Hundred Cubes",
        burnt: 0,
        left: 4,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196788/Pak/FiveHundredCubes.mp4",
      },
      {
        name: "Thousand Cubes",
        burnt: 0,
        left: 3,
        video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196777/Pak/ThousandCubes.mp4",
      },
    ],
  }),
  watch: {
    ash_price: function (new_value) {
      this.rollOutNumbers(new_value);
    },
  },

  created() {
    //TODO: setTimeout(this.fetch)
  },

  mounted() {
    // 💫 Trigger animation for Ash price
    let el = this.$refs["ash-price"];
    el.innerHTML = el.textContent.replace(/./g, '<span id="slide-number" style="--delay: #s">$&</span>');
    var spans = el.innerHTML.split("#");
    for (let i = 0; i < spans.length - 1; i++) {
      spans[i] = spans[i] + i * 0.06;
    }
    el.innerHTML = spans.join("");

    // 💫 Animation trigger for total Ash
    this.intersectionTrigger(
      this.$refs["total-ash"],
      () => {
        let el = this.$refs["total-ash"];
        el.innerHTML = el.textContent.replace(/./g, '<span class="slide-in" style="--delay: ||s">$&</span>');
        el.innerHTML = el.innerHTML
          .split("||")
          .map((span, i, arr) => (i < arr.length - 1 ? span + i * 0.06 : ""))
          .join("");
      },
      0.6
    );
    // 💫 Animation trigger for Ash rate
    this.intersectionTrigger(
      this.$refs["ash-rate"],
      () => {
        let el = this.$refs["ash-rate"];
        el.innerHTML = el.textContent.replace(/./g, '<span class="slide-in" style="--delay: ||s">$&</span>');
        el.innerHTML = el.innerHTML
          .split("||")
          .map((span, i, arr) => (i < arr.length - 1 ? span + i * 0.06 : ""))
          .join("");
      },
      0.6
    );

    // 💫 Trigger animation for Pak
    this.intersectionTrigger(
      this.$refs["pak"].$el,
      () => {
        this.$refs["pak"].$el.classList.add("invoke");
      },
      0.6
    );
  },

  methods: {
    numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    rollOutNumbers(new_value) {
      let els = document.querySelectorAll("#slide-number");
      for (const el of els) {
        el.classList.remove("slide-in");
        el.classList.add("slide-out");
      }
      setTimeout(() => {
        this.ash_price = new_value;

        let el = this.$refs["ash-price"];
        el.innerHTML = this.ash_price.toFixed(3);
        el.innerHTML = el.textContent.replace(
          /./g,
          '<span id="slide-number" class="slide-in" style="--delay: ||s">$&</span>'
        );
        el.innerHTML = el.innerHTML
          .split("||")
          .map((span, i, arr) => (i < arr.length - 1 ? span + i * 0.06 : ""))
          .join("");
      }, 800);
    },
  },
};
</script>

<style lang="postcss">
section.ash_price {
  height: 100vh;
  @apply max-w-7xl;
  @apply mx-auto;
  @apply pl-12;
  @apply flex flex-col justify-center text-left;
}
#slide-number {
  @apply inline-block;
}
section.one {
  @apply w-full max-w-6xl;
  @apply mx-auto;
  @apply grid items-center;
  grid-template-columns: 2fr 1fr;
}
section.two {
  @apply w-full max-w-6xl;
  @apply mt-40 mx-auto;
  @apply grid items-center;
  grid-template-columns: 1fr 2fr;
}
section.marketplaces {
  @apply w-full max-w-6xl;
  @apply mt-40 mx-auto;
  /* @apply grid items-center gap-12;
  grid-template-columns: repeat(3, auto); */
  @apply flex justify-between items-center;
  @apply bg-white;
}
section.pak {
  @apply mt-40;
  @apply flex justify-center;
}
section.credits {
  @apply h-32 w-full;
  @apply mt-16;
  @apply text-center;
}

/* 💫 Animations */
.invoke {
  animation: invoke 0.6s ease-in-out forwards;
}
@keyframes invoke {
  from {
    opacity: 0;
    transform: translateY(5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  @apply inline-block;
  transform: translateY(1.5ch);
  animation: slide-in 0.8s ease-in-out var(--delay) forwards;
}
@keyframes slide-in {
  from {
    transform: translateY(1.5ch);
  }
  75% {
    transform: translateY(-0.03ch);
  }
  to {
    transform: translateY(0);
  }
}
.slide-out {
  @apply inline-block;
  animation: slide-out 0.8s ease-in-out var(--delay) forwards;
}
@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  25% {
    transform: translateY(0.03ch);
  }
  to {
    transform: translateY(-1.5ch);
  }
}
</style>
