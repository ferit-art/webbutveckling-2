<script>
    let { data } = $props();

    let isEditing = $state(false);
    // svelte-ignore state_referenced_locally

    let defaultUser = data.user; /*  copy the user */
    let message = $state("");

    let profileData = $state({
        firstname: defaultUser.firstname,
        surname: defaultUser.surname,
        username: defaultUser.username,
        country_code: defaultUser.country_code,
    });

    function toggleEdit() {
        isEditing = !isEditing;
    }

    async function handleSave() {
        const res = await fetch("http://localhost/update_profile.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData),
            credentials: "include",
        });

        const result = await res.json();

        if (result == true) {
            isEditing = false;
            message = "successfully saved!";
        }
    }
</script>

{#if data.user.isLoggedIn}
    <div id="profile-container">
        <header id="profile-header">
            <div id="flag-container">
                <img
                    src="/flags/{data.user.country_code.toLowerCase()}.webp"
                    alt="flag"
                />
            </div>

            <div id="header-actions">
                {#if !isEditing}
                    <button id="edit-btn" onclick={toggleEdit}
                        >edit profile</button
                    >
                {:else}
                    <button id="save-btn" onclick={handleSave}
                        >save changes</button
                    >
                {/if}
            </div>
        </header>

        <main id="profile-details">
            <div id="info-group">
                <label for="user">user information</label>

                {#if isEditing}
                    <input
                        type="text"
                        bind:value={profileData.firstname}
                        placeholder="firstname"
                    />
                    <input
                        type="text"
                        bind:value={profileData.surname}
                        placeholder="surname"
                    />
                    <input
                        type="text"
                        bind:value={profileData.username}
                        placeholder="username"
                    />

                    <p>{profileData.country_code.toUpperCase()}</p>

                    <p>
                        <small id="hint"
                            >to change your flag, pick a country from the
                            continent navigation menu above.</small
                        >
                    </p>
                {:else}
                    <p>{profileData.firstname}</p>
                    <p>{profileData.surname}</p>
                    <p>{profileData.username}</p>
                    <p>{data.user.country_code.toUpperCase()}</p>
                {/if}
            </div>
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
    #profile-container {
        max-width: 600px;
        margin: 3rem auto;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        overflow: hidden;
    }

    #profile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
        background-color: #f9f9f9;
        border-bottom: 1px solid #eaeaea;

        #user-flag {
            width: 120px;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
            border: 2px solid #ccc;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        #header-actions {
            display: flex;
            gap: 1rem;

            button {
                padding: 0.6rem 1.2rem;
                border: none;
                border-radius: 4px;
                font-weight: bold;
                cursor: pointer;
                transition: background 0.2s;
            }

            #edit-btn {
                background-color: #333;
                color: white;

                &.hover {
                    background-color: #111;
                }
            }
        }
    }

    #profile-details {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        #info-group {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;

            label {
                font-size: 1.5rem;
                font-weight: bold;
                color: #ff3e00;
                letter-spacing: 0.5px;
            }

            p {
                margin: 0;
                color: #222;
                padding: 0.5rem 0;
            }

            input {
                font-size: 1.2rem;
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-family: inherit;

                &:focus {
                    outline: none;
                    border-color: #ff3e00;
                }
            }

            #hint {
                color: #ff3e00;
                font-style: italic;
            }
        }
    }
</style>
