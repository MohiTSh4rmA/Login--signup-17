let isLogin = true;

const formTitle = document.getElementById('form-title');
const form = document.getElementById('auth-form');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');
const message = document.getElementById('message');

toggleLink.addEventListener('click', () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? 'Login' : 'Sign Up';
  toggleLink.textContent = isLogin ? 'Sign up' : 'Login';
  toggleText.innerHTML = isLogin
    ? `Don't have an account? <span id="toggle-link">Sign up</span>`
    : `Already have an account? <span id="toggle-link">Login</span>`;
  message.textContent = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    message.textContent = 'Please fill in all fields.';
    message.style.color = 'red';
    return;
  }

  if (isLogin) {
    const stored = JSON.parse(localStorage.getItem('users')) || [];
    const found = stored.find(u => u.username === username && u.password === password);
    if (found) {
      message.textContent = 'Login successful!';
      message.style.color = 'green';
    } else {
      message.textContent = 'Invalid credentials.';
      message.style.color = 'red';
    }
  } else {
    const stored = JSON.parse(localStorage.getItem('users')) || [];
    const exists = stored.find(u => u.username === username);
    if (exists) {
      message.textContent = 'Username already exists.';
      message.style.color = 'red';
    } else {
      stored.push({ username, password });
      localStorage.setItem('users', JSON.stringify(stored));
      message.textContent = 'Signup successful! You can now login.';
      message.style.color = 'green';
    }
  }

  form.reset();
});
