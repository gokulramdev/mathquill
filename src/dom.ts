const urlParams = new URLSearchParams(window.location.search);

function parseHTML(s: string): NodeListOf<ChildNode> {
  // https://youmightnotneedjquery.com/#parse_html
  if (urlParams.get('jq-parse')) {
    return ($ as any)(s);
  }
  const tmp = document.implementation.createHTMLDocument("");
  tmp.body.innerHTML = s;
  return tmp.body.childNodes;
}

function closest(el: Element | null, s: string) {
  if (el?.closest) {
    return el?.closest(s);
  }

  if (!el) return null;

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#polyfill
  const matches =
    Element.prototype.matches ||
    (Element.prototype as any).msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;

  var match: ParentNode | null = el;
  do {
    if (matches.call(match, s)) return match;
    match = match?.parentElement ?? match?.parentNode ?? null;
  } while (match !== null && match.nodeType === 1);
  return null;
}
