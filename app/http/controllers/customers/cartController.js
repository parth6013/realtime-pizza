function cartController(){
    return{
        index(req,res){
              res.render('customers/cart')
        },
        update(req,res){

            if(!req.session.cart){
                req.session.cart ={
                    items : {},
                    totalQty : 0,
                    totalPrice : (0)

                }
            }
            let cart = req.session.cart
            console.log(req.body)

            // check if items does not exist in cart 

            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item: req.body,
                    qty:1
                }
                cart.totalQty=cart.totalQty + 1
                cart.totalPrice = cart.totalPrice +  Number(req.body.price)
                
            }else{
                cart.items[req.body.body_id].qty =cart.items[req.body.body_id].qty + 1
                cart.totalQty=cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + Number(req.body.price)
            }


            return res.json({totalQty:req.session.cart.totalQty})
            //console.log(cart.totalPrice)
        }
 
    }
}


module.exports = cartController