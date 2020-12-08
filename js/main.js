/** Global variables */
let productsStore;
let editWindow = " ";
let saveUpdatedDataBtn = $("#SaveDatabtn");
let productDataInputs = document.getElementsByName("productDataIn") 
let indexForEditProduct ;
let productNameInp = $("#productNameInp");
let productPriceInp = $("#productPriceInp");
let productDescInp = $("#productDescInp");
let productCatInp = $("#productCatInp");

/** Start functionaliy */
$(document).ready(function () { $(productNameInp).focus() }); 

/** update products array with data from local Storage and  Display it*/
if (localStorage.getItem("products") == null) {
    productsStore = [];
} else {
    productsStore = JSON.parse(localStorage.getItem("products"));
    displayProducts(productsStore);
}

/** functions validation for inputs  */

/** function for checking any data will be entered in name input element  */
function IsValidName(){
    var productName = $(productNameInp).val();
    var validName = /[A-Z][a-z]{3,15}([0-9]{0,5})?$/;
    if (validName.test(productName) == false ) {
        $("small:contains('Name')")
        .removeClass('text-muted alert alert-success')
        .addClass(' alert alert-danger')
        .text("Name must strat with capital letter and contains 3 to 8 small letter.");
        return false;
    } else { 
        $("small:contains('Name')")
        .removeClass('text-muted alert alert-danger')
        .addClass(' alert alert-success')
        .text("Valid Name");
        return true;
    }
}

/** function for checking any data will be entered in price input element  */
function IsValidPrice(){
    var productPrice = $(productPriceInp).val();
    var validPrice =/([1-4][0-9][0-9][0-9]([0-9])?|50000)$/
    if (validPrice.test(productPrice) == false) {
        $("small:contains('Price')")
        .removeClass('text-muted alert alert-success')
        .addClass(' alert alert-danger')
        .text("Price must be from 1000 to 50000.");
        return false;
    } else { 
        $("small:contains('Price')")
        .removeClass('text-muted alert alert-danger')
        .addClass(' alert alert-success')
        .text("Valid Price");
        return true;
    }
}

/** function for checking any data will be entered in category input element  */
function IsValidCategory(){
    var productCategory = $(productCatInp).val();
    var validCat = /[A-Z][a-z]{1,10}$/;
    if (validCat.test(productCategory) == false) {
        $("small:contains('Category')")
        .removeClass('text-muted alert alert-success')
        .addClass(' alert alert-danger')
        .text("Category must strat with capital letter and contains 3 to 10 small letter.");
        return false;
    } else { 
        $("small:contains('Category')")
        .removeClass('text-muted alert alert-danger')
        .addClass(' alert alert-success')
        .text("Valid Category");
        return true;
    }
}

/** function for checking any data will be entered in Description input element  */
function IsValidDescription(){
    var productDesc = $(productDescInp).val();
    var validDesc = /[A-z][a-z][.]{1}$/;
    if (validDesc.test(productDesc) == false) {
        $("small:contains('Description')")
        .removeClass('text-muted alert alert-success')
        .addClass(' alert alert-danger')
        .text("Description must strat with capital letter and end with (.).");
        return false;
    } else { 
        $("small:contains('Description')")
        .removeClass('text-muted alert alert-danger')
        .addClass(' alert alert-success').text("Valid Description");
        return true;
    }
}
productDataInputs.forEach(item =>{
    item.addEventListener("keyup" , ()=>{
        IsValidName();
        IsValidPrice();
        IsValidCategory();
        IsValidDescription();
    })
})


/** function for adding new product by taking product entered data and 
    save it at the global store array and local storage */
$("#addProduct").click(function addProduct() {
    if(IsValidName()==true && IsValidPrice()==true && IsValidCategory()==true &&IsValidDescription()==true){
        var SaleElements = $("input[name='sale']");
        var productSale;
        if (SaleElements[0].checked == true) {
            productSale = true;
        } else {
            productSale = false;
        }
        var product = {
            name: $(productNameInp).val(),
            price: $(productPriceInp).val(),
            desc: $(productDescInp).val(),
            category: $(productCatInp).val(),
            sale: productSale
        }
        productsStore.push(product);
        localStorage.setItem("products", JSON.stringify(productsStore))
        displayProducts(productsStore);
        clearInp();
    }else{
        window.alert("enter valid product data")
    } 
})


