fetch('./data.json').then(res => res.json()).then(data => main(data));

function main(data) {
  document.body.innerText = JSON.stringify(data);
}