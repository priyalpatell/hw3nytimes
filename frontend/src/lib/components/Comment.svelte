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
        let id = data.articleid;
		const r = await fetch(`http://localhost:8000/get_comments?id=${id}`);
		let comments = await r.json();
        if (comments == null) {
            let params = {"id": data.articleid, "replies": [], "count": 0}
			const response = await fetch('http://localhost:8000/post_comments', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
			});
			const temp = await response.json();
			let id_data = temp.inserted_id;
            console.log(id_data);
            status.putComments(params);
        } else {
            status.putComments(comments);
        }
    });

</script>

<h2>{data.title}</h2>
<div class="thinborder"></div>

<h1>Comments</h1>
{#if status.comments}
    <p>{status.comments.count}</p>
{/if}
<br>
<input class="textbox" bind:value={newComment} />
<button class="btn" on:click={()=>status.appendComment(newComment)}>Submit</button>
<br>

{#if status.comments}
    {#each status.comments.replies as comment}
        <CommentBox data={comment} />
    {/each}
{/if}
