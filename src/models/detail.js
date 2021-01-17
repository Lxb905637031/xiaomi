import config from '../utils/config'
import tools from '../utils/tools'

class DetailModel {
    getPhoneInfo(pid) {
        const url = `getPhoneInfo?id=${pid}`
        return $.ajax({
            url: config.API.base_url + url,
            type: 'get',
            dataType: 'JSONP',
            jsonp: 'cb',
            success(data) {
                return data
            }
        })
    }

    addToCart(userPhoneInfo, callback) {
        let cartData = localStorage.getItem('cartData')
        if (!cartData) {
            cartData = []
        } else {
            cartData = $.parseJSON(cartData)
        }

        const _cartArr = cartData.filter(item => {
            if (item.id === userPhoneInfo.id) {
                if (item.version === userPhoneInfo.version && item.color === userPhoneInfo.color) {
                    return true
                }
            }
        })

        if (_cartArr.length <= 0) {
            let purchaseData = localStorage.getItem('purchaseData')

            if (purchaseData) {
                purchaseData = $.parseJSON(purchaseData)
                const _purchaseArr = purchaseData.filter(item => {
                    if (item.id === userPhoneInfo.id) {
                        if (item.version === userPhoneInfo.version && item.color === userPhoneInfo.color) {
                            return true
                        }
                    }
                })
                if (_purchaseArr.length > 0) {
                    alert('该产品已购买')
                } else {
                    addToCartData()
                }
            } else {
                addToCartData()
            }
        } else {
            alert('该产品已在购物车中')
        }

        function addToCartData() {
            userPhoneInfo.cardId = tools.setRandomNo(6)
            cartData.push(userPhoneInfo)
            localStorage.setItem('cartData', JSON.stringify(cartData))
            alert('已成功加入购物车')
            callback && callback()
        }

    }

    purchase(userPhoneInfo, doAlert, callback) {
        let purchaseData = localStorage.getItem('purchaseData')
        if (purchaseData) {
            purchaseData = $.parseJSON(purchaseData)
            const _arr = purchaseData.filter(item => {
                if (item.id === userPhoneInfo.id) {
                    if (item.version === userPhoneInfo.version && item.color === userPhoneInfo.color) {
                        return true
                    }
                }
            })
            if (_arr.length <= 0) {
                addPurchaseData()
                removeInfoFormCart()
            } else {
                alert('该产品已购买')
            }
        } else {
            purchaseData = []
            addPurchaseData()
            removeInfoFormCart()
        }

        function addPurchaseData() {
            userPhoneInfo.orderId = tools.setRandomNo(6)
            userPhoneInfo.purchaseTime = tools.getDateTime()
            purchaseData.push(userPhoneInfo)
            localStorage.setItem('purchaseData', JSON.stringify(purchaseData))
            doAlert && alert('已经购买该产品')
        }

        function removeInfoFormCart() {
            let cartData = localStorage.getItem('cartData')

            if (cartData) {
                cartData = $.parseJSON(cartData)
                cartData = cartData.filter(item => {
                    if (item.id === userPhoneInfo.id) {
                        if (item.version === userPhoneInfo.version && item.color === userPhoneInfo.color) {
                            return false
                        }
                    }
                    return true
                })
                localStorage.setItem('cartData', JSON.stringify(cartData))
            }
            callback && callback()
        }
    }
}

export { DetailModel }