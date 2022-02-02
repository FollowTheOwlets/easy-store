let prodMap = new Map;

for (let product of productjson) {
    prodMap.set(product.id, product)
}
let link = document.createElement('link');
link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
link.type = "text/css"
link.rel = "stylesheet"

let link2 = document.createElement('link');
link2.href = "easy-store/css/easy-store.css"
link2.type = "text/css"
link2.rel = "stylesheet"

document.getElementsByTagName("head")[0].appendChild(link)
document.getElementsByTagName("head")[0].appendChild(link2)
document.getElementById("easy-store").innerHTML = `<div>

<div class="btn-group" style="position: fixed;right: 30px;top: 10px;z-index:100 ;">
    <div class="shop__cart">
        <button id="shap_cart" class=" shap__cart__btn btn dropdown-toggle btn-large" data-toggle="dropdown">
        <span>Shopping cart :</span>
        <span id="btn__sum">0</span>
        <span > product</span>
        <span class="caret"> </span>
    </button>
        <ul class="shop__cart dropdown-menu" id="cart">
            <!-- dropdown menu links -->
            <li id="dropdown-menu-price">
                <span></span>
                <p id="dropdown-menu-price-sum">Price: 0$</p>
            </li>
        </ul>
    </div>

</div>

<div class="body__header">
    <div class="view" style="flex:1;display:flex;flex-wrap: nowrap;align-items: center;">
        <strong>View: </strong>
        <div class="view__btn-group btn">
            <a id="list" class="btn btn__list btn-default btn-sm" onclick="changeView(1)">
                <span class="glyphicon glyphicon-th-list"></span>List</a>
            <a id="grid" class="btn btn__grid btn-default btn-sm" onclick="changeView(0)">
                <span class="glyphicon glyphicon-th"></span>Grid</a>
        </div>
    </div>
    <div style="display:flex;align-items: center;flex:6;justify-content: space-around;">
        <div id="upMenu">
            <span class="numList">1</span>
        </div>
    </div>

    <div style="flex:1;padding: 1px 10px;min-width: 200px;">

    </div>

</div>

<div class="body__sort">
    <strong style="padding:4px 10px 4px 30px;cursor:pointer;" onclick="">Sort by:</strong>
    <div>
        <span type="button" class="btn btn-default btn-xs" style="padding:4px 5px;cursor:pointer;" onclick="sort(this)" id="descending">Price<span class = " glyphicon glyphicon-arrow-down" style="padding-left:10px ;"></span></span>
        <span type="button" class="btn btn-default btn-xs " style="padding:4px 5px;cursor:pointer;" onclick="sort(this)" id="ascending">Price<span class = " glyphicon glyphicon-arrow-up" style="padding-left:10px ;"> </span> </span>
        <span type="button" class="btn btn-default btn-xs" style="padding:4px 5px;cursor:pointer;" onclick="sort(this)" id="a_to_z">A to Z</span>
        <span type="button" class="btn btn-default btn-xs" style="padding:4px 5px;cursor:pointer;" onclick="sort(this)" id="z_to_a">Z to A</span>
    </div>
</div>

<div class="body-body " id="body">
    <div id="load" style="display: none;">
        <div class="loader loader-5"></div>
    </div>
</div>
<div id="footer" style="display:flex;align-items: center;flex:3;justify-content: space-around; padding-bottom: 10px;">
    <div style="display:flex;align-items: center; ">
        <div id="downMenu">
            <span class="numList">1</span>
        </div>
    </div>
</div>
</div>
<div id="blur" style="display: none;">
</div>
<div id="close" style="display: none;">
<a id="close_btn" class="btn__close btn-default" onclick="closeFeedBack(this)">
    <span class="glyphicon glyphicon-remove"></span></a>
</div>`


const miniText = (text, num) => {
    let newText = "";
    for (let i = 0; i < num; i++) newText += text[i];

    return newText + "...";
}

