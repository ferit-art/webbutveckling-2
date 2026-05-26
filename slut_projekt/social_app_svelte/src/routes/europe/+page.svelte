<script>
    import Country from "$lib/components/Country.svelte";

    let { data } = $props();
</script>

<h2>countries in {data.continent}</h2>

{#each data.countries as country}
    <Country countryData={country} />
{/each}

<style>
    h2 {
        font-weight: bold;
    }
</style>
