fetch1('./data.json', {
  method: 'GET'
})
.then(function(res) {
  console.log(res)
})
.catch(function (e) {
  console.log(e);
})