const price = () => {
    let li = document.getElementsByClassName("cart__li__count")
    let sum = 0;
    let count = 0;

    for (let el of li) {
        let id = el.id.split('_in_cart_sum')[0];
        if (el.value < 0) el.value = 0;
        if (el.value == 0) {
            var parent = document.getElementById("cart");
            var child = document.getElementById(id + "li_in_cart");
            parent.removeChild(child);
        }
    }

    for (let el of li) {
        let id = el.id.split('_in_cart_sum')[0];
        sum += el.value * prodMap.get(id).price;
        count += el.value * 1;
        document.getElementById(id + "_in_cart_price").textContent = el.value * prodMap.get(id).price + "$";
    }

    document.getElementById("btn__sum").textContent = count

    var parent = document.getElementById("cart");
    var child = document.getElementById("dropdown-menu-price");
    parent.removeChild(child);



    let block = document.createElement('li');
    block.id = "dropdown-menu-price";
    block.innerHTML = `<span></span><p id="dropdown-menu-price-sum">Price: ${sum}$</p>`
    document.getElementById("cart").appendChild(block);
}

const priceChange = (el) => {
    let id = el.id.split('_svg')[0];

    if (document.getElementById(id + "_in_cart_sum").value == 0 && el.id.split('_svg')[1] == "dash") return 0;

    document.getElementById(id + "_in_cart_sum").value = (el.id.split('_svg')[1] == "dash") ? document.getElementById(id + "_in_cart_sum").value * 1 - 1 : document.getElementById(id + "_in_cart_sum").value * 1 + 1;
    document.getElementById(id + "_in_cart_price").textContent = (document.getElementById(id + "_in_cart_sum").value * prodMap.get(id).price) + "$";
    price()
}

const toCart = (el) => {

    let svgplus = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"></path>
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
  </svg>`

    let svgdash = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
    <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"></path>
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
  </svg>`

    let id = el.id.split('_btn')[0];
    try {
        let block = document.getElementById(id + "_in_cart");
        let sum = document.getElementById(id + "_in_cart_sum").value * 1 + 1;
        let price = sum * (prodMap.get(id)).price;
        block.innerHTML = ` <span class="cart__li__name">
                                ${(prodMap.get(id)).name} 
                            </span> 
                            
                            <a class="cart__li__svg dash" id = "${id}_svgdash" onclick="priceChange(this)">
                                ${svgdash}
                            </a>

                            <a class="cart__li__svg plus" id = "${id}_svgplus" onclick="priceChange(this)">
                                ${svgplus}
                            </a>

                            <input class="cart__li__count" id = "${id}_in_cart_sum" onchange="price()" type="number" min="0">
                            </input>

                            <span class="cart__li__price" id = "${id}_in_cart_price" >
                                ${(price)}$
                            </span>`


        document.getElementById(id + "_in_cart_sum").value = sum;
    } catch (error) {
        let block = document.createElement('li');
        block.id = id + "li_in_cart"
        block.innerHTML = `<p class="cart__li" id="${id}_in_cart">

                                <span class="cart__li__name">
                                    ${(prodMap.get(id)).name} 
                                </span> 

                                <a class="cart__li__svg dash " id = "${id}_svgdash" onclick="priceChange(this)">
                                    ${svgdash} 
                                </a>

                                <a class="cart__li__svg plus" id = "${id}_svgplus" onclick="priceChange(this)">
                                    ${svgplus}
                                </a>

                                <input class="cart__li__count" id = "${id}_in_cart_sum" onchange="price()" type="number" min="0"></input>

                                <span class="cart__li__price" id = "${id}_in_cart_price" >
                                    ${(prodMap.get(id)).price}$
                                </span>
                            </p>`


        document.getElementById("cart").appendChild(block);
        document.getElementById(id + "_in_cart_sum").value = 1;
    }

    let shap = document.getElementById("shap_cart").classList

    if (shap.contains("add-product-animation") || (!shap.contains("add-product-animation") && !shap.contains("add-product-animation-two"))) {
        shap.remove("add-product-animation");
        shap.add("add-product-animation-two")
    } else if (shap.contains("add-product-animation-two")) {
        shap.remove("add-product-animation-two");
        shap.add("add-product-animation")
    }



    price()
}



