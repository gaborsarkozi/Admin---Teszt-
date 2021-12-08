/* ---------------- ACTION WITH PRODUCTS ----------------- */
/* ------ Product - Create - Read - Update - Delete ------ */
/* ----------------------- CRUD -------------------------- */

(function () {

    /* ----------------  GET DOM ELEMENTS  ---------------- */

    let form = document.querySelector('#create-product');
    let submitForm = form.querySelector('button');
    let dBtns = document.querySelectorAll('.btn-delete');


    // Default products 
    var state = {
        products: [
            {
                id: generateId(),
                name: 'Teszt termék 1',
                price: 2500,
                isInStock: true,
                isInStockNumber: 54,
                productImage: 'https://bexi.hu/static/arukepek/1200.jpg',
            },
            {
                id: generateId(),
                name: 'Teszt termék 2',
                price: 3500,
                isInStock: false,
                isInStockNumber: 0,
                productImage: 'https://bexi.hu/static/arukepek/1200.jpg'
            },
            {
                id: generateId(),
                name: 'Teszt termék 3',
                price: 5000,
                isInStock: true,
                isInStockNumber: 11,
                productImage: 'https://bexi.hu/static/arukepek/1200.jpg'
            },
        ],
        editedId: '',
    }


    // Generate ID for products
    function generateId() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    };


    // Create
    submitForm.addEventListener('click', function (e) {
        e.preventDefault();

        var newProductName, newProductPrice, newProductIsStored, newObject;

        // Get DOM elements value 
        newProductName = form.elements[0].value;
        newProductPrice = Number(form.elements[1].value);
        newProductIsStored = form.elements[2].checked;

        // Constructor for products objects
        newObject = {
            id: generateId(),
            name: newProductName,
            price: newProductPrice,
            isInStock: newProductIsStored
        }

        // Push product to object array 
        state.products.push(newObject)

        // Call render
        renderProducts()
    });


    // Edit product
    function renderEditProduct() {

        if (state.editedId === '') {
            document.querySelector('#edit-product').innerHTML = '';
            return;
        }

        var foundProduct;

        for (const product of state.products) {
            if (product.id === state.editedId) {
                foundProduct = product;
                break;
            }
        }


        var editFormHTML = `
<h3>Termék szerkesztése</h3>
<div class="col-6 col-md-6 col-lg-4 mb-3">
<form id="create-product" class="p-5">
<div class="card h-100 border-0">
  <div class="card-img-top">
    <img src="https://bexi.hu/static/arukepek/1200.jpg" class="img-fluid mx-auto d-block"
      alt="Card image cap">
  </div>
  <div class="card-body text-center">
    <label class="w-100">
      Név:
      <input class="form-control" type="text" name="name" value=${foundProduct.name}>
    </label>
    <label class="w-100">
      Ár:
      <input class="form-control" type="number" name="price" value=${foundProduct.price}>
    </label>
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="isInStock" ${foundProduct.isInStock ? 'checked' : ''}>
    <label class="form-check-label" for="flexCheckDefault">
      Default checkbox
    </label>
    <button class="btn btn-primary edit-btn" type="submit">Küldés</button>
  </div>
</div>
</div>
`;

        let editedform = document.querySelector('#edit-product');
        editedform.innerHTML = editFormHTML;

        document.querySelector('.edit-btn').addEventListener('click', function (e) {
            e.preventDefault();

            var editForm = editedform.querySelector('form').elements;


            var editedProductName = editForm[0].value;
            var editedProductPrice = Number(editForm[1].value);
            var editedProductIsStored = editForm[2].checked;


            var foundIndex;

            for (var index = 0; index < state.products.length; index++) {

                if (state.products[index].id === state.editedId) {
                    foundIndex = index;
                    break;
                }
            }

            // State change 
            state.products[foundIndex] = {
                id: state.editedId,
                name: editedProductName,
                price: editedProductPrice,
                isInStock: editedProductIsStored,
            };

            state.editedId = '';

            // Render 
            renderProducts();
            renderEditProduct();
        })
    }


    // Read - Template literal 
    function renderProducts() {

        let productList = document.querySelector('#product-list-component');
        let productCard = '';

        for (const product of state.products) {
            productCard += `
            <div class="col-6 col-md-6 col-lg-4 mb-3">
            <div class="card shadow h-100 border-0">
            <div class="card-img-top position-relative">
            <span class="position-absolute top-0 start-100 translate-middle p-2 ${product.isInStock ? 'bg-success' : 'bg-danger'} border border-light rounded-circle">
                <span class="visually-hidden"></span>
            </span>
                <img src="https://bexi.hu/static/arukepek/1200.jpg" class="img-fluid mx-auto d-block"
                    alt="Card image cap">
                </div>
                <div class="card-body">
                <h4 class="card-title">
                    <a href="product.html" class="font-weight-bold text-dark small">${product.name}</a>
                </h4>
                <h5 class="card-price small">
                    Ár: ${product.price} Ft
                </h5>
                <h5 class="card-stock small">
                    Készleten: ${product.isInStock ? 'Készleten (' + product.isInStockNumber + ' db) ' : 'Nincs készleten'}
                </h5>
                <div id="actionButtons" class="page-wrapper">
                    <div class="input-group">
                    <input class="form-control input-product-number" type="number" placeholder="Default input" aria-label="default input example">
                    <button id="addtocart" type="button" class="btn btn-primary btn-add-cart">Add to Cart<span class="cart-item"><span class="span-number">2</span></span></button>
                    </div>
                </div>
                </div>
            </div>
            </div>
         `
        }

        productList.innerHTML = productCard;

        // Delete 
        var deleteBtns = document.querySelectorAll('.btn-delete');

        for (var i = 0; i < deleteBtns.length; i++) {

            deleteBtns[i].addEventListener('click', function () {
                var id = this.getAttribute('data-productid');

                var foundIndex;

                for (var index = 0; index < state.products.length; index++) {

                    if (state.products[index].id === id) {
                        foundIndex = index;
                        break;
                    }
                }

                // State change
                state.products.splice(foundIndex, 1);

                // Render products 
                renderProducts();
            });
        }


        // Edit
        var editBtns = document.querySelectorAll('.btn-edit');

        for (var editBtn of editBtns) {
            editBtn.addEventListener('click', function () {
                var id = this.getAttribute('data-productid');
                state.editedId = id;

                renderEditProduct();

            })
        }

    };

    // Read - Template literal 
    function renderEditableProducts() {

        let productList = document.querySelector('#product-list-component');
        let productCard = '';

        for (const product of state.products) {
            productCard += `
            <div class="col-6 col-md-6 col-lg-4 mb-3">
            <div class="card shadow h-100 border-0">
            <div class="card-img-top position-relative">
            <span class="position-absolute top-0 start-100 translate-middle p-2 ${product.isInStock ? 'bg-success' : 'bg-danger'} border border-light rounded-circle">
                <span class="visually-hidden"></span>
            </span>
                <img src="https://bexi.hu/static/arukepek/1200.jpg" class="img-fluid mx-auto d-block"
                    alt="Card image cap">
                </div>
                <div class="card-body">
                <h4 class="card-title">
                    <a href="product.html" class="font-weight-bold text-dark small">${product.name}</a>
                </h4>
                <h5 class="card-price small">
                    Ár: ${product.price} Ft
                </h5>
                <h5 class="card-stock small">
                    Készleten: ${product.isInStock ? 'Készleten (' + product.isInStockNumber + ' db) ' : 'Nincs készleten'}
                </h5>
                <div id="actionButtons">
                    <button data-productid='${product.id}' type='button' class='btn btn-warning mr-2 btn-edit'>Szerkesztés</button>
                    <button data-productid='${product.id}' type='button' class='btn btn-delete ${product.isInStock ? 'btn-danger' : 'btn-primary'}'>Tétel törlése</button>
                </div>
                </div>
            </div>
            </div>
         `
        }

    };
    


    for (var i = 0; i < dBtns.length; i++) {

        dBtns[i].addEventListener('click', function () {
            console.log(this);
        })
    }

    renderProducts()

})();






