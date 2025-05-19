<script lang="ts">
    import { status } from "../state/status.svelte";
    export let data;
    // data {user, body, display}
</script>

<img src="profile">
<em>{data.user}</em>

<p>{data.body}</p>

<button>Reply</button>
<!-- if mod -->
<button>Redact</button>
<button>Delete</button>

<div class="thinline"></div>