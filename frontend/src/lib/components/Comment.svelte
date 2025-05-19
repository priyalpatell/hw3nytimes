<script lang="ts">
    import { onMount } from 'svelte';
    import CommentBox from "./CommentBox.svelte";
    import { status } from "../state/status.svelte";
    export let data;
    // data {articleid, title}

    let newComment = "";
    // comment {username, comment, display}

    onMount(async () => {
        // call root
        //status.getComments();
    });

</script>

<h2>{data.title}</h2>
<div class="thinborder"></div>

<h1>Comments</h1>
<em>102</em>

<input class="textbox" bind:value={newComment} />
<button on:click={()=>status.appendComment(newComment)}>Submit</button>

{#each status.comments as comment}
    <CommentBox data={comment} />
{/each}