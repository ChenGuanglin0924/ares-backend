const fs = require('fs');
const { resolve } = require('path');

function loop(data, basePath) {
    fs.readdirSync(basePath).forEach(file => {
        const path = resolve(basePath, file);
        if (fs.statSync(path).isDirectory()) {
            const item = {key: file, title: file, children: []};
            loop(item, path);
            data.children.push(item);
        } else {
            data.children.push({key: file, title: file});
        }
    });
}

module.exports = async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');

    const data = [];
    ['GIS', 'RS', 'SOFT', 'WEBS'].forEach(name => {
        const basePath = resolve(__dirname, '../../../ruiduobao.com/docs/.vuepress/dist', name);
        const item = { key: name, title: name, children: [] };
        loop(item, basePath, name);
        data.push(item);
    });

    

    ctx.body = JSON.stringify(data);
    await next();
}