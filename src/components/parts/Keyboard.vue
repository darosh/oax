<template lang="pug">
  .keyboard.elevation-1
    .line(v-for="(line, lineIndex) in keyboard", :key="lineIndex")
      .key(:class="classes[text(key)]" v-for="(key, keyIndex) in line", :key="keyIndex", :style="{'flex-grow': grow(key) ? 1 : 0.2, 'font-size': symbol(key) ? '90%' : '70%'}")
        v-icon(v-if="key.icon" style="width: 12px; height:12px") {{key.icon}}
        | {{key.icon ? '' : text(key)}}
</template>

<script>
  import keyboard from '../../assets/keyboard.json'

  export default {
    props: ['shortcuts'],
    data () {
      return {
        keyboard,
        classes: {
          Alt: 'key-success',
          Shift: 'key-warning'
        }
      }
    },
    created () {
      Object.keys(this.shortcuts).forEach(sc => {
        const s = sc.split('+')

        if (s.length === 1) {
          this.classes[s[0]] = 'key-primary'
        } else if (s[0] === 'Alt') {
          this.classes[s[1]] = 'key-success'
        } else if (s[0] === 'Shift') {
          this.classes[s[1]] = 'key-warning'
        }
      })
    },
    methods: {
      text (key) {
        const s = (key.text || key).split(' ')
        return s[1] || s[0]
      },
      grow (key) {
        return key.long
      },
      symbol (key) {
        const c = this.text(key)
        return c.length > 1 ? false : c.charCodeAt(0) > 128
      }
    }
  }
</script>

<style scoped lang="css">
  .keyboard {
    max-width: 520px;
    display: flex;
    flex-direction: column;
  }

  .keyboard .line:first-child {
    font-size: 85%;
  }

  .keyboard {
    background-color: #f8f8f8;
  }

  .keyboard .line {
    display: flex;
    flex: 1;
  }

  .key {
    flex: 1
  }
</style>
