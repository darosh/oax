<template lang="pug">
  .keyboard
    .line(v-for="(line, lineIndex) in keyboard", :key="lineIndex")
      .key(:class="classes[text(key)]" v-for="(key, keyIndex) in line", :key="keyIndex", :style="{'flex-grow': grow(key) ? 1 : 0.2, 'font-size': symbol(key) ? '90%' : '70%'}")
        v-icon(v-if="key.icon" style="width: 12px; height:12px") {{key.icon}}
        | {{key.icon ? '' : text(key)}}
</template>

<script>
  import keyboard from '../../../assets/data/keyboard.json'

  export default {
    props: ['shortcuts'],
    data () {
      const textKeys = {
        PageUp: 'PgUp',
        PageDown: 'PgDn',
        Insert: 'Ins',
        Delete: 'Del'
      }

      return {
        keyboard,
        textKeys,
        defaultClasses: {
          Single: 'key-primary',
          Alt: 'key-success',
          Ctrl: 'key-error',
          Shift: 'key-warning'
        },
        classes: {}
      }
    },
    created () {
      Object.keys(this.shortcuts).forEach(sc => {
        const s = []
        sc.split(' ').forEach(d => d.split('+').forEach(e => s.push(e)))

        if (s.length === 1) {
          this.addClass(s, this.defaultClasses.Single)
        }

        if (s.indexOf('Alt') > -1) {
          this.addClass(s, this.defaultClasses.Alt)
          this.classes.Alt = this.defaultClasses.Alt
        }

        if (s.indexOf('Shift') > -1) {
          this.addClass(s, this.defaultClasses.Shift)
          this.classes.Shift = this.defaultClasses.Shift
        }

        if (s.indexOf('Ctrl') > -1) {
          this.addClass(s, this.defaultClasses.Ctrl)
          this.classes.Ctrl = this.defaultClasses.Ctrl
        }
      })
    },
    methods: {
      addClass (keys, c) {
        keys.forEach(t => {
          const k = this.textKey(t)

          if (!this.defaultClasses[k]) {
            this.classes[k] = this.classes[k] || ''
            if (this.classes[k].indexOf(c) === -1) {
              this.classes[k] += ' ' + c
            }
          }
        })
      },
      textKey (text) {
        return this.textKeys[text] || text
      },
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
    max-width: 500px;
    min-width: 500px;
    display: flex;
    flex-direction: column;
  }

  .keyboard .line:first-child {
    font-size: 85%;
  }

  .keyboard .line {
    display: flex;
    flex: 1;
  }

  .key {
    flex: 1
  }
</style>
