<script lang="ts">
    import { onMount } from 'svelte';
	let data = $state();
    onMount(async () => {
		try {
			
			/*
			// getting an article
			let userId = "testval1"
			const r = await fetch(`http://localhost:8000/get_article?id=${userId}`);
			data = await r.json();
			data = data.test;
			*/
			// adding an article
			/*
			const response = await fetch('http://localhost:8000/post_article', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({"test":"testval1"})
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
	<p>{data}</p>
</main>