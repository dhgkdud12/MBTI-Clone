const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

function addAnswer(answerText, qIdx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button'); //변수 answer에 버튼 만듦
  answer.classList.add('answerList'); //클래스나 id값이 없어서 querySelector로 선택할 수 없음, answerList라는 클래스값 넣어줌
  a.appendChild(answer); //a에 소속될 수 있도록 관계만듦
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList'); //버튼 3개 모두 선택
    for(let i=0; i<children.length; i++){
      children[i].disabled = true; //버튼 비활성화
      children[i].style.display = 'none';
    }
    goNext(++qIdx);
  }, false);
}

function goNext(qIdx){
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q; //삽입, html 변경 - 질문 띄우기
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer ,qIdx); //답변 띄우기
  }
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
  }, 450);

  // main.style.display = "none";
  // qna.style.display = "block";

}
