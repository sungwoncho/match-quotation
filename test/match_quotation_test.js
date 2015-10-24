var matchQuotation = require('../index');
var expect = require('chai').expect;

describe("match_quotation", function(){
  it("matches a simple case for \"", function(){
    var sample = '\"\"';
    var result = matchQuotation(sample, {line:1, cursor: 1});
    expect(result.line).to.equal(1);
    expect(result.cursor).to.equal(2);
  });

  it("matches a simple case for \'", function(){
    var sample = '\'\'';
    var result = matchQuotation(sample, {line:1, cursor: 1});
    expect(result.line).to.equal(1);
    expect(result.cursor).to.equal(2);
  });

  it("matches a simple case for \`", function(){
    var sample = '\`\`';
    var result = matchQuotation(sample, {line:1, cursor: 1});
    expect(result.line).to.equal(1);
    expect(result.cursor).to.equal(2);
  });

  it("returns null as properties when unmatched", function(){
    var sample = '\"\"\'';
    var result = matchQuotation(sample, {line:1, cursor: 3});
    expect(result.line).to.equal(null);
    expect(result.cursor).to.equal(null);
  });
});
