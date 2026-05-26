<script>
    let { countryData } = $props();

    // svelte-ignore state_referenced_locally
    const flagURL = "/flags/" + countryData.Code2.toLowerCase() + ".webp";
    let result = $state(false);
    let chosenCountry = $state();
    let message = $state();

    async function handleFlagAddition() {
        chosenCountry = countryData.Code2;

        let resultRes = await fetch("http://localhost/change_user_flag.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(chosenCountry),
            credentials: "include",
        });
        result = await resultRes.json();

        if (result == true) {
            message = "Flag added to profile!";
        } else {
            message = "Couldn't change the flag, something wrong...";
        }
    }
</script>

<section>
    <button onclick={handleFlagAddition}>change flag</button>

    {#if message}
        <p>{message}</p>
    {/if}

    <h1>{countryData.Name}</h1>
    <figure>
        <img src={flagURL} alt="flagga" height="70" />
        <figcaption>flagga {countryData.Name}</figcaption>
    </figure>

    <table>
        <tbody>
            <tr>
                <th>namn (lokalt)</th>
                <td>{countryData.LocalName}</td>
            </tr>

            <tr>
                <th>landskod</th>
                <td>{countryData.Code}</td>
            </tr>

            <tr>
                <th>folkmängd</th>
                <td>{countryData.Population}</td>
            </tr>

            <tr>
                <th>yta</th>
                <td>{countryData.SurfaceArea}</td>
            </tr>
        </tbody>
    </table>
</section>

<style lang="scss">
    section {
        padding: 1rem;
        border: 1px solid black;
        border-radius: 6px;
        vertical-align: top;
        margin: 1rem;

        button {
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
            background-color: #333;
            color: white;

            &:hover {
                background-color: #ff3e00;
            }
        }

        h1 {
            font-size: 18px;
            margin-bottom: 1rem;
        }

        figure {
            margin-bottom: 1rem;

            img {
                border: 1px solid black;
            }

            figcaption {
                font-size: 1rem;
            }
        }

        table {
            border-collapse: collapse;
            font-size: 14px;

            th {
                font-weight: bold;
                text-align: left;

                &::after {
                    content: ": ";
                    white-space: pre;
                }
            }
        }
    }
</style>
