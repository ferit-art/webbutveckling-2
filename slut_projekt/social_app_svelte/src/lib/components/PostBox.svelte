<script>
    let isOpen = $state(false);

    function togglePostBox() {
        isOpen = !isOpen;
    }

    let content = $state("");
    let message = $state();

    async function handlePostCreation(event) {
        event.preventDefault();

        const response = await fetch("http://localhost/create_post.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ post_txt: content }),
            credentials: "include",
        });

        const result = await response.json();

        if (result === true) {
            message = "Post created!";
        } else {
            message = "The process failed.";
        }
    }
</script>

<button onclick={togglePostBox}>add post</button>

<section class:show={isOpen}>
    <form onsubmit={handlePostCreation}>
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

            textarea {
                padding: 1rem;
                font-size: 1.6rem;
                border: 1px solid #ccc;
                border-radius: 4px;
                transition: border-color 0.3s ease;
                font-family: inehrit;
                resize: vertical;

                &:focus {
                    outline: none;
                    border-color: #ff3e00;
                    box-shadow: 0 0 4px rgba(255, 62, 0, 0.3);
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
