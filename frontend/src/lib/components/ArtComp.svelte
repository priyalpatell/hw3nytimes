<script>
    // get data from props
    // data {section, headline, snippet, image, caption}
    export let data;
</script>

<!-- template for each article component -->
<article class="item">
    <h1>{data.headline}</h1>
    <p>
        {data.snippet}
    </p>
    {#if data.image}
    <img src={data.image} alt={data.caption}>
    {:else}
    {/if}
</article>