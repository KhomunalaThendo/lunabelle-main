const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const product = products.find(p => p.id == productId);

    document.querySelector('.product-name').textContent = product.title;
    document.querySelector('.product-price').textContent = `R${product.price}`;
    document.querySelector('.product-description').textContent = product.description;

    //MAIN IMAGE
    const mainImage = document.querySelector('.main-image');
    mainImage.src = product.images[0];

    //THUMBANAIL IMAGES

    const thumbnailContainer = document.querySelector('.thumbnail-container');

    product.images.forEach(img => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.classList.add('thumbnail');
        thumb.onclick = () => {
            mainImage.src = img;
        };
        thumbnailContainer.appendChild(thumb);
    });

    // COLORS
const colorsContainer = document.querySelector('.colors');

product.colors.forEach(color => {
    const btn = document.createElement('button');
    btn.style.background = color;
    btn.classList.add('color-btn');

    btn.onclick = () => {
        document.querySelectorAll('.color-btn')
        .forEach(b => b.classList.remove('active'));

        btn.classList.add('active');
    };

    colorsContainer.appendChild(btn);
});

    //SIZES
    const sizesContainer = document.querySelector('.sizes');

    product.sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.textContent = size;

        btn.onclick = () => {
            document.querySelectorAll('.sizes button')
            .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        };

        sizesContainer.appendChild(btn)

    });


    //ADD TO CARt
    document.querySelector('.add-to-cart').onclick = () => {
        const selectedSize = document.querySelector('.sizes .acive');

        if (!selectedSize){
            alert('Please select a size');
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize.textContent
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Added to cart');


    }
    //RELATED PRODUCTS

    const relatedContainer = document.querySelector('.related-products');
    const related = products.filter(p => p.category ===product.category && p.id != product.id);

    related.forEach(item => {
        const html = `
        <a href="product.html?id=${item.id}" class="product-card">
        <img src="${item.images[0]}">
        <h3>${item.name}</h3>
        <p>R${item.price}</p>
        </a>
        `
        relatedContainer.innerHTML += html;
    })