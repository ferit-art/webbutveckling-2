<script>
    import Nav from "./Nav.svelte";
</script>

<header>
    <Nav />
</header>

<style lang="scss">
    header {
        display: flex;
        background-color: #333;
        border-bottom: 1px solid #ff3e00;
        padding: 4px 0;
        align-items: center;
        justify-content: space-between;
        z-index: 10;

        h1 {
            color: #e2e3db;
            font-size: 2.6rem;
        }

        img {
            margin-left: var(--margin-l);
            padding: 2px 0;
        }

        span {
            &.dark {
                color: #888;
            }
            
            &.spacing {
                letter-spacing: 0.6rem;
            }
        }

        @media (max-width: 768px) {
            header {
                padding: 2px 0;

                h1 {
                    font-size: 2.4rem;
                }

                img {
                    height: 40px;
                    margin-left: var(--margin-m);
                }

                span.spacing {
                    letter-spacing: 0.5rem;
                }
            }
        }

        @media (max-width: 420px) {
            header {
                h1 {
                    font-size: 2rem;
                }

                img {
                    margin-left: var(--margin-s);
                }

                span.spacing {
                    letter-spacing: 0.3rem;
                }
            }
        }
    }
</style>
