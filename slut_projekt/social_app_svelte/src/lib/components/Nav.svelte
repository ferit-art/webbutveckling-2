<script>
    import { goto, invalidateAll } from "$app/navigation";

    let isOpen = $state(false);
    let message = $state("");

    function toggleMenu() {
        isOpen = !isOpen;
    }

    async function handleLogOut() {
        const response = await fetch("http://localhost/log_out.php", {
            credentials: "include", //   to save the cookie
        });
        const result = await response.json();

        if (result == true) {
            goto("/");
            invalidateAll();
        } else {
            message = "Couldn't log out, check the information.";
            alert(message);
        }
    }
</script>

<nav>
    <button type="button" onclick={toggleMenu}>
        <img src="/menu-button.png" alt="menu btn" height="25" />
    </button>

    <ul role="none" class:show={isOpen}>
        <li><a href="/">home</a></li>
        <li><a href="/profile">profile</a></li>
        <li><a href="/messages">messages</a></li>

        <span>continents:</span>
        <li><a href="/europe">europe</a></li>
        <li><a href="/asia">asia</a></li>
        <li><a href="/africa">africa</a></li>
    </ul>

    <button id="log-out" onclick={handleLogOut}>log out</button>
</nav>

<style lang="scss">
    nav {
        display: flex;
        align-items: center;
        width: 100%;
        color: #e2e3db;
        font-size: medium;
        margin-right: var(--margin-l);
        z-index: 10;

        #log-out {
            display: block;
            font-family: inherit;
            font-size: medium;
            font-weight: 600;
            background-color: #444;
            color: #e2e3db;
            cursor: pointer;
            width: 9vw;

            &:hover {
                background-color: #ff3e00;
                color: #fff;
            }
        }

        ul {
            flex-grow: 1;
            list-style-type: none;
            overflow: hidden;
            background-color: #333;
            display: flex;
            align-items: center;
            z-index: 100;

            span {
                color: #888;
                font-weight: bold;
                cursor: default;
                padding-inline: 2rem;
            }

            li {
                color: #e2e3db;

                a {
                    display: block;
                    text-align: center;
                    padding: 1rem 1.6rem;
                    text-decoration: none;
                    font-weight: 600;
                    color: inherit;

                    &.active {
                        background: #ff3e00;
                    }

                    &:hover:not(.active) {
                        background-color: #ff3e00;
                        color: #fff;
                    }
                }
            }
        }

        button {
            border: 0;
            background: transparent;
            display: none;
            padding-block: 1rem;
        }
    }

    @media (max-width: 768px) {
        nav {
            justify-content: flex-start;
            margin-right: var(--margin-s);

            button:not(#log-out) {
                display: block;
                cursor: pointer;
                width: 7vw;
            }

            #log-out {
                width: 20vw;
            }

            ul {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 5rem;
                left: var(--margin-s);
                width: 90vw;
                max-width: 150px;
                padding-bottom: 1rem;

                &.show {
                    display: flex;
                }

                li {
                    display: block;
                    width: 100%;
                }

                span {
                    padding: 1rem;
                    text-align: center;
                }
            }
        }
    }
</style>
