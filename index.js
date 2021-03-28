/*
    Начальные переменные
*/
var MassivOfBlocks = [], RandomiseMassiv = [], MainBlock = document.getElementById('MainBlock'), BlockOfNumberValue = document.getElementById('NOB'), GenerateButton = document.getElementById('Generate'), RandomiseButton = document.getElementById('Randomise'), IsChoosed = false, CurrentId, CurrentBlock;
/*
    Прослушивание событий
*/
GenerateButton.addEventListener('click', function () {
    var BlockValue = BlockOfNumberValue.value;
    var Number = GetNumber(BlockValue);
    var BlockWidthAndHeight = GenerateStyles(Number);
    CreateBlocks(Number);
    GenerateBlocks(Number, BlockWidthAndHeight, MassivOfBlocks);
});
RandomiseButton.addEventListener('click', function () {
    RandomiseElements(MassivOfBlocks);
});
/*
    Функции приложения
*/
function CreateBlocks(BlockAmount) {
    for (var index = 1; index <= BlockAmount; index++) {
        var Div = document.createElement('div');
        Div.className = "Image absolute";
        Div.id = "D" + index;
        MassivOfBlocks.push(Div);
    }
}
function GenerateStyles(Num) {
    if (Num === 9)
        return 220;
    if (Num === 16)
        return 165;
    if (Num === 25)
        return 132;
}
function RandomiseElements(ReadyArray) {
    var ElementCount = ReadyArray.length;
    var CountMassiv = [];
    for (var index = 0; index < ElementCount; index++) {
        var FLag = true;
        while (FLag) {
            var Random = RandomNumber(1, ElementCount);
            if (!CountMassiv.includes(Random)) {
                CountMassiv.push(Random);
                FLag = false;
            }
        }
    }
    CountMassiv.forEach(function (ID) {
        for (var i = 0; i < MassivOfBlocks.length; i++) {
            if (MassivOfBlocks[i].id == "D" + ID) {
                RandomiseMassiv.push(MassivOfBlocks[i]);
                break;
            }
        }
    });
    var Number = RandomiseMassiv.length;
    var Styles = GenerateStyles(Number);
    MainBlock.innerHTML = '';
    GenerateBlocks(Number, Styles, RandomiseMassiv);
    RandomiseButton.style.display = 'none';
    MainBlock.addEventListener('click', function (e) {
        ClickBlock(e);
    });
}
function ClickBlock(Event) {
    var Block = Event.path[0];
    var ArrayId = Block.id.split('');
    ArrayId[0] = '';
    var Id = Number(ArrayId.join(''));
    if (!IsChoosed) {
        CurrentId = Id;
        CurrentBlock = Block;
        IsChoosed = !IsChoosed;
    }
    else if (CurrentId == Id) {
        console.log('...');
    }
    else {
        ChangePlace(CurrentBlock, Block);
        IsChoosed = !IsChoosed;
    }
}
function ChangePlace(CurrBlock, NewBlock) {
    var DopX = NewBlock.style.left;
    var DopY = NewBlock.style.top;
    NewBlock.style.left = CurrBlock.style.left;
    NewBlock.style.top = CurrBlock.style.top;
    CurrBlock.style.left = DopX;
    CurrBlock.style.top = DopY;
}
function GenerateBlocks(Amount, WidthAndHeight, ReadyArray) {
    var index = 0;
    ReadyArray.forEach(function (Block) {
        var BlockIdArray = Block.id.split('');
        BlockIdArray[0] = '';
        var BlockId = Number(BlockIdArray.join(''));
        index += 1;
        MainBlock.append(Block);
        Block.style.width = WidthAndHeight + "px";
        Block.style.height = WidthAndHeight + "px";
        // Выяснить вертикальное положение элемента
        var AmountInRow = Math.sqrt(Amount);
        var CurrentRow = Math.floor((index - 1) / AmountInRow);
        var CurrentY = CurrentRow * WidthAndHeight;
        // Выяснить горизонтальное положение элемента
        var CurrentColumn = (index - (CurrentRow * AmountInRow)) - 1;
        var CurrentX = CurrentColumn * WidthAndHeight;
        // Присвоить положение относительно родителя
        Block.style.left = CurrentX + "px";
        Block.style.top = CurrentY + "px";
        var BackX = ((BlockId - (Math.floor((BlockId - 1) / AmountInRow) * AmountInRow)) - 1) * WidthAndHeight;
        var BackY = Math.floor((BlockId - 1) / AmountInRow) * WidthAndHeight;
        Block.style.backgroundPosition = "left -" + BackX + "px top -" + BackY + "px";
    });
}
function GetNumber(Value) {
    if (Value == 'default')
        return 3 * 3;
    if (Value == 'More')
        return 4 * 4;
    if (Value == 'More+')
        return 5 * 5;
}
function RandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
