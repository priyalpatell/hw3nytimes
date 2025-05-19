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
<p>102</p>
<br>
<input class="textbox" bind:value={newComment} />
<button class="btn" on:click={()=>status.appendComment(newComment)}>Submit</button>
<br>

{#each status.comments as comment}
    <CommentBox data={comment} />
{/each}