/*****************************************

 * Add the capability for mathquill to generate ARIA alerts. Necessary so MQ can convey information as a screen reader user navigates the fake MathQuill textareas.
 * Official ARIA specification: https://www.w3.org/TR/wai-aria/
 * WAI-ARIA is still catching on, thus only more recent browsers support it, and even then to varying degrees.
 * The below implementation attempts to be as broad as possible and may not conform precisely to the spec. But, neither do any browsers or adaptive technologies at this point.
 * At time of writing, IE 11, FF 44, and Safari 8.0.8 work. Older versions of these browsers should speak as well, but haven't tested precisely which earlier editions pass.

 * Tested AT: on Windows, Window-Eyes, ZoomText Fusion, NVDA, and JAWS (all supported).
 * VoiceOver on Mac platforms also supported (only tested with OSX 10.10.5 and iOS 9.2.1+).
 * Chrome 54+ on Android works reliably with Talkback.
 ****************************************/

Controller.open(function(_) {
  _.createAriaElement = function() {
    _.ariaElement = jQuery("<span aria-live='assertive' aria-atomic='true' class='mq-aria-alert'></span>");
    this.container.append(this.ariaElement);
    _.ariaItems = [];
    _.ariaMsg = '';
  };

  _.ariaQueue = function(item, shouldDescribe) {
    var output = '';
    if (item instanceof Node) {
      // Some constructs include verbal shorthand (such as simple fractions and exponents).
      // Since ARIA alerts relate to moving through interactive content, we don't want to use that shorthand if it exists
      // since doing so may be ambiguous or confusing.
      var itemMathspeak = item.mathspeak({ignoreShorthand: true});
      if (shouldDescribe) { // used to ensure item is described when cursor reaches block boundaries
        if (
          item.parent &&
          item.parent.ariaLabel &&
          item.ariaLabel === 'block'
        ) {
          output = item.parent.ariaLabel+' '+itemMathspeak;
        } else if (item.ariaLabel) {
          output = item.ariaLabel+' '+itemMathspeak;
        }
      }
      if (output === '') {
        output = itemMathspeak;
      }
    } else {
      output = item;
    }
    this.ariaItems.push(output);
  };

  _.ariaQueueDirOf = function(dir) {
    prayDirection(dir);
    this.ariaQueue(dir === L ? 'before' : 'after');
  };

  _.ariaQueueDirEndOf = function(dir) {
    prayDirection(dir);
    this.ariaQueue(dir === L ? 'beginning of' : 'end of');
  };

  _.ariaAlert = function(t) {
    if (t) this.ariaQueue(t);
    if (this.ariaItems.length) {
      this.ariaMsg = this.ariaItems.join(' ').replace(/ +(?= )/g,'').trim();
      this.ariaElement.empty().text(this.ariaMsg);
    }
    this.ariaClear();
  };

  _.ariaClear = function() {
    this.ariaItems.length = 0;
  };

  // based on http://www.gh-mathspeak.com/examples/quick-tutorial/
  // and http://www.gh-mathspeak.com/examples/grammar-rules/
  _.exportMathSpeak = function() { return this.root.mathspeak(); };
});
