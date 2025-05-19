<script lang="ts">
    import { onMount } from 'svelte';
    import { status, SidebarState } from '../state/status.svelte'
    import Account from './Account.svelte';
    import Comment from './Comment.svelte';

    let isOpen = status.sidebar !== SidebarState.None;

    function closeSidebar() {
        status.sidebar = SidebarState.None;
        update();
        console.log("close sidebar");
    }

    function update() {
        isOpen = status.sidebar !== SidebarState.None;
        console.log(isOpen);
    }

    async function commentToDB() {
        let params = {"id":{"id": status.comments!.id}, "change": {"$set":{"replies": status.comments!.replies, "count": status.comments!.count}}}
			const response = await fetch('http://localhost:8000/update_comments', {
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
			});
			const temp = await response.json();
			let data = temp.modified_count;
            console.log(data);
    }

    onMount(() => {
        const unsubscribe = status.onChange(update);
        return unsubscribe;
    });

    let comment = {
        "articleid": "123Abc", 
        "title": "Hi"
    };


</script>
  
<style>
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1000;
    }

  
</style>
  
<!-- Overlay -->
{#if isOpen}
    <div class="overlay" on:click={closeSidebar}></div>
{/if}
  
<!-- Sidebar -->
<div class="sidebar" class:active={status.sidebar !== SidebarState.None}>
    <!-- Content -->
    {#if status.sidebar == SidebarState.Acc}
        <button class="close" on:click={closeSidebar}>X</button>
        <Account />
    {/if}

    {#if status.sidebar == SidebarState.Comment}
    <button class="close" on:click={() => {closeSidebar(); commentToDB();}}>X</button>
        <Comment data={comment}/>
    {/if}
</div>
  