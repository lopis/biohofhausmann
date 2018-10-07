console.log('Hello. I see you love digging too. Our vegetables are grown with love and care. Thank you for checking our website. :)')

function _(query) {
  return document.querySelector(query)
}

function __(query) {
  return document.querySelectorAll(query)
}

function on(selector, event, callack) {
  _(selector).addEventListener(event, callack)
}

function updateMenu() {
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0)

  const top = document.documentElement.scrollTop / vh

  if (top > 0.3) {
    _('.menu').classList.add('sticky')
  } else if (top < 0.1) {
    _('.menu').classList.remove('sticky')
  }

  _('.landing-page').style.setProperty(
    'transform',
    `translateY(${top*30}vh)`
  )
}

function findTableCellSection(element) {
  return element.parentNode
    .parentNode
    .parentNode
    .parentNode
}

function createAnchor(href, label, title) {
  $anchor = document.createElement('a')
  $anchor.setAttribute('href', href)
  $anchor.setAttribute('title', title)
  $anchor.innerText = label

  return $anchor
}

function generateMenu() {
  __('section table td').forEach(e => {
    const linkText = e.innerText
    const header = findTableCellSection(e).querySelector('h2')
    const link = `#${header.getAttribute('id')}`
    const title = header.innerText

    const $anchor = createAnchor(link, linkText, title)
    const $li = document.createElement('li')
    $li.appendChild($anchor)
    _('.menu ul').append($li)
  })
}

window.addEventListener('scroll', updateMenu)
updateMenu()
generateMenu()

on('.menu-button', 'click', () => {
  document.body.classList.add('menu-open')
})
on('.overlay', 'click', () => {
  document.body.classList.remove('menu-open')
})
on('.close-button', 'click', () => {
  document.body.classList.remove('menu-open')
})
