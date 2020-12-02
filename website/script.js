/******************************************
 scripts.js
 modeled from: https://www.learnwithjason.dev/blog/get-form-values-as-json/
 Note: We skipped step 5 because we opted to not seperate data out into arrays,
        ideally we would seperate everything out
*****************************************/
function setup() {
  console.log('running');

  var button = select('#submit');
  button.mousePressed(submitWord);
}

function submitWord() {


  var word1 = select('#Book1').value();
  var score1 = select('#Book1-Rating').value();
  loadJSON('add/' + word1 + '/' + score1, finished);

  var word2 = select('#Book2').value();
  var score2 = select('#Book2-Rating').value();
  loadJSON('add/' + word2 + '/' + score2, finished);

  var word3 = select('#Book3').value();
  var score3 = select('#Book3-Rating').value();
  loadJSON('add/' + word3 + '/' + score3, finished);

  var word4 = select('#Book4').value();
  var score4 = select('#Book4-Rating').value();
  loadJSON('add/' + word4 + '/' + score4, finished);
 
  var word5 = select('#Book5').value();
  var score5 = select('#Book5-Rating').value();
  loadJSON('add/' + word5 + '/' + score5, finished);

  var word6 = select('#Book6').value();
  var score6 = select('#Book6-Rating').value();
  loadJSON('add/' + word6 + '/' + score6, finished);

  var word7 = select('#Book7').value();
  var score7 = select('#Book7-Rating').value();
  loadJSON('add/' + word7 + '/' + score7, finished);

  var word8 = select('#Book8').value();
  var score8 = select('#Book8-Rating').value();
  loadJSON('add/' + word8 + '/' + score8, finished);

  var word9 = select('#Book9').value();
  var score9 = select('#Book9-Rating').value();
  loadJSON('add/' + word9 + '/' + score9, finished);

  function finished(err) {
    console.log("success");
  }
}