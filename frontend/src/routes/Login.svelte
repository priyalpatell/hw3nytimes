<script lang="ts">
    let email = $state("");
    let password = $state("");
</script>

<h4>Email Address</h4>
<input class="textbox" bind:value={email} />

<h4>Password</h4>
<input class="textbox" bind:value={password} />
