<script>
    import { LoginState, status } from "../state/status.svelte";

    // get data from props
    // data {id, section, headline, snippet, image, caption}
    export let data;
</script>

<!-- template for each article component -->
<article class="item">
    <h1>{data.headline}</h1>
    <p class="subtitles">
        {data.snippet}
    </p>
    {#if data.image}
    <img src={data.image} alt={data.caption}>
    {:else}
    {/if}
    {#if status.loginState != LoginState.None}
        <button class="commentbtn" on:click={() => status.toggleComment()}>
            <img src="https://cdn3.iconfinder.com/data/icons/chat-38/30/chat-bubble-square-1-512.png" alt="Comment icon" width="40" height="40"/>
            <em>123</em>
        </button>
    {/if}
</article>