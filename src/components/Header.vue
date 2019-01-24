<template>
  <div class="container">
    <h1>Five Dice Stud</h1>
    <ul class="container">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/highscores">High Scores</router-link>
      <li><a href="https://github.com/jckuhl/dice-game">View On Github</a></li>
      <li><a href="https://www.projectbreakpoint.net/">Project Breakpoint</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2 {
    flex: 5;
  }

  ul {
    flex: 1;
    justify-content: flex-end;
  }

  a {
    margin: 1em;
  }

  li {
    list-style: none;
    margin: 1rem;
  }

</style>