const onload = () => {

    document.getElementById("load").style.display = "block";
    setTimeout(function() { document.getElementById("load").style.display = "none"; }, 500);


}

const listUpDown = (oldProducts, napr, count) => {
        let max = Math.floor(oldProducts.length / count) + (Math.floor(oldProducts.length / count) * count == oldProducts.length ? 0 : 1);

        let schet = document.getElementsByClassName("numList")[0].textContent * 1;
        if (schet + napr == 0 || schet + napr > max) return 0;

        onload();

        document.getElementsByClassName("numList")[0].textContent = schet + napr;
        document.getElementsByClassName("numList")[1].textContent = schet + napr;
        let cards = document.getElementsByClassName("class__for__show")
        let bool;
        try {
            bool = document.getElementsByClassName("card")[0].classList.contains("new-card");
        } catch (error) {
            bool = false;
        }


        for (let i = cards.length - 1; i >= 0; i--) {
            document.getElementById("body").removeChild(cards[i])
        }

        if (document.getElementById("descending").style.color == "var(--malina-color)")
            var products = oldProducts.sort((a, b) => a.price - b.price);
        else if (document.getElementById("ascending").style.color == "var(--malina-color)")
            var products = oldProducts.sort((a, b) => b.price - a.price);
        else if (document.getElementById("a_to_z").style.color == "var(--malina-color)")
            var products = oldProducts.sort((a, b) => a.name.localeCompare(b.name));
        else if (document.getElementById("z_to_a").style.color == "var(--malina-color)")
            var products = oldProducts.sort((a, b) => b.name.localeCompare(a.name));
        else
            var products = oldProducts;




        for (let i = (schet + napr - 1) * count; i < (schet + napr) * count; i++) {
            let product = prodMap.get(products[i].id)

            let block = document.createElement('div');
            block.classList.add("class__for__show")
                //block.style.zIndex = count - i;

            block.innerHTML = `<div id="${product.id}" class="card ${bool? "new-card" :""}" style="display:block">

                                <img id="${product.id}_img" src="${product.imgSrc}" class="card__img card-img-top ${bool? "new-card__img" :""}" alt="${product.description}" >

                                <div id="${product.id}_body" class="card__body card-body ${bool? "new-card__body" :""}">

                                    <div id="${product.id}_body_block" class="card__body__block name-description ${bool? "new-card__body__block" :""}">

                                    <img id="${product.id}_pre-image" src="${product.imgSrc}" class="card__img card-img-top card__pre-img" alt="${product.description}" style="display:none">

                                        <h4 class="card__body__title card-title" id="${product.id}_name">${product.name}</h4>
                                         <strong id="${product.id}_show" class="btn btn__grid btn-default" onclick="showPreview(this)" ><span  class="glyphicon glyphicon-search" aria-hidden="true" ></span>Preview</strong>
                                        <div style = "display: flex;justify-content: flex-start;align-items: center;"> 
                                        <div id="${product.id}_body_block_star" style = "display: flex;justify-content: flex-start;border-radius:5px;" >
                                            <span id="${product.id}_star_1" class=" ${product.star.countFeedback == -1 ? "people-star" :""} card__body__star star__1 glyphicon ${product.star.countStar >=1 ? "glyphicon-star" : "glyphicon-star-empty"}" aria-hidden="true" onclick="starClick(this)" onmouseover = "starMouse(this)" onmouseout="starMouse(this)"></span>
                                            <span id="${product.id}_star_2" class=" ${product.star.countFeedback == -1 ? "people-star" :""} card__body__star star__2 glyphicon ${product.star.countStar >=2 ? "glyphicon-star" : "glyphicon-star-empty"}" aria-hidden="true" onclick="starClick(this)" onmouseover = "starMouse(this)" onmouseout="starMouse(this)"></span>
                                            <span id="${product.id}_star_3" class=" ${product.star.countFeedback == -1 ? "people-star" :""} card__body__star star__3 glyphicon ${product.star.countStar >=3 ? "glyphicon-star" : "glyphicon-star-empty"}" aria-hidden="true" onclick="starClick(this)" onmouseover = "starMouse(this)" onmouseout="starMouse(this)"></span>
                                            <span id="${product.id}_star_4" class=" ${product.star.countFeedback == -1 ? "people-star" :""} card__body__star star__4 glyphicon ${product.star.countStar >=4 ? "glyphicon-star" : "glyphicon-star-empty"}" aria-hidden="true" onclick="starClick(this)" onmouseover = "starMouse(this)" onmouseout="starMouse(this)"></span>
                                            <span id="${product.id}_star_5" class=" ${product.star.countFeedback == -1 ? "people-star" :""} card__body__star star__5 glyphicon ${product.star.countStar ==5 ? "glyphicon-star" : "glyphicon-star-empty"}" aria-hidden="true" onclick="starClick(this)" onmouseover = "starMouse(this)" onmouseout="starMouse(this)"></span>
                                            <span id="${product.id}_star_count" class="card__body__count" style="margin-top:4px;">${product.star.countFeedback == -1 ? "" :product.star.countFeedback}</span>
                                        </div>
                                        
                                        <div>
                                            <span type="button" class="btn btn-default btn-xs ${product.star.countFeedback == -1 ? "glyphicon-ok glyphicon" :""}" style="${product.star.countFeedback == -1 ? "pointer-events: none;margin-left: 15px;padding: 1px 1px; border-color: #fff;color: #4ac96b;" :"margin-left:15px;padding:1px 1px;cursor:pointer;"}" onclick="showFeedBack(this)" id="${product.id + "_sendFeed"}">${product.star.countFeedback == -1 ? "" :"Send"}</span>
                                        </div>
                                        </div>
                                        <div id="${product.id}_feed_wrapper" class="body__block__wrapper wrapper">
                                        </div>
                                        
                                                
                                    </div>
                                    

                                    <div class="card__body__block price-add ${bool? "new-card__body__block" :""}">
                                        <strong id="${product.id}_p" class=" card__body__price ${bool? "new-card__body__price" :""}" style="${product.status ? " " : bool?"margin-right:-107px":"margin-right:1px"}">Price: ${product.price + "$" + (product.status ? "" : ` but, out of stock`)}</strong>
                                        <a id="${product.id}_btn"  class="card__body__btn btn btn-success ${product.status ? " " : "disabled_btn_my"}"  onclick="toCart(this);">Add</a>
                                    </div>

                                </div>

                             </div>`

        document.getElementById("body").appendChild(block);
        if(bool)document.getElementById("body").style.flexDirection = "column";
    }

        let block = document.getElementById('upMenu');
        let block2 = document.getElementById('downMenu');

        block.innerHTML = ` <button onclick = "listUpDown(productjson,-1,15)" type = "button" class = "btn btn-primary" > 
                            <<
                        </button> `;
        let block__span = "";

        if (max > 4) {
            if ((schet + napr) != 1 && (schet + napr) != 2 && (schet + napr) != max - 1 && (schet + napr) != max) {

                block__span = `     <span  style="padding:5px 6px;cursor:pointer;" onclick="listUpDown(productjson,${-(schet + napr -1) },15)"> 1</span>
                                <span  style="padding:4px 5px;cursor:pointer;" onclick="listUpDown(productjson,${-(schet + napr -2) },15)"> 2</span>
                                <span  style="padding:4px 5px;" > ... </span>
                                <span class="numList" style="padding:4px 5px;color:var(--malina-color);font-weight: bold;cursor:pointer;" onclick="listUpDown(productjson,0,15)"> ${schet + napr }</span>
                                <span  style="padding:4px 5px;" > ... </span>
                                <span  style="padding:4px 5px;cursor:pointer;" onclick="listUpDown(productjson,${ max-(schet + napr+1)},15)"> ${max-1 }</span>
                                <span  style="padding:4px 5px;cursor:pointer;" onclick="listUpDown(productjson,${ max-(schet + napr)},15)"> ${max }</span>`;

            } else {
                if (schet + napr == 1)
                    block__span = ` <span class="numList" style="padding:4px 10px;color:var(--malina-color);font-weight: bold;cursor:pointer;" onclick="listUpDown(productjson,0,15)"> ${schet + napr }</span>
                                <span style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,1,15)"> 2</span>
                                <span style="padding:4px 10px;" > ... </span>
                                <span style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${max-2 },15)"> ${max-1 }</span>
                                <span style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${max-1 },15)"> ${max }</span>`;

                if (schet + napr == 2)
                    block__span = `<span  style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,-1,15)"> 1</span>
                                <span class="numList" style="padding:4px 10px;color:var(--malina-color);font-weight: bold;cursor:pointer;" onclick="listUpDown(productjson,0,15)"> ${schet + napr }</span>
                                <span  style="padding:4px 10px;" > ... </span>
                                <span  style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${max-3 },15)"> ${max-1 }</span>
                                <span  style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${max-2 },15)"> ${max }</span>`;

                if (schet + napr == max - 1)
                    block__span = `<span style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${-(schet + napr -1) },15)"> 1</span> 
                                <span  style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${-(schet + napr -2) },15)"> 2</span>
                                <span  style="padding:4px 10px;" > ... </span>
                                <span class="numList" style="padding:4px 10px;color:var(--malina-color);font-weight: bold;cursor:pointer;" onclick="listUpDown(productjson,0,15)">${schet + napr }</span>
                                <span  style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${1},15)"> ${max}</span>`;

                if (schet + napr == max)
                    block__span = `<span style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${-(schet + napr -1) },15)"> 1</span> 
                                <span  style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${-(schet + napr -2) },15)"> 2</span>
                                <span  style="padding:4px 10px;" > ... </span>
                                <span style="padding:4px 10px;cursor:pointer;" onclick="listUpDown(productjson,${ -1},15)"> ${max-1 }</span>
                                <span class="numList" style="padding:4px 10px;color:var(--malina-color);font-weight: bold;cursor:pointer;" onclick="listUpDown(productjson,0,15)"> ${schet + napr }</span>`;

            }
        } else {
            for (let j = 1; j <= max; j++)
                block__span += `<span ${ j != (schet + napr) ? `style="padding:4px 10px;cursor:pointer;"`:` class ="numList" style="padding:4px 10px;color:var(--malina-color);font-weight: bold;cursor:pointer;"`} onclick="listUpDown(productjson,${-(schet + napr - j)},15)"> ${j}</span>`;
            
        }

        block.innerHTML += ` ${block__span}
         <button onclick = "listUpDown(productjson,1,15)" type = "button" class = "btn btn-primary" > 
                                        >> 
                                    </button>`;


        block2.innerHTML = block.innerHTML;
    }   

