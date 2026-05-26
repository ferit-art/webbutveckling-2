<script>
    import CommentBox from "./CommentBox.svelte";

    let { post } = $props();

    let firstname = $derived(
        post.sender.firstname[0].toUpperCase() + post.sender.firstname.slice(1),
    );

    let surname = $derived(
        post.sender.surname[0].toUpperCase() + post.sender.surname.slice(1),
    );
</script>

<section>
    <h3>{firstname} {surname}</h3>

    <table>
        <tbody>
            <tr>
                <td class="padding">{@html post.post_txt}</td>
            </tr>
            <tr>
                <td class="date">{post.date}</td>
            </tr>

            {#if post.comments}
                <tr>
                    <td class="padding">Comments:</td>
                </tr>

                {#each post.comments as comment}
                    <tr>
                        <td>{comment.firstname} {comment.surname}</td>
                    </tr>
                    <tr>
                        <!-- The @html tag decodes the safe characters back into visual elements
                    -->
                        <td>{@html comment.comment_txt}</td>
                    </tr>
                    <tr>
                        <td class="date">{comment.date}</td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>

    <CommentBox postId={post.pid} />
</section>

<style lang="scss">
    section {
        padding: 2rem;
        border: 2px solid black;
        border-radius: 6px;
        vertical-align: top;

        p {
            font-size: small;
        }

        h3 {
            font-size: 18px;
            margin-bottom: 1rem;
        }

        table {
            border-collapse: collapse;
            font-size: 14px;

            .padding {
                padding-bottom: 1rem;
                font-size: large;
            }

            .date {
                font-size: smaller;
                padding-inline: 0;
                padding-bottom: 1rem;
            }

            td {
                font-size: medium;
                font-weight: bold;
                text-align: left;
            }
        }
    }
</style>
