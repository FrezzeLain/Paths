
    let StartMassiv:Array<HTMLDivElement> = Array.from(document.querySelectorAll('.Image'));
    let RandomNumberMassiv:Array<number> = [];
    let IsClicked: boolean = false;
    let CurrentX: number, CurrentY: number, CurrentItem, CurrentId: number, CurrentTurn: number = 1;

    function RandomNumber(min:number, max:number):number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    StartMassiv.forEach((elem) => {
        let Flag = false;
        while(!Flag){
            let Random = RandomNumber(1, 9);
            if(!RandomNumberMassiv.includes(Random)){
                elem.id = `i${CurrentTurn}`;
                elem.classList.add(`absolute${Random}`);
                RandomNumberMassiv.push(Random);
                Flag = !Flag;
                CurrentTurn += 1;
            }
        }
    })

    StartMassiv.forEach((elem) => {
        elem.addEventListener('click', (e:MouseEvent) => {
            Turn(e);
        })
    });

    function Turn(e:MouseEvent):void{
        if(!IsClicked){
            CurrentX = e.target.offsetLeft;
            CurrentY = e.target.offsetTop;
            CurrentItem = e.target;
            CurrentId = Number(e.target.id.split('')[1]);
            IsClicked = !IsClicked;
        } else{
            let NewX = e.clientX;
            let NewY = e.clientY;
            let Div:HTMLDivElement = document.elementFromPoint(NewX, NewY);

            let ReadyX = Div.offsetLeft + 110;
            let ReadyY = Div.offsetTop + 110;

            let LeftAcceptedX = CurrentX - 110;
            let LeftAcceptedY = CurrentY + 110;

            let TopAcceptedX = CurrentX + 110;
            let TopAcceptedY = CurrentY - 110;

            let RigAcceptedX = CurrentX + 220 + 110;
            let RigAcceptedY = CurrentY + 110;

            let BottomAcceptedX = CurrentX + 110;
            let BottomAcceptedY = CurrentY + 220 + 110;

            if((ReadyX == LeftAcceptedX)&&(ReadyY == LeftAcceptedY) || (ReadyX == TopAcceptedX)&&(ReadyY == TopAcceptedY) || (ReadyX == RigAcceptedX)&&(ReadyY == RigAcceptedY) || (ReadyX == BottomAcceptedX)&&(ReadyY == BottomAcceptedY)){

                CurrentItem.style.left = `${ReadyX - 110}px`;
                CurrentItem.style.top = `${ReadyY - 110}px`;

                Div.style.left = `${CurrentX}px`;
                Div.style.top = `${CurrentY}px`;

                let NewId = Number(Div.id.split('')[1]);

                let RememberCurrentIndex = RandomNumberMassiv.indexOf(CurrentId);
                let RememberNewIndex = RandomNumberMassiv.indexOf(NewId);

                console.log(`f1 = ${CurrentId} F2 = ${NewId}`);

                IsClicked = !IsClicked;
            }
        }
    }