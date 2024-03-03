interface Size {
  // TODO-layout-engine: caching on width and height
  /** width measured in em */
  readonly width: number;
  /** height measured in em */
  // TODO-layout-engine: ascent + descent instead of height
  // Ascent/descent demo: https://www.desmos.com/calculator/anurp6uctz?recursion
  // Each box gets a blue box that's above the baseline and a red box below the baseline.
  // That's not just for future TeX-like behavior. The current Mathquill
  // behavior uses ascent + descent implicitly since all elements are
  // inline/inline-block, and vertical-align is relative to parent baseline.
  readonly height: number;
}

function wh(width: number, height: number): Size {
  return { width, height };
}

// Various constants below. Probably most are incorrect.

const FONTSIZE_SUB = 0.72;
const FONTSIZE_SUP = 0.9;
const FONTSIZE_NTHROOT = 0.8;
const FONTSIZE_FRAC = 0.9;

/** Most of these numbers are from getBoundingClientRect() on font-size 20.24.
 * To convert to em, divide by 20.24. */
const fs = 20.24;
const whfs = (w: number, h: number) => wh(w / fs, h / fs);

/// Following constants are likely incorrect (they likely don't correctly
/// account for padding/margin, among other reasons), but they'll stay constants.

// Various padding information
const WIDTH_SQRT_PREFIX = 20.21875 / fs;
const HEIGHT_SQRT_TOP = 1.0 / fs;
const HEIGHT_HAT_TOP = 5.0625 / fs;
const HEIGHT_BRACKET = 4.03125 / fs;
const TOP_BOTTOM_MARGIN_BINOMIAL = 1.0;
const HEIGHT_MATHFIELD_PAD = 4.0 / fs;
const WIDTH_MATHFIELD_PAD = 12.0 / fs;
/** WIDTH_DIGIT_SEPARATOR is @digit-separator from math.less
 * It also defines @expand-margin and @contract-margin */
const WIDTH_DIGIT_SEPARATOR = 0.11;

// Sizes of specific symbols
const SIZE_FRAC_BAR = whfs(11.71875, 1.0);
const SIZE_EMPTY = whfs(11.71875, 18.21875);
const SIZE_SUM = whfs(33.59375, 40.484375);
const SIZE_PROD = whfs(32.65625, 40.484375);
const SIZE_COPROD = whfs(30.640625, 40.484375);
const SIZE_INT = whfs(14.098434448242188, 40.484375);
const SIZE_PERCENT_OF = whfs(38.78125, 20);
const SIZE_VEC = whfs(20.234375, 8.328125);
const SIZE_TILDE = whfs(10.453125, 8.09375);
const SIZE_DIGIT = whfs(10.3125, 20);
const SIZE_F = whfs(5.625, 22);
const SIZE_SPACE = whfs(5.0625, 20);
const SIZE_PERIOD = whfs(5.0625, 20);
const SIZE_PRIME = whfs(4.4375, 20);
const SIZE_DPRIME = whfs(8.4375, 20);
const SIZE_BACKSLASH = whfs(5.625, 20);
const SIZE_DOLLAR = whfs(10.125, 20);
const SIZE_SQUARE = whfs(12.234375, 20);
const SIZE_MID = whfs(10.125, 20);
const SIZE_AT = whfs(18.640625, 22);
const SIZE_AMPERSAND = whfs(15.75, 22);
const SIZE_PERCENT = whfs(16.859375, 20);
const SIZE_PARALLEL = whfs(10.125, 20);
const SIZE_NPARALLEL = whfs(10.125, 20);
const SIZE_PERP = whfs(15.734375, 20);
const SIZE_PI = whfs(10.21875, 22);
const SIZE_LAMBDA = whfs(9.8125, 22);
const SIZE_UPSILON = whfs(12.875, 22);
const SIZE_PLUS_MINUS = whfs(11.109375, 20); // ± and ∓ have the same size
const SIZE_CDOT = whfs(14.84375, 20.234375);
const SIZE_TO = whfs(28.328125, 20.234375);
const SIZE_INEQUALITY = whfs(23.828125, 20.234375); // <, ≤, ≥, > have the same size.
const SIZE_INFINITY = whfs(14.4375, 20);
const SIZE_NOT_EQUALS = whfs(19.203125, 20.234375);
const SIZE_EQUALS = whfs(23.828125, 20.234375);
const SIZE_TIMES = whfs(19.515625, 20.234375);
const SIZE_DIV = whfs(23.828125, 20.234375);
const SIZE_SIM = whfs(18.546875, 20.234375);
const SIZE_APPROX = whfs(23.828125, 20.234375);
const SIZE_NBSP = whfs(5.0625, 20);

// Following constants are definitely incorrect since they depend on child
// sizes which might have to be getBoundingClientRect'd.
const SIZE_ANS = whfs(26.984375, 20);
const SIZE_TOKEN = whfs(26, 26);
const SIZE_EMBED = SIZE_TOKEN;
const SIZE_LATEX_COMMAND_INPUT = SIZE_EMBED;
const SIZE_TEXT = SIZE_EMBED;
const SIZE_HTML_BUILDER = SIZE_EMBED;
const SIZE_ROOT = SIZE_EMBED;

// Following constants are definitely incorrect since they refer to more than
// one actual symbol. E.g. SIZE_VARIABLE includes all English and Greek letters.
// This is fixable though; can be measured manually, or take the sizing from font files.
const SIZE_VARIABLE = whfs(14.625, 22);
const SIZE_UPPERCASE_GREEK = whfs(13.015625, 20);
const SIZE_VANILLA_SYMBOL = SIZE_UPPERCASE_GREEK;
const SIZE_BINARY_OPERATOR = SIZE_DIV;
