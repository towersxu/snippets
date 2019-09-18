document.body.onload = function () {
  document.getElementById('shadow').shadowRoot.getElementById('name').innerText = '我是demo';

  setTimeout(() => {
    document.getElementById('shadow').setAttribute('src', 'https://github.com/favicon.ico')
  }, 1000)
}