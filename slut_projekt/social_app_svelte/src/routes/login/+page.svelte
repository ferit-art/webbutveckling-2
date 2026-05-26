<script>
    import { goto } from "$app/navigation";

    let formData = $state({
        username: "",
        password: "",
    });

    let message = $state();

    async function handleLogin(event) {
        event.preventDefault();

        const response = await fetch("http://localhost/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include" //   to save the cookie
        });

        const result = await response.json();

        if (result.isLoggedIn === true) {
            goto("/");
        } else {
            message = "Couldn't login, check the information.";
        }
    }
</script>

<section>
    <h2>Login to existing account</h2>

    <form onsubmit={handleLogin}>
        <input bind:value={formData.username} placeholder="username" required />
        <br />
        <input bind:value={formData.password} placeholder="password" required />
        <br />

        <button type="submit">sign in</button>
    </form>

    {#if message}
        <p>{message}</p>
    {/if}

    <button onclick={() => goto("/register")}>sign up</button>
</section>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        margin: 4rem auto;
        padding: 2rem;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #333;
            border-bottom: none;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            input {
                padding: 1rem;
                font-size: 1.6rem;
                border: 1px solid #ccc;
                border-radius: 4px;
                transition: border-color 0.3s ease;

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

        p {
            text-align: center;
            margin-top: 1.5rem;
            font-weight: bold;
            color: #333;
        }

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
    }
</style>
