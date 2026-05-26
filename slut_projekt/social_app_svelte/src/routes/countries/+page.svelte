<script>
    import ShowCountry from "$lib/components/ShowCountry.svelte";

    let input = $state();
    let result = $state([]);

    async function handleOnclick() {
        let resultRes = await fetch(
            "http://localhost/get_country.php?input=" + input,
        );

        result = await resultRes.json();
    }
</script>

<div>
    <section>
        <input type="text" bind:value={input} />
        <button onclick={handleOnclick}>Search</button>

        <ShowCountry {result} />
    </section>
</div>
