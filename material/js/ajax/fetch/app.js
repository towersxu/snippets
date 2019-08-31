fetch1('./data.json', {
  method: 'GET'
})
.then(function (response) {
  return response.json();
})
.then(function (myJson) {
  console.log(myJson);
})
.catch(function (e) {
  console.log(e);
})