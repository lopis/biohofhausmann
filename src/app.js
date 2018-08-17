require('./style.scss')

console.log('Hello. I see you love digging too. Our vegetables are grown with love and care. Thank you for checking our website. :)')

window.addEventListener('scroll', function(e) {
  var vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0)

  if (window.scrollY > (0.5 * vh - 100)) {
    document.querySelector('.header').classList.add('sticky')
  } else {
    document.querySelector('.header').classList.remove('sticky')
  }

});
