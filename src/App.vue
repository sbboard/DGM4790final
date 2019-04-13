<template>
  <div id="container">
    <header>Smash Bros Series Viewer</header>
    <nav>
      <router-link class="navItem" to="/">Viewer</router-link>
      <router-link class="navItem" to="/charMan">Character Manager (GraphQL)</router-link>
      <router-link class="navItem" to="/seriesMan">Series Manager (nodeJS)</router-link>
    </nav>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="sass">
html
  margin: 0
  padding: 0
  body
    margin: 0
    padding: 0
    #container
      width: 100%
      max-width: 1000px
      display: block
      margin: 0 auto
      background-color: red
      min-height: 100vh
      header
        font-size: 2em
        text-align: center
        padding: .25em 0
      nav
        display: flex
        padding: 1em
        .navItem
          margin-right: 1em
      #content
        padding: 1em
</style>
