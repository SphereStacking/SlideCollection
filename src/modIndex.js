import { parse } from 'node-html-parser'
import { readFileSync, writeFileSync } from 'fs'

const HTML_PATH = process.argv[2]

const root = parse(readFileSync(HTML_PATH, 'utf-8'))
const script = parse(`
<script>
    (function () {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
        history.replaceState(null, null, redirect);
    }
    })();
</script>
`)
root.querySelector('head').appendChild(script)

writeFileSync(HTML_PATH, root.toString())