const changeView = (num) => {

    let cards = document.getElementsByClassName("card");
    let cards__img = document.getElementsByClassName("card__img");
    let cards__body = document.getElementsByClassName("card__body");
    let cards__body__block = document.getElementsByClassName("card__body__block");
    let cards__body__price = document.getElementsByClassName("card__body__price");

    if (cards[0].classList.contains("new-card")) {
        if (num == 1) return;
        document.getElementById("body").style.flexDirection = "row";
        for (let el of cards) el.classList.remove("new-card");
        for (let el of cards__img)if(!el.classList.contains("card__pre-img")) el.classList.remove("new-card__img");
        for (let el of cards__body) el.classList.remove("new-card__body");
        for (let el of cards__body__block) el.classList.remove("new-card__body__block");
        for (let el of cards__body__price)
            if (el.style.marginRight == "-107px") el.style.marginRight = "1px";
    } else {
        if (num == 0) return;
        document.getElementById("body").style.flexDirection = "column";
        for (let el of cards) el.classList.add("new-card");
        for (let el of cards__img) if(!el.classList.contains("card__pre-img")) el.classList.add("new-card__img");
        for (let el of cards__body) el.classList.add("new-card__body");
        for (let el of cards__body__block) el.classList.add("new-card__body__block");
        for (let el of cards__body__price)
            if (el.style.marginRight == "1px") el.style.marginRight = "-107px";
    }

}


