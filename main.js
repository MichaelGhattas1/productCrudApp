var productContainers = [];
var z ;
if (localStorage.getItem('ourProduct') != null) {
    productContainers = JSON.parse(localStorage.getItem('ourProduct'));
    displayProduct();
}
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
function addProduct() {
if ((validateProductName () && validateProductPrice () && validateProductCategory () && validateProductDesc ())==true)
{   
   
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
     if (document.getElementById("mainButton").innerHTML== "add product")
    {
    productContainers.push(product);
    console.log(productContainers);
    cleaarForm ();
    localStorage.setItem('ourProduct', JSON.stringify(productContainers));
   }
    if (document.getElementById("mainButton").innerHTML== "Update")
   { 
    
    productContainers = JSON.parse(localStorage.getItem('ourProduct')); 
    productContainers[z].name = productNameInput.value ;
    productContainers[z].price = productPriceInput.value ;
    productContainers[z].category = productCategoryInput.value ;
    productContainers[z].desc = productDescInput.value;
    localStorage.setItem('ourProduct', JSON.stringify(productContainers));
    cleaarForm ();
    document.getElementById("mainButton").innerHTML= "add product" ;
    }
    
    displayProduct();

}
}
function cleaarForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";

}
function displayProduct() {
    var cartona = ``;
    for (i = 0; i < productContainers.length; i++) {
        cartona += `
        <tr >
        <td class = "p-3">${i}</td>    
        <td class = "p-3">${productContainers[i].name}</td>
        <td class = "p-3">${productContainers[i].price}</td>
        <td class = "p-3">${productContainers[i].category}</td>
        <td class = "p-3">${productContainers[i].desc}</td>
        <td><button id="update" onclick =" updateProduct (${i})" class="btn btn-outline-info"> update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-warning"> delete</button></td>
        <tr>
        `
    }
    document.getElementById("tableBody").innerHTML = cartona;
}
function searchProduct(term)
{
    var cartona = ``;
    for (var i = 0; i< productContainers.length; i++) {
        if (productContainers[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartona += `
            <tr>
            <td>${i}</td>    
            <td>${productContainers[i].name}</td>
            <td>${productContainers[i].price}</td>
            <td>${productContainers[i].category}</td>
            <td>${productContainers[i].desc}</td>
            <td><button  onclick = "updateProduct (${i}) " class="btn btn-outline-info"> update</button></td>
            <td><button class="btn btn-outline-warning"> delete</button></td>
            <tr>`
        }
       
    }
    document.getElementById("tableBody").innerHTML = cartona;
   
}
function deleteProduct(index)
{
   productContainers.splice(index,1)
   localStorage.setItem("ourProduct", JSON.stringify(productContainers))
   displayProduct()
}
function updateProduct (index)
{
productNameInput.value = productContainers[index].name;
productPriceInput.value =productContainers[index].price  ;
productCategoryInput.value =productContainers[index].category;
productDescInput.value =productContainers[index].desc;
document.getElementById("mainButton").innerHTML=  "Update" ;
z=index ;
}
function validateProductName ()
{
    var regex = /^[A-Z][a-z]{3,7}$/;
    if(regex.test(productNameInput.value)==true)
    {
        document.getElementById("ProductNameAlert").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById("mainButton").setAttribute('disabled','disabled'); 
        document.getElementById("ProductNameAlert").innerHTML= "Product name must start with UpperCase";
    }
}
function validateProductPrice ()
{
    var regex = /^[1-9][0-9]{2,4}$/;
    if(regex.test(productPriceInput.value)==true)
    {
        document.getElementById( "ProductPriceAlert").innerHTML= "";
        return true ;
    } 
    else
    {
        
        document.getElementById( "ProductPriceAlert").innerHTML= "*Product price from [3-5] digit";
        document.getElementById("mainButton").setAttribute('disabled','disabled'); 
    }
    
}
function validateProductCategory ()
{
    var regex = /^[A-Z a-z]{4,20}$/;
    if(regex.test(productCategoryInput.value)==true)
    {
        document.getElementById( "ProductCategoryAlert").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById( "ProductCategoryAlert").innerHTML= "*Category must be one word at least (4 char) or more from 20 letter";
        document.getElementById("mainButton").setAttribute('disabled','disabled'); 
    }
}
function validateProductDesc ()
{
    var regex = /^[A-Z][A-Z a-z]{3,100}$/;
    if(regex.test(productDescInput.value)==true)
    {
        document.getElementById( "ProductDescAlert").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById( "ProductDescAlert").innerHTML= "*Product Describtion must be one word or more from (4-100 letter)";
        document.getElementById("mainButton").setAttribute('disabled','disabled'); 
    }
}
function ckeckBtn ()
{
    if ((validateProductName () && validateProductPrice () && validateProductCategory () &&validateProductDesc ()) == true)
    {
        document.getElementById("mainButton").removeAttribute ('disabled');
        return true ;
    }
}
