export async function getCountries() {
    const response = await fetch("https://data.egyweb.se/api/getCountry.php?name=s")
    const countries = await response.json();
    return countries;
}