const sort = (el) => {
    document.getElementById("descending").style.backgroundColor = el.id == "descending" ? "var(--primary-color)" : "var(--malina-color)"
    document.getElementById("ascending").style.backgroundColor = el.id == "ascending" ? "var(--primary-color)" : "var(--malina-color)"
    document.getElementById("a_to_z").style.backgroundColor = el.id == "a_to_z" ? "var(--primary-color)" : "var(--malina-color)"
    document.getElementById("z_to_a").style.backgroundColor = el.id == "z_to_a" ? "var(--primary-color)" : "var(--malina-color)"
    
    document.getElementById("descending").style.color = el.id == "descending" ? "var(--malina-color)" : "var(--primary-color)"
    document.getElementById("ascending").style.color = el.id == "ascending" ? "var(--malina-color)" : "var(--primary-color)"
    document.getElementById("a_to_z").style.color = el.id == "a_to_z" ? "var(--malina-color)" : "var(--primary-color)"
    document.getElementById("z_to_a").style.color = el.id == "z_to_a" ? "var(--malina-color)" : "var(--primary-color)"

    document.getElementById("descending").style.borderColor = el.id == "descending" ? "var(--primary-color)" : "var(--malina-color)"
    document.getElementById("ascending").style.borderColor = el.id == "ascending" ? "var(--primary-color)" : "var(--malina-color)"
    document.getElementById("a_to_z").style.borderColor = el.id == "a_to_z" ? "var(--primary-color)" : "var(--malina-color)"
    document.getElementById("z_to_a").style.borderColor = el.id == "z_to_a" ? "var(--primary-color)" : "var(--malina-color)"
    listUpDown(productjson,0,15)
}

