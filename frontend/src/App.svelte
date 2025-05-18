<script lang="ts">
  import { onMount } from 'svelte';
  import Articles from './routes/Articles.svelte';
  import Login from './routes/Login.svelte';
  import { status, LoginState } from './lib/state/status.svelte'
  import Test from './routes/Test.svelte';

  let displayDate = $state();

  onMount(() => {

    let date: Date = new Date();
    let formattedDate: String = new Intl.DateTimeFormat('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
        }).format(date);
    displayDate = formattedDate;
  })
  

</script>

<nav>
  <div class="header">
      <div id="date">{status.loginState != LoginState.Loading ? displayDate : ''}</div>
      <button class="title">
          <span on:click={()=> status.mainpage()}>The New York Times</span>
      </button>
      {#if status.loginState == LoginState.Loading}
      {:else if status.loginState == LoginState.None}
        <button class="button" on:click={()=> status.loggingIn()}>
          <h3>Log in</h3>
        </button>
      {:else}
        <button class="button">
          <h3>Account</h3>
        </button>
      {/if}
  </div>
  <div id="outer-double">
      <div id="double"></div>
  </div>
</nav>

<main>
  {#if status.loginState == LoginState.Loading}
    <Login />
  {:else}
    <!-- <Test /> -->
    <Articles />
  {/if}
</main>
