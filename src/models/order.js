class OrderModel {
    getPurchaseDatas() {
        return $.parseJSON(localStorage.getItem('purchaseData'))
    }
}
export { OrderModel }