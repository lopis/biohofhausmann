require('./css/style.scss')

console.log('Hello. I see you love digging too. Our vegetables are grown with love and care. Thank you for checking our website. :)')

function _(query) {
  return document.querySelector(query)
}

function on(selector, event, callack) {
  _(selector).addEventListener(event, callack)
}

window.addEventListener('scroll', function(e) {
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0)
});

on('.menu-button', 'click', () => {
  document.body.classList.add('menu-open')
})
on('.overlay', 'click', () => {
  document.body.classList.remove('menu-open')
})
on('.close-button', 'click', () => {
  document.body.classList.remove('menu-open')
})
