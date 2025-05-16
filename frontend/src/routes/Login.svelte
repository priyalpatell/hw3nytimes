<script lang="ts">
    import { status } from '../lib/state/status.svelte';
    let email = $state("");
    let password = $state("");
</script>

<main>
    <h2>Log in or create an account.</h2>
    <div class="center_item">
        <h4 class="label">Email Address</h4>
        <input class="textbox" bind:value={email} />
    </div>
    <div class="center_item">
        <h4 class="label">Password</h4>
        <input type="password" id="password" name="password" class="textbox" bind:value={password} />
    </div>
    <div class="center_item">
        <button class="login_btn" on:click={()=> status.logIn({email}, {password})}>
            Continue
        </button>
    </div>
</main>
