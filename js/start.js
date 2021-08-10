const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector('#result');
const endPoint = 12;
const select = []; //선택한 답변 배열

function calResult() {
  var pointArray = [
    {name: 'mouse', value:0, key:0},
    {name: 'cow', value:0, key:1},
    {name: 'tiger', value:0, key:2},
    {name: 'rabbit', value:0, key:3},
    {name: 'dragon', value:0, key:4},
    {name: 'snake', value:0, key:5},
    {name: 'horse', value:0, key:6},
    {name: 'sheep', value:0, key:7},
    {name: 'monkey', value:0, key:8},
    {name: 'chick', value:0, key:9},
    {name: 'dog', value:0, key:10},
    {name: 'pig', value:0, key:11},
  ]

  for(let i = 0; i < endPoint; i++){
    var target = qnaList[i].a[select[i]]; //선택한 답변에 해당되는 동물 담김
    for (let j=0;j<target.type.length; j++){
      for(let k=0;k<pointArray.length;k++){
        if(target.type[j] === pointArray[k].name){
          pointArray[k].value += 1; //가중치 증가
        }
      }
    }

  }
  var resultArray = pointArray.sort(function (a,b){
    if(a.value > b.value){
      return -1;
    }
    if (a.value < b.value){
      return 1;
    }
    return 0;
  });

  console.log(resultArray);
  let resultword = resultArray[0].key;
  return resultword;

}
function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animaition = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animaition = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    },450)})

    console.log(select);
    calResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button'); //변수 answer에 버튼 만듦
  answer.classList.add('answerList'); //클래스나 id값이 없어서 querySelector로 선택할 수 없음, answerList라는 클래스값 넣어줌
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('px-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer); //a에 소속될 수 있도록 관계만듦
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList'); //버튼 3개 모두 선택
    for(let i=0; i<children.length; i++){
      children[i].disabled = true; //버튼 비활성화
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animaition = "fadeOut 0.5s";
    }
    setTimeout(() => {
      select[qIdx] = idx; //몇번째 질문에서 몇번째 버튼을 클릭했는지 담김
      for(let i = 0; i< children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
  }
  
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q; //삽입, html 변경 - 질문 띄우기
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer ,qIdx, i); //답변 띄우기
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint)*(qIdx+1)+ '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animaition = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animaition = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    },450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450)

  // main.style.display = "none";
  // qna.style.display = "block";

}
