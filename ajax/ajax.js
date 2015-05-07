var h = Cycle.h;
var endpoint = 'https://api.stackexchange.com//2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=';

function computer(interactions) {
  function vtreeFooter() {
    return h('p', null, [
      'Built with ',
      h('a', {href: 'https://github.com/pH200/cycle-react'}, 'cycle-react'),
      ', an ',
      h('a', {href: 'https://github.com/Reactive-Extensions/RxJS'}, 'Rx'),
      ' functional interface to ',
      h('a', {href: 'http://facebook.github.io/react/'}, "Facebook's React")
    ])
  }

  return interactions.get('.myinput', 'input')
    .map(function (ev) {
      return ev.target.value;
    })
    .startWith('')
    .distinctUntilChanged()
    .throttle(500)
    .flatMap(function (query) {
      if (query.trim() === '') {
        return [{items: []}];
      }
      return jQuery.get(endpoint + encodeURIComponent(query));
    })
    .map(function (result) {
      return h('div', [
        h('label', 'stackoverflow search: '),
        h('input.myinput', {type: 'text'}),
        h('hr'),
        h('div', result.items.map(function (item) {
          return h('a', {
            href: item.link,
            style: {display: 'block'},
            // dangerouslySetInnerHTML: {__html: item.title}
          }, item.title);
        })),
        h('hr'),
        vtreeFooter()
      ]);
    });
}

Cycle.applyToDOM('.js-container', computer);
