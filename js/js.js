$(document).ready(function () { $('#productNameInp').focus() }); 
var productContainer;
var editWindow = " ";
if (localStorage.getItem("products") == null) {
    productContainer = [];
} else {
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}
function nameCheck(){
    var productName = $("#productNameInp").val();
    var validName = /[A-Z][a-z]{3,15}([0-9]{0,5})?$/;
    if (validName.test(productName) == false ) {
        $("small:contains('Name')").removeClass('text-muted alert alert-success').addClass(' alert alert-danger').text("Name must strat with capital letter and contains 3 to 8 small letter.");
        return false;
    } else { 
        $("small:contains('Name')").removeClass('text-muted alert alert-danger').addClass(' alert alert-success').text("Valid Name");
        return true;
    }
}
function priceCheck(){
    var productPrice = $("#productPriceInp").val();
    var validPrice =/([1-4][0-9][0-9][0-9]([0-9])?|50000)$/
    if (validPrice.test(productPrice) == false) {
        $("small:contains('Price')").removeClass('text-muted alert alert-success').addClass(' alert alert-danger').text("Price must be from 1000 to 50000.");
        return false;
    } else { 
        $("small:contains('Price')").removeClass('text-muted alert alert-danger').addClass(' alert alert-success').text("Valid Price");
        return true;
    }
}
function categoryCheck(){
    var productCategory = $("#productCatInp").val();
    var validCat = /[A-Z][a-z]{3,10}$/;
    if (validCat.test(productCategory) == false) {
        $("small:contains('Category')").removeClass('text-muted alert alert-success').addClass(' alert alert-danger').text("Category must strat with capital letter and contains 3 to 10 small letter.");
        return false;
    } else { 
        $("small:contains('Category')").removeClass('text-muted alert alert-danger').addClass(' alert alert-success').text("Valid Category");
        return true;
    }
}
function descriptionCheck(){
    var productDesc = $("#productDescInp").val();
    var validDesc = /[A-z][a-z][.]{1}$/;
    if (validDesc.test(productDesc) == false) {
        $("small:contains('Description')").removeClass('text-muted alert alert-success').addClass(' alert alert-danger').text("Description must strat with capital letter and end with (.).");
        return false;
    } else { 
        $("small:contains('Description')").removeClass('text-muted alert alert-danger').addClass(' alert alert-success').text("Valid Description");
        return true;
    }
}
function addProductBtnEnable(){
    if(nameCheck()==true && priceCheck()==true && categoryCheck()==true &&descriptionCheck()==true){
        $("#addProduct").prop("disabled",false)
    }
};
$("#productNameInp").keyup(function (){ 
    nameCheck();
    addProductBtnEnable();
});
$("#productPriceInp").keyup(function (){ 
    priceCheck();
    addProductBtnEnable();
});
$("#productCatInp").keyup(function (){ 
    categoryCheck();
    addProductBtnEnable();
});
$("#productDescInp").keyup(function (){ 
    descriptionCheck();
    addProductBtnEnable();
});
$("#addProduct").click(function addProduct() {
    var productName = $("#productNameInp").val();
    var productPrice = $("#productPriceInp").val();
    var productDesc = $("#productDescInp").val();
    var productCategory = $("#productCatInp").val();
    var SaleElements = $("input[name='sale']");
    var productSale;
    if (SaleElements[0].checked == true) {
        productSale = true;
    } else {
        productSale = false;
    }
    var product = {
        name: productName,
        price: productPrice,
        desc: productDesc,
        cat: productCategory,
        sale: productSale
    }
    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer))
    displayProducts();
    clearInp();
    $(this).prop("disabled",true)
})
function displayProducts() {
    var temp = "";
    for (i = 0; i < productContainer.length; i++) {
        if (productContainer[i].sale == true) {
            temp += ` <div  id="product" class="col-md-4 col-sm-6 mb-3 ">
            <img  class="img-fluid " src="images/2.jpg" alt="">
            <h4 class="mt-3"> `+ productContainer[i].name + ` <span  class="badge badge-primary bg-info ">  ` + productContainer[i].cat + ` </span></h4>
            <h6>  `+ productContainer[i].price + ` EGP </h6>
            <p >  `+ productContainer[i].desc + `</p>
            <div id="edit-windowcon"></div>
            <div class="sale bg-danger">Sale</div>
            <button onclick="deleteProduct(`+ i + ` )" class="btn btn-outline-danger mt-1 mx-1 ">Delete</button>
            <button   id="editbtn"  name="editbtn" onclick="updateProduct( this)" class="btn btn-outline-warning mt-1 mx-1">Edit</button>
            <button id="confirmbtn"  onclick="confirm(`+ i + ` , this)" class="conbtn btn btn-outline-primary mt-1 mx-1 ">Confirm</button>
            </div> `;
        } else {
            temp += `<div  id="product" class="col-md-4 col-sm-6 mb-3   ">
            <img  class="img-fluid " src="images/2.jpg" alt="">
            <h4 class=" mt-3 "> `+ productContainer[i].name + ` <span  class="badge badge-primary bg-info  ">  ` + productContainer[i].cat + ` </span></h4>
            <h6>  `+ productContainer[i].price + ` EGP</h6>
            <p >  `+ productContainer[i].desc + `</p>
            <div id="edit-windowcon"></div>
            <button onclick="deleteProduct(`+ i + ` )" class="btn btn-outline-danger mt-1 mx-1 ">Delete</button>
            <button   id="editbtn"  name="editbtn" onclick="updateProduct( this)" class="btn btn-outline-warning mt-1 mx-1">Edit</button>
            <button id="confirmbtn"  onclick="confirm(`+ i + `  , this)" class="conbtn btn btn-outline-primary mt-1 mx-1 ">Confirm</button>
            </div>`;
        }
    }
    document.getElementById("proudcts").innerHTML = temp;

}
function clearInp() {
    var inputs = document.getElementsByClassName("form-control");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
function deleteProduct(index) {
    productContainer.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(productContainer))
    displayProducts();
}
function searchProducts(word) {
    var temp = ``;
    for (i = 0; i < productContainer.length; i++) {

        if (productContainer[i].name.toLowerCase().includes(word.toLowerCase()) == true) {
            if (productContainer[i].sale == true) {
                temp += ` <div  id="product" class="col-md-4 col-sm-6 mb-3  ">
            <img  class="img-fluid " src="images/2.jpg" alt="">
            <h4 class="pt-3"> `+ productContainer[i].name + ` <span  class="badge badge-primary bg-info ">  ` + productContainer[i].cat + ` </span></h4>
            <h6>  `+ productContainer[i].price + `LE </h6>
            <p>  `+ productContainer[i].desc + `</p>
            <div id="edit-windowcon"></div>
            <div class="sale bg-danger">Sale</div>
            <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger mt-1 mx-1 ">Delete</button>
            <button   id="editbtn"  name="editbtn" onclick="updateProduct( this)" class="btn btn-outline-warning mt-1 mx-1">Edit</button>
            <button id="confirmbtn"  onclick="confirm(`+ i + ` , this)" class="conbtn btn btn-outline-primary mt-1 mx-1 ">Confirm</button>
            </div> `;
            } else {
                temp += `<div  id="product" class="col-md-4 col-sm-6 mb-3 ">
                <img  class="img-fluid " src="images/2.jpg" alt="">
                <h4 class="pt-3"> `+ productContainer[i].name + ` <span  class="badge badge-primary bg-info ">  ` + productContainer[i].cat + ` </span></h4>
                <h6>  `+ productContainer[i].price + `LE </h6>
                <p>  `+ productContainer[i].desc + `</p>
                <div id="edit-windowcon"></div>
                <button onclick="deleteProduct(`+ i +`)" class="btn btn-outline-danger mt-1 mx-1 ">Delete</button>
                <button   id="editbtn"  name="editbtn" onclick="updateProduct(this)" class="btn btn-outline-warning mt-1 mx-1">Edit</button>
                <button id="confirmbtn"  onclick="confirm(`+ i + ` , this)" class="conbtn btn btn-outline-primary mt-1 mx-1 ">Confirm</button>
                </div>`;
            }

        }

    }
    document.getElementById("proudcts").innerHTML = temp;
}
function updateProduct(thisbtn) {
    var editWindowContainer = thisbtn.parentElement.querySelector("#edit-windowcon");
    editWindow = ` <div class="edit-window shadow-lg  bg-white rounded">
    <input id="EdInp" placeholder="Name" type="text " class="form-control w-100 h-25 editNameInput ">
    <input id="EdInp" placeholder="category" type="text "
        class="form-control h-25 float-right my-1 mt-1 catEditInput">
    <input id="EdInp" placeholder="price" type="number" class="form-control w-100 h-25 my-1 priceEditInput">
    <div class="inp-container overflow-auto">
            <div class="input-group sale-Edinp my-2 mr-2 float-left">
                <div class="input-group-prepend">
                    <div class="input-group-text ">
                        <input type="radio" name="edsale" value="True">
                    </div>
                </div>
                <label class="sale-label"> Sale </label>
            </div>
            <div class="input-group sale-Edinp my-2">
                <div class="input-group-prepend">
                    <div class="input-group-text ">
                        <input type="radio" name="edsale" value="false">
                    </div>
                </div>
                <label class="sale-label"> NoSale </label>
            </div>
    </div>
    </div> `;
    $(editWindow).appendTo(editWindowContainer);
    $(".edit-window").fadeIn(300);
    $(thisbtn.nextElementSibling).fadeIn(300);

}
function confirm(index, thisbtn) {
    var editInputs = document.querySelectorAll("#EdInp");
    console.log(editInputs);
    var SaleElements = document.getElementsByName("edsale");
    var productSale;
    if (editInputs[0].value != "") {
        productContainer[index].name = editInputs[0].value;
    }
    if (editInputs[1].value != "") {
        productContainer[index].cat = editInputs[1].value;
    }
    if (editInputs[2].value != "") {
        productContainer[index].price = editInputs[2].value;
    }
    if (SaleElements[0].checked == true) {
        productContainer[index].sale = true;
    } else if (SaleElements[1].checked == true) {
        productContainer[index].sale = false;
    }

    localStorage.setItem("products", JSON.stringify(productContainer));
    var editWindowContainer = $(thisbtn).parent().find("#edit-windowcon");
    $(editWindowContainer).empty();
    $(".edit-window").fadeOut(300);
    $(thisbtn).fadeOut(300);
    displayProducts();
}
