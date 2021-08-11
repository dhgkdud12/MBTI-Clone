const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector('#result');

const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //선택한 답변 배열

function calResult() {
  var result = select.indexOf(Math.max(...select));
  return result; //index 반환
}

function setResult() {

  let point = calResult(); //result값 담아줌

  const resultName = document.querySelector('.resultname'); //동물 이름
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img'); //동물 사진
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc'); //설명
  resultDesc.innerHTML = infoList[point].desc;
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
    }, 450)
  })

  setResult();
  calResult();
}

function addAnswer(answerText, qIdx, idx) {
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

  answer.addEventListener("click", function() {
    var children = document.querySelectorAll('.answerList'); //버튼 3개 모두 선택
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true; //버튼 비활성화
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animaition = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type; //선택한 답변에 해당되는 동물 담김
      for (let i = 0; i < target.length; i++) {
        select[target[i]] += 1;
      }

      // select[] = idx; //몇번째 질문에서 몇번째 버튼을 클릭했는지 담김
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450)
  }, false);
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q; //삽입, html 변경 - 질문 띄우기
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i); //답변 띄우기
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}

function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animaition = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animaition = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450)

  // main.style.display = "none";
  // qna.style.display = "block";

}
