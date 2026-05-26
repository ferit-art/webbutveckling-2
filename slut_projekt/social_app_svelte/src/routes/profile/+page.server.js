export async function load({ fetch }) {

    const userRes = await fetch("http://localhost/check_session.php", {
        credentials: 'include'
    });

    const user = await userRes.json();

    const userbaseRes = await fetch("http://localhost/get_userbase.php");
    const userbase = await userbaseRes.json();

    let cleanUserbase = [];
    if (user.isLoggedIn) {
        cleanUserbase = userbase.filter(person => person.uid !== user.uid);
    }

    return {
        user: user,
        users: cleanUserbase
    };
}