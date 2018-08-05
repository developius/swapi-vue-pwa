<template>
  <div id="app">
    <header>
      <span>Star Wars API Vue PWA</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="SWAPI PWA">
      <router-view></router-view>
    </main>
    <footer>
      <span>Created by <a href="https://finnian.io/goto/twitter">Finnian Anderson</a> using data from the <a href="https://swapi.co">Star Wars API</a> by <a href="https://twitter.com/phalt_">Paul Hallett</a>.</span>
      <span><a href="https://finnian.io/blog/deploying-a-vue-pwa-to-now">Read more</a></span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Star Wars API Vue PWA',
    meta: [
      { name: 'description', content: 'A Progressive Web App built with Vue and backed by data from the Star Wars API.', vmid: 'description' },
      { name: 'og:description', content: 'A Progressive Web App built with Vue and backed by data from the Star Wars API.', vmid: 'og:description' }
    ]
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-bottom: 8em;
}

header, footer {
  background-color: #35495E;
  color: #ffffff;
}

header, footer {
  font-size: 1.5em;
  padding: 0.5em 1em;
  min-height: 2em;
}

header span,
footer span {
  display: block;
  line-height: 1;
  letter-spacing: .02em;
  box-sizing: border-box;
}

footer {
  padding: 1em 1.5em;
  font-size: 1em;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

footer span:first-of-type {
  margin-bottom: .5em;
}

footer a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

</style>
