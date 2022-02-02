# easy-store

### A framework for creating a page for your own online store.

### Terms of Use :Terms of Use :

#### * In index.html

#### The block of the online store is placed in the block with id="easy-store".

The connection takes place by means of  
`<script src="easy-store/easy-store.js "></script>`
at the end of the body tag

#### * In index.js

#### productjson[i] -> array string with product data :

  .id-> product id
  .name-> product name
  .star.countStar-> product rating
  .star.countFeedback-> number of reviews (-1 if user voted)
  .imgSrc-> picture path
  .description -> short description
  .price-> short description
  .status -> product availability**

`function getFeedBack(fn, ln, star, text) {`
It's up to you to write the body of this function
fn -> first name
ln -> last name
star-> product rating
text -> customer review text
`} `

`function getBuyCart(arrayCart) {`
It's up to you to write the body of this function
arrauCart[i] -> array string with product:
.id-> product id
.name-> product name
.price-> product price*count
.count-> product count  
`} `

#### * In style.css

```
 :root {  
--primary-color: #28414F; /*Primary button color*/
--primary-hover-color: #456f88;  /*Primary button:hover color*/
--malina-color: #ffffff;  /*Highlight color on dark*/
--gorch-color: #42899A;  /*Header color*/
--sand-color: #72a0ac;  /* Body color*/
--success-hover-color: #3b8a7b;  /*Success button:hover color*/
--success-color: #1E6256;  /*Success button color*/
--dis-color: #658881;  /*Success disabled button  color*/
}
```
