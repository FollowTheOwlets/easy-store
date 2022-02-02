# easy-store

### A framework for creating a page for your own online store.

**The block of the online store is placed in the block with id="easy-store"**

In the index js 

productjson[i] -> array string with product data :
.id-> product id
.name-> product name
.star.countStar-> product rating
.star.countFeedback-> number of reviews (-1 if user voted)
.imgSrc-> picture path
.description -> short description 
.status -> product availability

`function getFeedBack(fn, ln, star, text) {`
It's up to you to write the body of this function 
fn -> first name
ln -> last name
star-> product rating
text -> customer review text
`} `

