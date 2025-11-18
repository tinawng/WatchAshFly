<script setup>
  import { useIntersectionObserver } from "@vueuse/core"

  // https://uniswap.secondstate.workers.dev/
  const eth_price = 4241.755785657359203069158769979819
  const ash_price = eth_price * parseFloat(0.0002035201649765849895028050358357908)
  // https://niftyfloor.secondstate.workers.dev/
  const nifty_floor = { usd: 742, eth: 742 / eth_price }
  // https://osfloor.secondstate.workers.dev/
  const opensea_floor = { usd: 0.24 * eth_price, eth: 0.24 }
  // https://ashliquidity.secondstate.workers.dev/
  const total_ash = Number(3533572791074633203435063) / 10e17
  const ash_rate = 1e3 * Math.pow(0.5, total_ash / 5e6)
  // https://fungible.secondstate.workers.dev/
  const total_cube = 6165
  const burnt_cube = 3730
  const cubes_stats = [
    {
      name: "A Cube",
      burnt: 1550,
      left: 3598,
      video: "https://media.niftygateway.com/video/upload/q_auto:good,w_800/v1618196543/Pak/ACube.mp4",
    },
    {
      name: "Five Cubes",
      burnt: 113,
      left: 458,
      video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618197133/Pak/FiveCubes.mp4",
    },
    {
      name: "Ten Cubes",
      burnt: 13,
      left: 234,
      video: "https://media.niftygateway.com/video/upload/q_auto:good,w_500/v1618196775/Pak/TenCubes.mp4",
    },
    {
      name: "Twenty Cubes",
      burnt: 6,
      left: 114,
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
  ]

  const ash_price_el = useTemplateRef("ash-price")
  const total_ash_el = useTemplateRef("total-ash")
  const ash_rate_el = useTemplateRef("ash-rate")
  const pak_el = useTemplateRef("pak")

  onMounted(() => {
    // 💫 Trigger animation for Ash price
    ash_price_el.value.innerHTML = ash_price_el.value.textContent.replace(/./g, '<span id="slide-number" style="--delay: #s">$&</span>')
    var spans = ash_price_el.value.innerHTML.split("#")
    for (let i = 0; i < spans.length - 1; i++) {
      spans[i] = spans[i] + i * 0.06
    }
    ash_price_el.value.innerHTML = spans.join("")

    rollOutNumbers()

    // 💫 Animation trigger for total Ash
    useIntersectionObserver(total_ash_el, () => {
      total_ash_el.value.innerHTML = total_ash_el.value.textContent.replace(/./g, '<span class="slide-in" style="--delay: ||s">$&</span>')
      total_ash_el.value.innerHTML = total_ash_el.value.innerHTML
        .split("||")
        .map((span, i, arr) => (i < arr.length - 1 ? span + i * 0.06 : span))
        .join("")
    })

    // 💫 Animation trigger for Ash rate
    useIntersectionObserver(ash_rate_el, () => {
      ash_rate_el.value.innerHTML = ash_rate_el.value.textContent.replace(/./g, '<span class="slide-in" style="--delay: ||s">$&</span>')
      ash_rate_el.value.innerHTML = ash_rate_el.value.innerHTML
        .split("||")
        .map((span, i, arr) => (i < arr.length - 1 ? span + i * 0.06 : span))
        .join("")
    })

    // 💫 Trigger animation for Pak
    useIntersectionObserver(
      pak_el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) pak_el.value.$el.classList.add("invoke")
      },
      { threshold: 0.6 }
    )
  })

  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  function rollOutNumbers() {
    let els = document.querySelectorAll("#slide-number")
    for (const el of els) {
      el.classList.remove("slide-in")
      el.classList.add("slide-out")
    }
    setTimeout(() => {
      ash_price_el.value.innerHTML = ash_price.toFixed(3)
      ash_price_el.value.innerHTML = ash_price_el.value.textContent.replace(
        /./g,
        '<span id="slide-number" class="slide-in" style="--delay: ||s">$&</span>'
      )
      ash_price_el.value.innerHTML = ash_price_el.value.innerHTML
        .split("||")
        .map((span, i, arr) => (i < arr.length - 1 ? span + i * 0.06 : span))
        .join("")
    }, 800)
  }
</script>

