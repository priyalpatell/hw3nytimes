<script lang="ts">
    import { onMount } from 'svelte';
    import { status, SidebarState } from '../state/status.svelte'
    import Account from './Account.svelte';

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

    onMount(() => {
        const unsubscribe = status.onChange(update);
        return unsubscribe;
    });


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
    <button class="close" on:click={closeSidebar}>X</button>
    <!-- Content -->
    {#if status.sidebar == SidebarState.Acc}
        <Account />
    {/if}

    {#if status.sidebar == SidebarState.Comment}
        <h2>Comment</h2>
        <p>This is the sidebar content.</p>
    {/if}
</div>
  