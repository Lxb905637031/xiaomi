import config from '../utils/config'

class IndexModel {
    getDatas(options) {
        const url = `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`
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
}

export { IndexModel }