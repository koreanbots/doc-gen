const fs = require('fs')
const path = require('path')

if(!fs.existsSync('docs')) throw new Error('Docs Soruce does not exisits.')
else console.log('[SUCCESS] CHECKED DOCS SOURCE')

const DocMap = require('./docs/map')

const Result = { version: require('./package.json').version, time: Number(new Date()), docs: {} }

DocMap.forEach(el=> {
    Result.docs[el.id] = { name: el.name, docs: {} }
    el.docs.forEach(doc=> {
        Result.docs[el.id].docs[doc.id] = { name: doc.name, content: fs.readFileSync(path.join(__dirname, '/docs', doc.path)).toString().replace(/###### (.*?): (.*)/gi,  '<div class="ui segment"><div class="ui top attached label">$1</div><br/>$2</div><br/>') }
    })
})

fs.writeFile('out.json', JSON.stringify(Result), function(){
    console.log(Result.docs.api.docs.mybot)
    console.log('[SUCCESS] SAVED OUTPUT.')
})