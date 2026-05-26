<script>
    import Post from "$lib/components/Post.svelte";
    import PostBox from "$lib/components/PostBox.svelte";

    let { data } = $props();
</script>

{#if data.user.isLoggedIn}
    <section>
        <h2>welcome, {data.user.username}!</h2>

        <div>
            <PostBox />
            {#each data.posts as post}
                <Post {post} />
            {/each}
        </div>
    </section>
{:else}
    <section>
        <h1>Welcome to EgyTalk</h1>

        <p>
            Please <a href="/login">Login</a> or
            <a href="/register">Register</a> to join this social app.
        </p>
    </section>
{/if}

<style lang="scss">
    a {
        font-weight: bold;
    }

    h2 {
        font-weight: bold;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
</style>