<template>
  <div class="page__container">
    <section class="ash_price">
      <div class="section__title overflow-hidden"> $<span ref="ash-price">0.000</span> </div>
      <h1>Watch the ASH fly</h1>
    </section>

    <section id="ash-rate" class="ash_rate">
      <div class="text-left">
        <div class="overflow-hidden">
          <span ref="ash-rate" class="section__title">
            <span class="opacity-0">{{ ash_rate.toFixed(3) }}</span>
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
            <span class="text-2xl">{{ burnt_cube }}</span>
            <span class="opacity-40">/ {{ total_cube }}</span>
          </li>
        </ol>
      </card>
    </section>

    <section class="two">
      <card-carousel :cubes="cubes_stats"></card-carousel>
      <div class="text-right">
        <div class="overflow-hidden">
          <span ref="total-ash" class="section__title">
            <span class="opacity-0">{{ numberWithCommas(Math.round(total_ash)) }}</span>
          </span>
        </div>
        <h1 class="mt-1">total ASH</h1>
      </div>
    </section>

    <section id="get-ash" class="ash-marketplaces">
      <div class="text-center text-8xl tracking-tighter">
        <p class="font-semibold">Get</p>
        <p class="highlight">$ASH</p>
      </div>
      <card
        style="background: linear-gradient(-135deg, #ff007a 0%, #ff6eba 100%)"
        img="uniswap.svg"
        link="https://info.uniswap.org/#/tokens/0x64d91f12ece7362f91a6f8e7940cd55f05060b92"
      >
        <ol>
          <li class="card__title">Uniswap</li>
          <li class="card__desc">Price floor</li>
          <li>
            <span class="text-xl md:text-2xl">${{ ash_price.toFixed(3) }}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{ (ash_price / eth_price).toFixed(4) }}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
      <card style="background: linear-gradient(25deg, #00dcfa 0%, #90c2ff 100%)" img="gemini.svg" link="https://www.gemini.com/prices/burn">
        <ol>
          <li class="card__title">Gemini</li>
          <li class="card__desc">Price floor</li>
          <li>
            <span class="text-xl md:text-2xl">${{ (39.4).toFixed(2) }}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{ (39.4 / eth_price).toFixed(4) }}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
    </section>

    <section id="get-cube" class="cube-marketplaces">
      <div class="text-center text-6xl md:text-8xl tracking-tighter">
        <p class="font-semibold">"A Cube"</p>
        <p>floor</p>
      </div>
      <card
        style="background: linear-gradient(135deg, #00faba 0%, #00d8ff 100%)"
        img="nifty.svg"
        link="https://niftygateway.com/itemdetail/primary/0xc0cf5b82ae2352303b2ea02c3be88e23f2594171/8"
      >
        <ol>
          <li class="card__title">Nifty Gateway</li>
          <li class="card__desc">Cube floor</li>
          <li>
            <span class="text-xl md:text-2xl">${{ numberWithCommas(Math.round(nifty_floor.usd)) }}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{ nifty_floor.eth.toFixed(2) }}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
      <card
        style="background: linear-gradient(45deg, #1868b7 0%, #2bcde4 100%)"
        img="opensea.svg"
        link="https://opensea.io/collection/the-fungible-by-pak"
      >
        <ol>
          <li class="card__title">Opensea Gateway</li>
          <li class="card__desc">Cube floor</li>
          <li>
            <span class="text-xl md:text-2xl">${{ numberWithCommas(Math.round(opensea_floor.usd)) }}</span>
            <span class="tracking-wide opacity-40">&nbsp;/ {{ opensea_floor.eth.toFixed(2) }}</span>
            <span class="opacity-40">♦</span>
          </li>
        </ol>
      </card>
    </section>

    <section class="pak">
      <icon ref="pak" class="w-2/3 md:w-1/3 opacity-0" variant="pak" />
    </section>

    <section class="credits">
      <p><b>Buy me </b><span>☕</span></p>
      <p><b>0xC958c2B65E9840F76E34EE660e27cCf254d75Fa4</b></p>
      <p>Based on <a href="https://watchcubesburn.art/" target="_blank">watchcubesburn.art</a> by [secondstate]</p>
    </section>
  </div>
</template>

<style lang="postcss">
  section.ash_price {
    @apply h-120 md:h-screen max-w-7xl;
    @apply mx-auto;
    @apply pl-12;
    @apply flex flex-col justify-center text-left;
  }
  #slide-number {
    @apply inline-block;
  }
  section.ash_rate {
    @apply w-full max-w-6xl;
    @apply mx-auto;
    @apply flex flex-col-reverse items-center gap-y-16;
    @apply md:grid;
    grid-template-columns: 2fr 1fr;
  }
  section.two {
    @apply w-full max-w-6xl;
    @apply pt-40 mx-auto;
    @apply flex flex-col items-center gap-y-10;
    @apply md:grid;
    grid-template-columns: 1fr 2fr;
  }
  section.ash-marketplaces {
    @apply w-full max-w-6xl;
    @apply pt-40 mx-auto;
    @apply flex flex-col md:flex-row justify-between items-center gap-y-20;
  }
  section.cube-marketplaces {
    @apply w-full max-w-6xl;
    @apply pt-40 mx-auto;
    @apply flex flex-col md:flex-row-reverse justify-between items-center gap-y-14;
  }
  section.pak {
    @apply mt-20 md:mt-40;
    @apply flex justify-center;
  }
  section.credits {
    @apply h-32 w-full;
    @apply mt-16;
    @apply text-sm md:text-base text-center;
  }

  /* 💫 Animations */
  .highlight {
    @apply text-transparent;
    @apply bg-clip-text;
    background-image: linear-gradient(45deg, #aa85ff, #ffc39b);
    animation: hue-rotation 1.2s linear infinite;
  }
  @keyframes hue-rotation {
    from {
      filter: hue-rotate(0deg);
    }
    to {
      filter: hue-rotate(1turn);
    }
  }

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
