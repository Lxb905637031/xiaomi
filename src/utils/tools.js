function tplReplace(tpl, replaceObject) {
    return tpl.replace(/{{ (.*?) }}/g, (node, key) => {
        return replaceObject[key];
    })
}

function trimSpaces(str) {
    return str.replace(/\s+/g, '')
}

function getUrlQueryValue(key) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
    const res = window.location.search.substr(1).match(reg)
    return res != null ? decodeURIComponent(res[2]) : null
}

function throttle(fn, delay) {
    let t = null
    let begin = new Date().getTime()
    return function() {
        let self = this
        let args = arguments
        let cur = new Date().getTime()
        clearTimeout(t)
        if (cur - begin >= delay) {
            fn.apply(self, args)
            begin = cur
        } else {
            t = setTimeout(function() {
                fn.apply(self, args)
            }, delay)
        }
    }
}

function getDateTime() {
    const date = new Date()

    function addZero(value) {
        return value < 10 ? ('0' + value) : value
    }
    let year = date.getFullYear()
    let month = addZero(date.getMonth() + 1)
    let day = addZero(date.getDate())
    let hours = addZero(date.getHours())
    let minutes = addZero(date.getMinutes())
    let seconds = addZero(date.getSeconds())

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

function setRandomNo(num) {
    let no = ''
    for (let i = 0; i < num; i++) {
        no += Math.floor(Math.random() * 10)
    }
    return new Date().getTime() + no
}

module.exports = {
    tplReplace,
    trimSpaces,
    getUrlQueryValue,
    throttle,
    getDateTime,
    setRandomNo
}