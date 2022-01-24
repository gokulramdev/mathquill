
function parseHTML(s: string): NodeListOf<ChildNode> {
    // https://youmightnotneedjquery.com/#parse_html
    const tmp = document.implementation.createHTMLDocument("");
    tmp.body.innerHTML = s;
    return tmp.body.childNodes;
}