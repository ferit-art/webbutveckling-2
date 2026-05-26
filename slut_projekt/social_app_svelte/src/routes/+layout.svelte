<script>
	import Header from "$lib/components/Header.svelte";
	import "$lib/global.scss";

	let { children } = $props();
</script>

<Header />
<main>
	{@render children()}
</main>
