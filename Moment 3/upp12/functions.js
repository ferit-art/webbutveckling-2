export async function getScores() {
    const response = await fetch("https://data.egyweb.se/api/shl/")
    const teams = await response.json();
    return teams;
}