const starClick = (el) => {
    starMouse(el);
    let id = el.id.split("_star")[0];
    document.getElementById(id + "_body_block_star").classList.remove("wrong")
    for( let i =1; i<=5 ; i++){
        document.getElementById(id+"_star_"+i).classList.add("people-star");
        document.getElementById(id+"_star_"+i).classList.toggle("glyphicon-star",el.id[el.id.length-1] >=i);     
        document.getElementById(id+"_star_"+i).classList.toggle("glyphicon-star-empty",el.id[el.id.length-1] <i);       
    }

}

const starMouse = (el) => {
    let id = el.id.split("_star_")[0];
    if(document.getElementById(id+"_star_1").classList.contains("people-star")){return 0;}
    let num = el.id.split("_star_")[1]*1;
    for( let i =1; i<=num ; i++){
        document.getElementById(id+"_star_"+i).classList.toggle("star_mouse");     
        document.getElementById(id+"_star_"+i).style.color = document.getElementById(id+"_star_"+i).style.color == "rgb(230, 162, 116)" ? "rgb(230, 218, 116)" : "rgb(230, 162, 116)"; 
    }

}


const closeFeedBack = (el) =>{
    let id  =el.id[el.id.length-1] == "n" ? el.id.split("_close_btn")[0] : el.id.split("_sendFeed")[0];
    let block = document.getElementById(id + '_feed_wrapper');
    
    document.getElementById(id + "_body_block").classList.remove("send");
    document.getElementById(id+"_body_block").classList.remove("preview");
    document.getElementById("blur").style.display = "none"
    document.getElementById("close").style.display = "none"
    document.getElementById(id + "_close_btn").id ="close_btn"
    document.getElementById(id+"_star_count").style.display = "block"
    if(document.getElementById(id + "_img").classList.contains("new-card__img")){document.getElementById(id + "_body_block").classList.add("new-card__body__block")}
    
    block.innerHTML=""
    document.getElementById(id + "_pre-image").style.display = "none"
    document.getElementById(id + "_show").style.display = "block"
}

