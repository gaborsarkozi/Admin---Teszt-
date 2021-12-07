'use strict'

/* 
Product 

Create
Read
Update
Delete

CRUD
*/


// Products 

var state = {
    products: [
        {
            id: generateId(),
            name: 'Teszt termék 1',
            price: 2500,
            isInStock: true,
        },
        {
            id: generateId(),
            name: 'Teszt termék 2',
            price: 3500,
            isInStock: false,
        },
        {
            id: generateId(),
            name: 'Teszt termék 3',
            price: 5000,
            isInStock: true,
        },
    ], 
    editedId: '',
}

// Create

let form = document.querySelector('#create-product');
let submitForm = form.querySelector('button');

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

    if(state.editedId === '') {
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
    <form id="update-product" class="p-5">
        <label class="w-100">
        Név:
        <input class="form-control" type="text" name="name" value=${foundProduct.name}>
        </label>
        <label class="w-100">
        Ár:
        <input class="form-control" type="number" name="price" value=${foundProduct.price}>
        </label>
        <label class="w-100">
        Van készleten?
        <input class="form-control" type="checkbox" name="isInStock" ${foundProduct.isInStock ? 'checked' : ''}>
        </label>
        <button class="btn btn-primary edit-btn" type="submit">Küldés</button>
    </form>
    `
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
        <div class="col-4">
          <div class="card ${product.isInStock ? '' : 'bg-danger'}">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${product.price} Ft</h6>
                  <h5 class="card-title">Termék raktáron: ${product.isInStock === true ? 'Készleten' : 'Nincs készleten'}</h5>
                  <button data-productid='${product.id}' type='button' class='btn btn-warning mr-2 btn-edit'>Szerkesztés</button>
                  <button data-productid='${product.id}' type='button' class='btn btn-delete ${product.isInStock ? 'btn-danger' : 'btn-primary'}'>Tétel törlése</button>
              </div>
          </div>
      </div>
     `;
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


var dBtns = document.querySelectorAll('.btn-delete');

for (var i = 0; i < dBtns.length; i++) {

    dBtns[i].addEventListener('click', function () {
        console.log(this);
    })
}


// Generate ID

function generateId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}



renderProducts()