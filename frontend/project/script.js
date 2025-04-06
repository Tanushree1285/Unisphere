// API Configuration
const API_URL = 'http://localhost:5000';

// State Management
let currentUser = null;

// Auth Functions
async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentUser = {
                username,
                role: data.role
            };
            showDashboard();
            updateProfile();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error connecting to server');
    }
}

async function register(username, password, role) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            toggleForms('login');
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error connecting to server');
    }
}

// UI Functions
function toggleForms(form) {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById(`${form}Form`).classList.add('active');
}

function showDashboard() {
    document.getElementById('authForms').style.display = 'none';
    document.getElementById('dashboard').classList.remove('hidden');
    loadDashboardData();
}

function updateProfile() {
    document.getElementById('profileUsername').textContent = currentUser.username;
    document.getElementById('profileRole').textContent = currentUser.role;
}

function logout() {
    currentUser = null;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('authForms').style.display = 'flex';
    toggleForms('login');
}

// Navigation
document.querySelectorAll('.nav-links li').forEach(link => {
    link.addEventListener('click', function() {
        if (this.id === 'logoutBtn') {
            logout();
            return;
        }
        
        // Update active page
        document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding page
        const pageId = this.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    });
});

// Form Submissions
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    login(username, password);
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('role').value;
    register(username, password, role);
});

// Todo Functions
function addTodo() {
    const input = document.getElementById('newTask');
    const task = input.value.trim();
    
    if (task) {
        const todoList = document.querySelector('.todo-list');
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <input type="checkbox">
            <span style="margin-left: 1rem;">${task}</span>
            <button onclick="this.parentElement.remove()" 
                    style="margin-left: auto; color: #ef4444; background: none; border: none; cursor: pointer;">
                Delete
            </button>
        `;
        todoList.appendChild(todoItem);
        input.value = '';
    }
}

// Initial Setup
document.addEventListener('DOMContentLoaded', function() {
    toggleForms('login');
});