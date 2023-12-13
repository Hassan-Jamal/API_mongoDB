        const API_URL = "http://localhost:3030/api/products";

        async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        let productCardsHTML = '';
        products.forEach((product) => {
            productCardsHTML += `
            <div class="product" data-id="${product._id}">
            <h3>Name: ${product.title}</h3>
            <p>Price: ${product.price}</p>
            <button onclick="handleDelete(this)">Delete</button>
            <button onclick="openEditForm(); handleUpdate(this)">Edit</button>
        </div>`;
        });
        document.getElementById('products').innerHTML = productCardsHTML;

    } catch (error) {
        console.error("Error while fetching products:", error);
    }
}

function addProduct() {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    if (!title|| !price) return alert('All fields are required');

    let product = {
        title,
        price
    };
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').value = '';
            document.getElementById('price').value = '';
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function handleDelete(element) {
    let productElement = element.closest('.product');
    if (!productElement) {
        console.error('Product element not found');
        return;
    }
    let id = productElement.getAttribute('data-id');
    if (!id) {
        console.error('Product ID not found');
        return;
    }
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function handleUpdate(element) {
    let productElement = element.closest('.product');
    if (!productElement) {
        console.error('Product element not found');
        return;
    }
    let id = productElement.getAttribute('data-id');
    if (!id) {
        console.error('Product ID not found');
        return;
    }
    document.getElementById('editForm').setAttribute('data-id', id);
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();
    document.getElementById('editTitle').value = product.title;
    document.getElementById('editPrice').value = product.price;

    openEditForm();
}


function submitEditForm() {
    let id = document.getElementById('editForm').getAttribute('data-id');
    let title = document.getElementById('editTitle').value;
    let price = document.getElementById('editPrice').value;

    if (!title || !price) {
        alert('All fields are required');
        return;
    }

    let product = {
        title,
        price
    };

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => {
            closeEditForm();
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function openEditForm() {
    document.getElementById('editForm').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeEditForm() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.body.innerHTML += '<div id="overlay" class="overlay"></div>';

        document.body.innerHTML += '<div id="overlay" class="overlay"></div>';
    