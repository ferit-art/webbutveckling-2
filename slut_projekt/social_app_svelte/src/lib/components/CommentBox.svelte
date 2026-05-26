<script>
    let isOpen = $state(false);

    let { postId } = $props();

    function toggleCommentBox() {
        isOpen = !isOpen;
    }

    let content = $state("");
    let message = $state();

    async function handleCommentCreation(event) {
        event.preventDefault();

        const response = await fetch("http://localhost/create_comment.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment_txt: content, post_id: postId }),
            credentials: "include",
        });

        const result = await response.json();

        if (result === true) {
            message = "Comment added!";
        } else {
            message = "The process failed.";
        }
    }
</script>

<button onclick={toggleCommentBox}>add comment</button>

<section class:show={isOpen}>
    <form onsubmit={handleCommentCreation}>
        <textarea bind:value={content} placeholder="content" required
        ></textarea>
        <br />
        <button type="submit">upload</button>
    </form>

    {#if message}
        <p>{message}</p>
    {/if}
</section>

<style lang="scss">
    button {
        background: transparent;
        border: 2px solid #333;
        color: #333;
        padding: 1rem;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 1rem;

        &:hover {
            background-color: #333;
            color: white;
        }
    }

    section {
        display: none;
        margin-top: 1rem;
        padding: 2rem;
        border: 2px solid black;
        border-radius: 6px;
        vertical-align: top;

        p {
            margin-top: 1rem;
            font-weight: bold;
            color: #922500;
        }

        &.show {
            display: block;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 0rem;

            textarea {
                padding: 1rem;
                font-size: 1.6rem;
                border: 1px solid #ccc;
                border-radius: 4px;
                transition: border-color 0.3s ease;
                resize: vertical;

                &:focus {
                    outline: none;
                    border-color: #ff3e00;
                    box-shadow: 0 0 5px rgba(255, 62, 0, 0.3);
                }
            }

            button[type="submit"] {
                background-color: #ff3e00;
                color: white;
                font-weight: bold;
                padding: 1.2rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-top: 1rem;

                &:hover {
                    background-color: #922500;
                }
            }
        }
    }
</style>
