<script lang="ts">
    import { status, LoginState } from "../state/status.svelte";
    export let data;
    // data {user, body, display}
</script>

<img class="profile" src="https://staging.svgrepo.com/show/295402/user-profile.svg" alt="profile picture" width="40" height="40">
<em class="username">{data.user}</em>

<p>{data.body}</p>

{#if status.loginState == LoginState.Mod}
    <button>Redact</button>
    <button>Delete</button>
{/if}

<div class="thinborder"></div>