<script lang="ts">
    import { status } from '../state/status.svelte';

    function getTimeOfDay(date: Date = new Date()): 'morning' | 'afternoon' | 'evening' {
        const hour = date.getHours();

        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        return 'evening';
    }

    const now = new Date();
    const timeOfDay = getTimeOfDay(now);    
</script>

<h4>{status.getEmail()}</h4>
<div class="thinborder"></div>
<h2 class="greeting">Good {timeOfDay}.</h2>
<button class="logout body2" on:click={status.logOut}><u>Log out</u></button>