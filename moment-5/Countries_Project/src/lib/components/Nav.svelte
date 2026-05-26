<script>
    let isOpen = $state(false);

    function toggleMenu() {
        isOpen = !isOpen;
    }
</script>

<nav>
    <button type="button" onclick={toggleMenu}>
        <img src="/menu-button.png" alt="menu btn" height="25" />
    </button>

    <ul role="none" class:show={isOpen}>
        <li><a href="/">Europa</a></li>
        <li><a href="/asia">Asien</a></li>
        <li><a href="/africa">Afrika</a></li>
    </ul>
</nav>

<style lang="scss">
    nav {
        display: flex;
        align-items: center;
        color: #e2e3db;
        font-size: medium;
        justify-content: flex-end;
        margin-right: var(--margin-l);
        font-size: medium;
        z-index: 10;

        ul {
            list-style-type: none;
            overflow: hidden;
            background-color: #333;
            display: flex;
            z-index: 100;

            li {
                background-color: #333;
                color: #e2e3db;

                a {
                    display: block;
                    text-align: center;
                    padding: 1rem 1.6rem;
                    text-decoration: none;
                    font-weight: 600;
                    margin: 0;
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
            margin-right: var(--margin-s);

            button {
                display: block;
                cursor: pointer;
            }

            ul {
                display: none;
                top: 5rem;
                right: 0.5rem;
                width: 50%;

                &.show {
                    display: contents;
                }

                li {
                    display: block;
                    
                }
            }
        }
    }

    @media (max-width: 420px) {
        nav {
            ul {
                width: 60%;
            }
        }
    }
</style>
