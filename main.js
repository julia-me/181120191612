const sendCommentBtn = document.getElementsByClassName("comment__button")[0];
const commentValue = document.querySelector(".comment__add");
const container = document.querySelector(".feedbacks__content");

function runOnKeys(func) {
  var codes = [].slice.call(arguments, 1);
  var pressed = {};
  document.onkeydown = function(e) {
    e = e || window.event;
    pressed[e.keyCode] = true;
    for (var i = 0; i < codes.length; i++) {
      if (!pressed[codes[i]]) {
        return;
      }
    }
    pressed = {};
    func();
  };

  document.onkeyup = function(e) {
    e = e || window.event;
    delete pressed[e.keyCode];
  };
}

const sendCommentHendler = () => {
  let reg = new RegExp('([^\\s*]+)','g')
  var found = commentValue.value.match(reg);
  if (commentValue.value.length && found) {
    let newDate = new Date().toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    let correctDate = newDate
      .split("")
      .splice(0, newDate.length - 2)
      .join("");
    container.innerHTML += `
        <div class="feedbacks__content-item">
        <p class="feedbacks__content-item-person-info"> Новый пользователь <span> ${correctDate} </span></p>
        <div class="feedbacks__content-item-comment">
            <p> ${commentValue.value} </p>
        </div>
        </div>
        `;
    return (commentValue.value = "");
  }
};

runOnKeys(sendCommentHendler, 13, 17);

sendCommentBtn.addEventListener("click", function() {
  sendCommentHendler();
});
