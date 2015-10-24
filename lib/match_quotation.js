var Tracker = require('./tracker');

module.exports = function (code, quotationPos) {
  const QUOTATION_PAIRS = {
    '\"': '\"',
    '\'': '\'',
    '\`': '\`'
  };

  // Trims the portion of the code before the quotation mark appears
  // Returns a string against which we can scan for the matching quotation mark
  function trim(code, quotationPos) {
    var lines = code.split('\n').slice(quotationPos.line - 1);
    lines[0] = lines[0].substring(quotationPos.cursor - 1);

    return lines.join('\n');
  }

  var activeQuotations = [];
  var tracker = new Tracker(quotationPos);
  var trimmed = trim(code, quotationPos);

  for (var i = 0; i < trimmed.length; i++) {
    var char = trimmed[i];

    if (QUOTATION_PAIRS[char]) {
      var latestQuotation = activeQuotations[activeQuotations.length - 1];

      if (latestQuotation === char) {
        activeQuotations.pop();
      } else {
        activeQuotations.push(char);
      }
    }

    if (activeQuotations.length === 0) {
      return {
        line: tracker.line,
        cursor: tracker.cursor
      };
    } else {
      tracker.advancePosition(char);
    }
  }

  // If for-loop terminates without returning, quotation is not matched
  return {
    line: null,
    cursor: null
  };
};
