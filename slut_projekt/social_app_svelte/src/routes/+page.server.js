export async function load({ fetch }) {

    const userRes = await fetch('http://localhost/check_session.php', {
        credentials: 'include'
    });
    const user = await userRes.json();

    const postRes = await fetch('http://localhost/get_all_posts.php');
    const posts = await postRes.json();

    return {
        user: user,
        posts: posts
    };
}