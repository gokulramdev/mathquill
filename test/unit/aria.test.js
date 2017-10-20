suite('aria', function() {
  var mathField;
  setup(function() {
    mathField = MQ.MathField($('<span></span>').appendTo('#mock')[0]);
  });

  function assertAriaEqual(alertText) {
    assert.equal(alertText, mathField.__controller.aria.msg);
  }

  test('typing and backspacing over simple expression', function() {
    mathField.typedText('1');
    assertAriaEqual('1');
    mathField.typedText('+');
    assertAriaEqual('plus');
    mathField.typedText('1');
    assertAriaEqual('1');
    mathField.typedText('=');
    assertAriaEqual('equals');
    mathField.typedText('2');
    assertAriaEqual('2');
    mathField.keystroke('Backspace');
    assertAriaEqual('2');
    mathField.keystroke('Backspace');
    assertAriaEqual('equals');
    mathField.keystroke('Backspace');
    assertAriaEqual('1');
    mathField.keystroke('Backspace');
    assertAriaEqual('plus');
    mathField.keystroke('Backspace');
    assertAriaEqual('1');
  });

  test('typing and backspacing a fraction', function() {
    mathField.typedText('1');
    assertAriaEqual('1');
    mathField.typedText('/');
    assertAriaEqual('over');
    mathField.typedText('2');
    assertAriaEqual('2');
    mathField.keystroke('Backspace');
    assertAriaEqual('2');
    mathField.keystroke('Backspace');
    assertAriaEqual('Over');
    mathField.keystroke('Backspace');
    assertAriaEqual('1');
  });

  test('navigating a fraction', function() {
    mathField.typedText('1');
    assertAriaEqual('1');
    mathField.typedText('/');
    assertAriaEqual('over');
    mathField.typedText('2');
    assertAriaEqual('2');
    mathField.keystroke('Up');
    assertAriaEqual('numerator 1');
    mathField.keystroke('Down');
    assertAriaEqual('denominator 2');
    mathField.latex('');
  });

  test('typing and backspacing through parenthesies', function() {
    mathField.typedText('(');
    assertAriaEqual('left parenthesis');
    mathField.typedText('1');
    assertAriaEqual('1');
    mathField.typedText('*');
    assertAriaEqual('times');
    mathField.typedText('2');
    assertAriaEqual('2');
    mathField.typedText(')');
    assertAriaEqual('right parenthesis');
    mathField.keystroke('Backspace');
    assertAriaEqual('right parenthesis');
    mathField.keystroke('Backspace');
    assertAriaEqual('2');
    mathField.keystroke('Backspace');
    assertAriaEqual('times');
    mathField.keystroke('Backspace');
    assertAriaEqual('1');
    mathField.keystroke('Backspace');
    assertAriaEqual('left parenthesis');
  });

  test('testing beginning and end alerts', function() {
    mathField.typedText('sqrt(x)');
    mathField.keystroke('Home');
    assertAriaEqual('beginning of block "s""q""r""t" left parenthesis, "x" , right parenthesis');
    mathField.keystroke('End');
    assertAriaEqual('end of block "s""q""r""t" left parenthesis, "x" , right parenthesis');
    mathField.keystroke('Ctrl-Home');
    assertAriaEqual('beginning of MathQuill Input "s""q""r""t" left parenthesis, "x" , right parenthesis');
    mathField.keystroke('Ctrl-End');
    assertAriaEqual('end of MathQuill Input "s""q""r""t" left parenthesis, "x" , right parenthesis');
  });

  test('testing aria-label for interactive and static math', function(done) {
    mathField.typedText('sqrt(x)');
    mathField.blur();
    setTimeout(function() {
      assert.equal('MathQuill Input: "s""q""r""t" left parenthesis, "x" , right parenthesis', mathField.__controller.container.attr('aria-label'));
      done();
    });
    var staticMath = MQ.StaticMath($('<span class="mathquill-static-math">y=\\frac{2x}{3y}</span>').appendTo('#mock')[0]);
    assert.equal('"y" equals StartFraction, 2"x" Over 3"y" , EndFraction', staticMath.__controller.container.attr('aria-label'));
  });

});