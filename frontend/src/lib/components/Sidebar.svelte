<script lang="ts">
    import { status, SidebarState } from '../state/status.svelte'

    $: isOpen = status.sidebar !== SidebarState.None;

</script>
  
<style>
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1000;
    }
  
    .sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100vh;
      background: white;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
      padding: 20px;
      z-index: 1001;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }
  
    .sidebar.active {
      transform: translateX(0);
    }
  
    .toggle-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1100;
    }
</style>
  
<!-- Overlay -->
{#if isOpen}
    <div class="overlay" on:click={status.closeSidebar}></div>
{/if}
  
  <!-- Sidebar -->
<div class="sidebar" class:active={isOpen}>
    <!-- Content -->
    {#if status.sidebar == SidebarState.Acc}
        <h2>Account</h2>
        <p>This is the sidebar content.</p>
    {:else if status.sidebar == SidebarState.Comment}
        <h2>Comment</h2>
        <p>This is the sidebar content.</p>
    {/if}
</div>
  