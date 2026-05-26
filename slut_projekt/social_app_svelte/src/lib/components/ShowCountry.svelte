<script>
    let { result } = $props();
</script>

{#if result.length > 0}
    {#each result as country}
        <p>{country.Name}</p>
    {/each}
{/if}
