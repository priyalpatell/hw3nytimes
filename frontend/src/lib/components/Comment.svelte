<script lang="ts">
    import CommentBox from "./CommentBox.svelte";
    import { status } from "../state/status.svelte";
    export let data;
    // data {myuser, articleid, title}

    let newComment = "";

    let comments = $state([]);
    // comment {username, comment, display}

    onMount(async () => {
        // call root
        
    });

</script>

<h1>Comments</h1>
<em>102</em>

<input class="textbox" bind:value={newComment} />
<button on:click={()=>status.appendComment(newComment)}>Submit</button>

{#each status.comments as comment}
    <CommentBox data={comment} />