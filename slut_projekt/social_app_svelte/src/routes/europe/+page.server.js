export async function load() {
    const res = await fetch('https://data.egyweb.se/api/world/getcountries.php?continent=europe');
    const countries = await res.json();

    return {
        countries: countries,
        continent: 'europe'
    };
}