const showFeedBack = (el) => {
    let id  = el.id.split("_sendFeed")[0];
    let block = document.getElementById(id + '_feed_wrapper');
    let firstName = "?firstName?";
    let lastName = "?lastName?";
    let stars = 0;

    for( let i =1; i<=5 ; i++){
        stars += document.getElementById(id +"_star_"+i).classList.contains("glyphicon-star") && document.getElementById(id +"_star_"+i).classList.contains("people-star") ? 1 : 0;          
    }

    if(document.getElementById(id+"_body_block").classList.contains("send")){
        if(stars == 0){
            document.getElementById(id + "_body_block_star").classList.add("wrong")
            alert("Please, complete your review with an assessment")
            return 0;
        }
        getFeedBack("?firstName?","?lastName?",stars,document.getElementById(id+"_aboutInForm").value);
        closeFeedBack(el);
        prodMap.get(id).star.countFeedback = -1;
        prodMap.get(id).star.countStar = stars;
        el.style = "pointer-events: none;margin-left: 15px;padding: 1px 1px; border-color: #fff;color: #4ac96b;"
        el.innerHTML=""
        el.classList.add("glyphicon-ok")
        el.classList.add("glyphicon")
        document.getElementById(id+"_star_count").style.display = "none"
    }else{
        block.innerHTML = ` <form class = "wrapper__form form">
                                <span class="form__name"> ${firstName + "  "+ lastName},</span><span class="form__obr" >please your feedback</span>

                            <div>
                                <textarea id="${id}_aboutInForm" name="about" cols="45" rows="8" maxlength="255" required="required" class="form-control" style = "resize: none;"></textarea>

                            </div>
                        </form>
                        <div id="close">
                            <a id="close_btn" class="btn__close btn-default" onclick="closeFeedBack(this)">
                                <span class="glyphicon glyphicon-remove"></span>
                            </a>
                        </div>`;

        document.getElementById(id+"_body_block").classList.add("send");
        document.getElementById("blur").style.display = "block"
        document.getElementById(id + "_show").style.display = "none"
        document.getElementById(id+"_star_count").style.display = "none"
        document.getElementById("close_btn").id = id + "_close_btn"
        document.getElementById(id + "_pre-image").style.display = "none"
        if(document.getElementById(id + "_img").classList.contains("new-card__img")){document.getElementById(id + "_body_block").classList.remove("new-card__body__block")}
    }
    

}

const showPreview = (el) => {
    let id = el.id.split("_show")[0];
    let block = document.getElementById(id + '_feed_wrapper');
 
        block.innerHTML = ` <form class = "wrapper__form form">

                            <div>
                                <h4 class="card__body__title card-title" style="padding:10px;text-align:center;" id="${prodMap.get(id).id}_name">${prodMap.get(id).description}</h4>
                            </div>
                        </form>
                        <div id="close">
                            <a id="close_btn" class="btn__close btn-default" onclick="closeFeedBack(this)">
                                <span class="glyphicon glyphicon-remove"></span>
                            </a>
                        </div>`;

        document.getElementById(id+"_body_block").classList.add("preview");
        
        document.getElementById("blur").style.display = "block"
        document.getElementById(id + "_show").style.display = "none"
        document.getElementById(id + "_pre-image").style.display = "block"
        document.getElementById("close_btn").id = id + "_close_btn"
       
        if(document.getElementById(id + "_img").classList.contains("new-card__img")){
            document.getElementById(id + "_body_block").classList.remove("new-card__body__block")
        }
    
    

}

listUpDown(productjson,0,15)