<script>
    let { countryData } = $props();

    // svelte-ignore state_referenced_locally
    const flagURL = "/flags/" + countryData.Code2.toLowerCase() + ".webp";
</script>

<section>
    <h1>{countryData.Name}</h1>
    <figure>
        <img src={flagURL} alt="flagga" height="70" />
        <figcaption>Flagga {countryData.Name}</figcaption>
    </figure>

    <table>
        <tbody>
            <tr>
                <th>Namn (lokalt)</th>
                <td>{countryData.LocalName}</td>
            </tr>

            <tr>
                <th>Landskod</th>
                <td>{countryData.Code}</td>
            </tr>

            <tr>
                <th>Folkmängd</th>
                <td>{countryData.Population}</td>
            </tr>

            <tr>
                <th>Yta</th>
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
