<template>
  <div class="container">
    <h1>Smash Bros Series Viewer</h1>
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Viewer</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/charMan">Character Manager (GraphQL)</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/seriesMan">Series Manager (nodeJS)</router-link>
      </li>
    </ul>
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
</style>
