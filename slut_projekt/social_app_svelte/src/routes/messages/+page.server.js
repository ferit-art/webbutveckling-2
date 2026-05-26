export async function load({ fetch }) {

    const userRes = await fetch('http://localhost/check_session.php', {
        credentials: 'include'
    });
    const user = await userRes.json();

    const userbaseRes = await fetch('http://localhost/get_userbase.php')
    const userbase = await userbaseRes.json();
    const contacts = userbase.filter(contact => contact.uid !== user.uid);

    return {
        contacts: contacts,
        user: user
    };
} 