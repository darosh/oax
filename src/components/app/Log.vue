<template lang="pug">
  div
    div(v-for="(i, k) in items", :style="{opacity: (k && !log) ? Math.min(0.8, Math.max(0.33, 1 / (k / 2))) : 1, 'margin-bottom': !k && !log ? '16px' : 0}" style="position: relative")
      span(v-if="i.elapsed || k" style="inline-block; position: absolute; right: 0px; font-family: 'Roboto Mono', monospaced") +{{i.elapsed}} ms
      b.error--text(v-if="i.elapsed > 200" style="inline-block; position: absolute; right: -16px; font-family: 'Roboto Mono', monospaced;") !
      <!--span(v-if="log && (i.elapsed || k)" style="inline-block; position: absolute; right: -64px; font-family: 'Roboto Mono', monospaced") {{Math.round(i.done * 100)}}%-->
      span(style="inline-block; font-size: 16px") {{i.text}}
        span(v-if="!k && !i.elapsed") &hellip;
    div(style="position: relative")
      b(:style="{opacity: !log ? 0.33 : 1}" style="inline-block; position: absolute; right: 0px; font-family: 'Roboto Mono', monospaced") {{items.elapsed}} ms
</template>

<script>
  export default {
    props: ['items', 'log']
  }
</script>
