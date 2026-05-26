export async function load() {
    const res = await fetch('https://data.egyweb.se/api/world/getcountries.php?continent=africa');
    const countries = await res.json();
    const continent = 'africa';

    return {
        countries: countries,
        continent: continent
    };
}