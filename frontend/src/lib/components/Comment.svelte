<script lang="ts">
    import { onMount } from 'svelte';
    import CommentBox from "./CommentBox.svelte";
    import { status } from "../state/status.svelte";
    export let data;
    // data {articleid, title}

    let newComment = $state();
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
            newComment = params;
        } else {
            newComment = comments;
        }
        status.putComments(comments.replies);
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