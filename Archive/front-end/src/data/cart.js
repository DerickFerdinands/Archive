export function CustomizeCart() {

    let cart = sessionStorage.getItem("cart")==null?[]:JSON.parse(sessionStorage.getItem("cart"))

    this.addToCart = (product, selectedOption) => {
        if (cart.length > 0) {

            const productsExists = cart.filter((item) => (item.code === product.code) & (item.selectedOption.optionName === selectedOption))

            if (productsExists.length > 0) {
                const option = productsExists[0].options.filter((option) => option.optionName === selectedOption)

                if ((productsExists[0].selectedOption.qty + 1) <= option[0].optionQty) {
                    productsExists[0].selectedOption.qty += 1
                } else {
                    throw new Error("Unavailable Qty!")
                }
            } else {
                product.selectedOption = {optionName: selectedOption, qty: 1}
                cart.push(product)
            }

        } else {
            product.selectedOption = {optionName: selectedOption, qty: 1}
            cart.push(product)
        }
        console.log(product, selectedOption)

        console.log(cart)

        sessionStorage.setItem("cart",JSON.stringify(cart))

    }

    this.getDueAmount= ()=>{
        let total=0;
        for (let cartItem of cart){
            total+=(cartItem.price*cartItem.selectedOption.qty);
        }
        return total;
    }

    this.removeFromCart = (product) => {
    }

    this.clearCart = () => {
        cart=[];
        sessionStorage.setItem("cart",JSON.stringify(cart))
    }

    this.getCartItems = () => {
        return cart;
    }

    this.getCartLength = () => {
        return cart.length;
    }
}


