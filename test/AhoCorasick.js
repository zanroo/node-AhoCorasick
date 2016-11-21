var AhoCorasick = require('../');
var should = require('should');
describe('AhoCorasick', function() {
  var ac = null;
  beforeEach(function() {
    ac = new AhoCorasick();
    ac.add({
      o: {
        _id: 'a',
        i: 0,
        j: 0,
      },
      value: '123'
    });
    ac.add({
      o: {
        _id: 'a',
        i: 0,
        j: 1,
      },
      value: '321'
    });
  });
  it('search after build', function() {
    ac.build();
    var res = ac.search('12321,321,321');
    res.should.be.an.Array;
    res[0].o.should.be.an.Object;
    res[1].o.should.be.an.Object;
    res[2].o.should.be.an.Object;
    res[0].a.should.eql(0);
    res[0].b.should.eql(3);
    '123'.substring(res[0].a, res[0].b);
    res[1].a.should.eql(2);
    res[1].b.should.eql(5);
    '321'.substring(res[0].a, res[0].b);
    res[2].a.should.eql(6);
    res[2].b.should.eql(9);
    '321'.substring(res[0].a, res[0].b);
    res[3].a.should.eql(10);
    res[3].b.should.eql(13);
    '321'.substring(res[0].a, res[0].b);
  });
  it('search before build', function() {
    try {
      ac.search('12321, 321,321,321,321');
    } catch (e) {
      e.message.should.eql('please build before search');
    }
  });
});
