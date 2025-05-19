<script lang="ts">
    import { onMount } from 'svelte';
	import { redactComment } from '../lib/utils/redactComment'

	let data = $state();
	let temp = $state();
    onMount(async () => {
		try {
			/*
			// redact a comment
			let userId = "testval2"
			const r = await fetch(`http://localhost:8000/get_comments?id=${userId}`);
			data = await r.json();
			let newBody = "n"
			const redactedBody = redactComment(data.data, newBody)

			let params = {"id":{"test":"testval2"}, "change": {"$set":{"data": redactedBody}}}
			const response = await fetch('http://localhost:8000/update_comments', {
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
			});
			const res = await response.json();
			temp = res.modified_count;
			*/
			/*
			// get nytimes articles
			let city = "Davis CA";
			const r = await fetch(`http://localhost:8000/get_articles?city=${city}`);
			data = await r.json();
			console.log(data);
			*/
			/*
			// delete a comment
			let params = {"test":"Test"}
			const response = await fetch('http://localhost:8000/delete_comments', {
			method: 'DELETE',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
			});
			const temp = await response.json();
			data = temp.deleted_count;
			*/
			/*
			// update a comment
			let params = {"id":{"test":"testval2"}, "change": {"$set":{"data": "new"}}}
			const response = await fetch('http://localhost:8000/update_comments', {
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
			});
			const temp = await response.json();
			data = temp.modified_count;
			*/
			/*
			// getting all comments
			const r = await fetch('http://localhost:8000/get_all_comments');
			data = await r.json();
			*/
			/*
			// getting a comment
			let userId = "testval1"
			const r = await fetch(`http://localhost:8000/get_comments?id=${userId}`);
			let val = await r.json();
			*/
			/*
			// adding a comment
			let params = {"test":"testval2", "data": "original"}
			const response = await fetch('http://localhost:8000/post_comments', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
			});
			const temp = await response.json();
			id_data = temp.inserted_id;
			*/
		} catch(error) {
			console.error('Failed to add/post to db', error);
		}
	});
	let loggedIn = $state(false);
</script>

<main>
<!-- for testing get all comments -->
<!-- 
	{#each data as comment}
          <p>{comment.test}</p>
    {/each}
-->
<p>{data}</p>
</main>