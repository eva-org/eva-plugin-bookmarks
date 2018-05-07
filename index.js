const child_process = require('child_process')
const bookmarks = {
    'bd': {name: '百度', url: 'https://www.baidu.com'},
    'bl': {name: '哔哩哔哩', url: 'https://www.bilibili.com'},
    'g': {name: '谷歌', url: 'https://www.google.com'}
}
const open = url => {
    let cmd
    if (process.platform === 'win32') {
        cmd = 'start'
        return child_process.exec(`${cmd} ${url}`)
    } else if (process.platform === 'linux') {
        cmd = 'xdg-open'
    } else if (process.platform === 'darwin') {
        cmd = 'open'
    }
    child_process.exec(`${cmd} "${url}"`)
}

const getData = async ({query, utils: {logger}}) => {
    const openItem = bookmarks[query]
    if (openItem) {
        return [{
            title: `打开: ${openItem.name}`,
            subTitle: openItem.url,
            action() {
                open(openItem.url)
            }
        }]
    } else {
        const result = []
        Object.values(bookmarks).forEach(item => {
            logger.debug(item)
            result.push({
                title: `打开: ${item.name}`,
                subTitle: `${item.url}`,
                action() {
                    open(item.url)
                }
            })
        })

        return result
    }
}

module.exports = {
    name: 'Bookmarks',
    quick: 'bk',
    async query(pluginContext) {
        return getData(pluginContext)
    }
}
