<script lang="ts">
    import { status, LoginState } from "../state/status.svelte";
    export let data;
    // data {user, body, display}
</script>

<img src="profile">
<em>{data.user}</em>

<p>{data.body}</p>

{#if status.loginState == LoginState.Mod}
    <button>Redact</button>
    <button>Delete</button>
{/if}

<div class="thinborder"></div>