/* ----------------  OTHER SCRIPTS ---------------- */

(function () {

    /* ----------------  GET DOM ELEMENTS  ---------------- */

    let addToCartButtons = document.querySelectorAll('.btn-add-cart');
    let inputProudctNumbers = document.querySelectorAll('.input-product-number');

    /* ----------------  ADD TO CART ITEMS ---------------- */

    for (const addToCartButton of addToCartButtons) {

        // Add product to cart
        addToCartButton.addEventListener('click', function () {

            var button, cart;

            // Get DOM elements 
            button = this;
            cart = document.querySelector('#cart');
    
            // Play animation by add class to button
            button.classList.add('sendtocart');
    
            // Finish animation by remove class from button
            setTimeout(function () {
                button.classList.remove('sendtocart');
                cart.classList.add('shake');
    
                setTimeout(function () {
                    cart.classList.remove('shake');
                }, 1000)
    
            }, 1000)
        })
    }

    for (const inputProudctNumber of inputProudctNumbers) {
        
        // Listen change of input 
        inputProudctNumber.addEventListener('keyup', function () {

            console.log(this.parentNode.querySelector('.cart-item'));

            console.log(window.getComputedStyle(this.parentNode.querySelector('.cart-item'), ':before')['content']);

            this.parentNode.querySelector('.span-number').innerHTML = this.value;

            // Get value 
/*             window.getComputedStyle(this.parentNode.querySelector('.cart-item'), ':before').getPropertyValue('content');

            window.getComputedStyle(this.parentNode.querySelector('.cart-item'), ':before').getPropertyValue('content').toEqual(this.value); */


        })
    }



})();