/** dynamic function for displaying products store or array */
function displayProducts(arrayOfProducts) {
    let products = "";
    let arrLength = arrayOfProducts.length;
    console.log("🚀 ~ file: main.js ~ line 108 ~ displayProducts ~ arrLength", arrLength)
    for (var i = 0; i < arrLength; i++) {
        if (arrayOfProducts[i].sale == true) {
            products += ` <div  id="product" class="col-md-4 col-sm-6 mb-3 ">
            <img  class="img-fluid " src="images/2.jpg" alt="">
            <h4 class="mt-3">  ${arrayOfProducts[i].name} <span  class="badge badge-primary bg-info ">  ${arrayOfProducts[i].category} </span></h4>
            <h6> ${arrayOfProducts[i].price} EGP </h6>
            <p > ${arrayOfProducts[i].desc} </p>
            <div id="edit-windowcon"></div>
            <div class="sale bg-danger">Sale</div>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger mt-1 mx-1 ml-3">
            <i class="fas fa-trash-alt"></i> Delete</button>
            <button   id="editbtn"  name="editbtn" onclick="updateProduct(${i})" class="btn btn-outline-warning mt-1 mx-1"><i class="fas fa-pen "></i> Edit</button>
            </div> `;
        } else {
            products += `<div  id="product" class="col-md-4 col-sm-6 mb-3   ">
            <img  class="img-fluid " src="images/2.jpg" alt="">
            <h4 class=" mt-3 ">  ${arrayOfProducts[i].name}  <span  class="badge badge-primary bg-info  ">  ${arrayOfProducts[i].category} </span></h4>
            <h6>   ${arrayOfProducts[i].price} EGP</h6>
            <p >  ${arrayOfProducts[i].desc} </p>
            <div id="edit-windowcon"></div>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger mt-1 mx-1 ml-3"><i class="fas fa-trash-alt"></i> Delete</button>
            <button   id="editbtn"  name="editbtn" onclick="updateProduct(${i})" class="btn btn-outline-warning mt-1 mx-1"><i class="fas fa-pen "></i> Edit</button>
            </div>`;
        }
    }
    document.getElementById("proudcts").innerHTML = products;
}

/** function clearing inputs data after adding or updating  */
function clearInp() {
    productDataInputs.forEach(input => {
        input.value = "";
    });
}

/** function deletes product or item by its index   */
function deleteProduct(index) {
    productsStore.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(productsStore))
    displayProducts(productsStore);
}

/** function searching for elements name  */
function searchProducts(word) {
    let validSearchPattern = /([a-zA-Z0-9])$/;
    if (validSearchPattern.test(word)) {
        var searchedProducts = [];
        for (i = 0; i < productsStore.length; i++) {
            if (productsStore[i].name.toLowerCase().includes(word.toLowerCase()) == true) {
              searchedProducts.push(productsStore[i])
            }
        }
        displayProducts(searchedProducts);
    } else {
        alert("enter valid product name")
    }
}

/*** functions for update operation */
/** this function enables update operation by take data of product and put it at input forms  */
function updateProduct(index) {
    indexForEditProduct = index ;
   let name = productsStore[index].name ;
   let Category = productsStore[index].category;
   let price = productsStore[index].price ;
    let description = productsStore[index].desc ;
    $(productNameInp).val(name)
    $(productPriceInp).val(price) 
    $( productDescInp).val(description) 
    $(productCatInp).val(Category) 
    $(saveUpdatedDataBtn).fadeIn(300);
}

/** this funtions takes updated data from inputs and save it at the global store array and local storage*/
$(saveUpdatedDataBtn).click(function saveProductData() {
    productsStore[indexForEditProduct].name =$(productNameInp).val();
    productsStore[indexForEditProduct].category = $(productCatInp).val();
    productsStore[indexForEditProduct].price =$(productPriceInp).val();
    productsStore[indexForEditProduct].desc = $(productDescInp).val();
   var SaleElements = $("input[name='sale']");
   if (SaleElements[0].checked == true) {
       productsStore[indexForEditProduct].sale = true;
   } else if (SaleElements[1].checked == true) {
       productsStore[indexForEditProduct].sale = false;
   }
   localStorage.setItem("products", JSON.stringify(productsStore));
   $(saveUpdatedDataBtn).fadeOut(300);
   displayProducts(productsStore);
   clearInp();
})