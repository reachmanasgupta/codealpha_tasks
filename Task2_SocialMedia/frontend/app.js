const API_URL = 'http://localhost:5000/api/posts';
let currentUser = null;

const checkAuth = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        window.location.href = 'login.html';
    } else {
        currentUser = JSON.parse(userInfo);
        document.getElementById('user-greeting').innerText = `Hello, ${currentUser.name}`;
    }
};

document.getElementById('logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('userInfo');
    window.location.href = 'login.html';
});

const fetchPosts = async () => {
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        const feed = document.getElementById('posts-feed');
        feed.innerHTML = '';

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <div class="post-header">${post.userName}</div>
                <div class="post-content">${post.content}</div>
            `;
            feed.appendChild(postCard);
        });
    } catch (error) {
        alert('Error loading posts');
    }
};

document.getElementById('post-btn')?.addEventListener('click', async () => {
    const content = document.getElementById('post-content').value;
    
    if (!content.trim()) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser._id,
                userName: currentUser.name,
                content: content
            })
        });

        if (response.ok) {
            document.getElementById('post-content').value = '';
            fetchPosts();
        }
    } catch (error) {
        alert('Failed to share post');
    }
});

window.onload = () => {
    checkAuth();
    fetchPosts();
};