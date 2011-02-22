//// JavaScript adaption of Contracts as Pairs of Projections

function blame (x) {
  throw new Error('' + x + ' violated the contract');
};

//// Contract combiners for contracts as pairs of projections

// type Contract₃ α = (symbol → α → α) x (symbol → α → α)

function flat (f) { return {
  car: function (s) { return function (x) { return f(x) ? x : blame(s) } },
  cdr: function (s) { return function (x) { return x } } } };

function ho (a, b) { return {
  car: function (s) {
         var ac = a.cdr(s),
             bs = b.car(s);
         return function (val) {
           return typeof val === 'function' ?
                  function (x) { return bs(val(ac(x))) } :
                  blame(s) } },
  cdr: function (s) {
         var bc = b.cdr(s),
             as = a.car(s);
         return function (val) {
           return typeof val === 'function' ?
                  function (x) { return bc(val(as(x))) } :
                  val } } } };

function guard (ctc, val, pos, neg) {
  var server_proj = ctc.car(pos),
      client_proj = ctc.cdr(neg);
  return client_proj(server_proj(val)) };

