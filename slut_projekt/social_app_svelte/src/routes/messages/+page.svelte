<script>
    import Message from "$lib/components/ChatBox.svelte";

    let { data } = $props();
    
    let selectedUser = $state(null);
    let messageText = $state("");
    let conversation = $state([]);

    async function selectUser(contact) {
        selectedUser = contact;

        const res = await fetch(
            `http://localhost/get_messages.php?partner_uid=${contact.uid}`,
            {
                credentials: "include",
            },
        );

        conversation = await res.json();
    }

    async function handleSendMessage(event) {
        event.preventDefault();

        const resMessage = await fetch("http://localhost/send_message.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                receiver_uid: selectedUser.uid,
                message_txt: messageText,
            }),
            credentials: "include",
        });

        const result = await resMessage.json();

        if (result === true) {
            selectUser(selectedUser);
            messageText = "";
        }
    }
</script>

{#if data.user.isLoggedIn}
    <div class="chat-container">
        <aside class="sidebar">
            <h2>other users</h2>
            <ul>
                {#each data.contacts as contact}
                    <li>
                        <button
                            class:active={selectedUser &&
                                selectedUser.uid === contact.uid}
                            onclick={() => selectUser(contact)}
                            >{contact.username}</button
                        >
                    </li>
                {/each}
            </ul>
        </aside>

        <main class="chat-window">
            {#if selectedUser}
                <header class="chat-header">
                    <h3>
                        chat with {selectedUser.firstname}
                        {selectedUser.surname}
                    </h3>
                </header>

                <div class="messages">
                    {#each conversation as msg}
                        <ChatBox messageObj={msg} myUid={data.user.uid} />
                    {/each}
                </div>

                <form class="chat-input" onsubmit={handleSendMessage}>
                    <textarea
                        bind:value={messageText}
                        placeholder="write a message..."
                        required
                    ></textarea>
                    <button type="submit">send</button>
                </form>
            {:else}
                <div class="empty-state">
                    <h3>select a contact to start chatting</h3>
                </div>
            {/if}
        </main>
    </div>
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
    .chat-container {
        height: 75vh;
        display: flex;
        border: 2px solid #ccc;
        border-radius: 8px;
        overflow: hidden; //    scrollbar
        background-color: #fff;
    }

    .sidebar {
        width: 250px;
        background-color: #f4f4f4;
        border-right: 1px solid #ccc;
        display: flex;
        flex-direction: column;

        h2 {
            padding: 1rem;
            background-color: #f4f4f4;
            font-size: 1.2rem;
            text-align: center;
        }

        ul {
            list-style: none;
            overflow-y: auto;

            li button {
                width: 100%;
                text-align: left;
                padding: 1rem;
                border: none;
                border-bottom: 1px solid #ddd;
                background: transparent;
                cursor: pointer;
                font-size: 1.1rem;
                transition: background 0.2s;

                &:hover {
                    background-color: #eaeaea;
                }
                &.active {
                    background-color: #ff3e00;
                    color: white;
                    font-weight: bold;
                }
            }
        }
    }

    .chat-window {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: #fafafa;
    }

    .empty-state {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #888;
    }

    .chat-header {
        background-color: #fff;
        padding: 1rem;
        border-bottom: 1px solid #ccc;
        h3 {
            margin: 0;
            color: #333;
        }
    }

    .messages {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    .chat-input {
        display: flex;
        padding: 1rem;
        background-color: #fff;
        border-top: 1px solid #ccc;
        gap: 1rem;

        textarea {
            flex: 1;
            padding: 0.8rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: none;
            font-family: inherit;

            &:focus {
                outline: none;
                border-color: #ff3e00;
            }
        }

        button {
            background-color: #ff3e00;
            color: white;
            border: none;
            padding: 0 1.5rem;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                background-color: #922500;
            }
        }
    }
</style>
