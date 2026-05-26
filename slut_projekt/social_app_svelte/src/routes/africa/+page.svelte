<script>
    import Country from "$lib/components/Country.svelte";

    let { data } = $props();
</script>

<h2>countries in {data.continent}</h2>

<div>
    {#each data.countries as country}
        <Country countryData={country} />
    {/each}
</div>

<style>
    h2 {
        font-weight: bold;
    }
</style>