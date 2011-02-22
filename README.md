# What is contract.js?

Contract.js is a JavaScript translation of
[Contracts as Pairs of Projections] [1].

  [1]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.83.5188
       "Findler, R. B. and M. Blume. Contracts as pairs of projections, 2006"

# How does it work?

If the [mentioned paper] [1] is tl;dr--actually it isn't--following
steps should be enough to experiment with contract.js.

### 1. Define some predicates

    function evenp (x) { return (x % 2) === 0 };
    function oddp  (x) { return (x % 2) === 1 };

### 2. Define some contracts

    oddin_oddout = ho(flat(oddp), flat(oddp));
    oddin_oddout_evenout = ho(ho(flat(oddp), flat(oddp)), flat(evenp));

### 3. Define some guarded procedures

Note: the callee is called "server", the caller "client".

    p1 = guard(oddin_oddout,
               function (y) { return y },
               "server", "client");
    p2 = guard(oddin_oddout,
               function (y) { return y * y - y },
               "server", "client");
    p3 = guard(oddin_oddout_evenout,
               function (f) { return f(1) },
               "server", "client");

### 4. Call the procedures

    p1(2); // Error: client violates the contract
    p1(3); // Error: server violates the contract
    p1(function (x) { return x + 2 }); // Error: server violates the contract

# Future direction of contract.js?

It would be nice to have a contract checking library à la
[Racket's contract system] [3].

  [2]: http://docs.racket-lang.org/reference/contracts.html
       "Contracts in Reference: Racket"
  [3]: http://docs.racket-lang.org/guide/contracts.html
       "Contracts in Guide: Racket"
