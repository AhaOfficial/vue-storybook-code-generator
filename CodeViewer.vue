<template>
  <div>
    <pre class="sample-code"><code class="language-html">{{code}}</code></pre>
    <button class="copyButton" @click="copy" :data-clipboard-text="code">
      <div v-if="isCopied === true">
        <p>🎉&nbsp;&nbsp;Copied!</p>
      </div>
      <div v-else>
        <p>✂️&nbsp;&nbsp;Copy Source Code</p>
      </div>
    </button>
  </div>
</template>

<script>
let code = ``
const data = {
  isCopied: false
}
export default {
  props: ['code'],
  data: context => {
    code = context.code
    return data
  },
  methods: {
    copy: () => {
      data.isCopied = true
      try {
        new window.ClipboardJS('.copyButton')
      } catch (e) {}
      setTimeout(() => {
        data.isCopied = false
      }, 600)
    }
  },
  mounted: () => {
    const importScript = src => {
      return new Promise((resolve, reject) => {
        let s = document.createElement('script')
        s.addEventListener('load', resolve)
        s.type = 'text/javascript'
        s.charset = 'utf-8'
        s.src = src
        document.body.appendChild(s)
      })
    }
    const importStyle = href => {
      return new Promise((resolve, reject) => {
        let s = document.createElement('link')
        s.addEventListener('load', resolve)
        s.rel = 'stylesheet'
        s.type = 'text/css'
        s.href = href
        document.body.appendChild(s)
      })
    }

    const importManager = async () => {
      await importScript(
        `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/highlight.min.js`
      )
      await importScript(
        `https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.6/clipboard.min.js`
      )
      await importStyle(
        `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/styles/tomorrow.min.css`
      )
      if (window && window.hljs) {
        document.querySelectorAll('pre code').forEach(block => {
          window.hljs.highlightBlock(block)
        })
      }
    }
    importManager()
  }
}
</script>

<style scoped>
.sample-code {
  white-space: normal;
}
.copyButton {
  width: 100%;
  height: 45px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  margin-top: 10px;
  user-select: none;
  outline: none;
  font-weight: 600;
  font-size: 15px;
  color: #333333;
}
.copyButton:hover {
  background: aliceblue;
}
</style>
