var StartMassiv = Array.from(document.querySelectorAll('.Image'));
var RandomNumberMassiv = [];
var IsClicked = false;
var CurrentX, CurrentY, CurrentItem, CurrentId, CurrentTurn = 1;
function RandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
StartMassiv.forEach(function (elem) {
    var Flag = false;
    while (!Flag) {
        var Random = RandomNumber(1, 9);
        if (!RandomNumberMassiv.includes(Random)) {
            elem.id = "i" + CurrentTurn;
            elem.classList.add("absolute" + Random);
            RandomNumberMassiv.push(Random);
            Flag = !Flag;
            CurrentTurn += 1;
        }
    }
});
StartMassiv.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
        Turn(e);
    });
});
function Turn(e) {
    if (!IsClicked) {
        CurrentX = e.target.offsetLeft;
        CurrentY = e.target.offsetTop;
        CurrentItem = e.target;
        CurrentId = Number(e.target.id.split('')[1]);
        IsClicked = !IsClicked;
    }
    else {
        var NewX = e.clientX;
        var NewY = e.clientY;
        var Div = document.elementFromPoint(NewX, NewY);
        var ReadyX = Div.offsetLeft + 110;
        var ReadyY = Div.offsetTop + 110;
        var LeftAcceptedX = CurrentX - 110;
        var LeftAcceptedY = CurrentY + 110;
        var TopAcceptedX = CurrentX + 110;
        var TopAcceptedY = CurrentY - 110;
        var RigAcceptedX = CurrentX + 220 + 110;
        var RigAcceptedY = CurrentY + 110;
        var BottomAcceptedX = CurrentX + 110;
        var BottomAcceptedY = CurrentY + 220 + 110;
        if ((ReadyX == LeftAcceptedX) && (ReadyY == LeftAcceptedY) || (ReadyX == TopAcceptedX) && (ReadyY == TopAcceptedY) || (ReadyX == RigAcceptedX) && (ReadyY == RigAcceptedY) || (ReadyX == BottomAcceptedX) && (ReadyY == BottomAcceptedY)) {
            CurrentItem.style.left = ReadyX - 110 + "px";
            CurrentItem.style.top = ReadyY - 110 + "px";
            Div.style.left = CurrentX + "px";
            Div.style.top = CurrentY + "px";
            var NewId = Number(Div.id.split('')[1]);
            var RememberCurrentIndex = RandomNumberMassiv.indexOf(CurrentId);
            var RememberNewIndex = RandomNumberMassiv.indexOf(NewId);
            console.log("f1 = " + CurrentId + " F2 = " + NewId);
            IsClicked = !IsClicked;
        }
    }
}
