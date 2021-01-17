class CartModel {
    getCartDatas() {
        return $.parseJSON(localStorage.getItem('cartData'))
    }
    removeData(cartId) {
        let cartData = $.parseJSON(localStorage.getItem('cartData'))

        cartData = cartData.filter(item => {
            return item.cartId !== cartId
        })

        localStorage.setItem('cartData', JSON.stringify(cartData))
    }
}

export { CartModel }