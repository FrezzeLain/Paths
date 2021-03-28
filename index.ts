
    /* 
        Начальные переменные
    */

    let MassivOfBlocks: Array<HTMLDivElement> = []
    , RandomiseMassiv: Array<HTMLDivElement> = []
    , MainBlock: HTMLElement = document.getElementById('MainBlock')
    , BlockOfNumberValue: HTMLSelectElement = document.getElementById('NOB')
    , GenerateButton: HTMLElement = document.getElementById('Generate')
    , RandomiseButton : HTMLElement = document.getElementById('Randomise')
    , IsChoosed: boolean = false
    , CurrentId: number
    , CurrentBlock;

    /*
        Прослушивание событий
    */

    GenerateButton.addEventListener('click', () => {
        const BlockValue = BlockOfNumberValue.value;
        const Number = GetNumber(BlockValue);
        const BlockWidthAndHeight = GenerateStyles(Number);

        CreateBlocks(Number);
        GenerateBlocks(Number, BlockWidthAndHeight, MassivOfBlocks);
    });

    RandomiseButton.addEventListener('click', () => {
        RandomiseElements(MassivOfBlocks);
    });

    /*
        Функции приложения
    */

    function CreateBlocks(BlockAmount: number):void {
        for (let index = 1; index <= BlockAmount; index++) {
            
            const Div: HTMLDivElement = document.createElement('div');
            Div.className = "Image absolute";
            Div.id = `D${index}`;
            MassivOfBlocks.push(Div);
            
        }
    }

    function GenerateStyles(Num: number): number {
        if (Num === 9) return 220;
        if (Num === 16) return 165;
        if (Num === 25) return 132;
    }

    function RandomiseElements(ReadyArray: Array<HTMLDivElement>): void {

        let ElementCount = ReadyArray.length;
        let CountMassiv = [];

        for (let index = 0; index < ElementCount; index++) {
            let FLag = true;

            while (FLag) {
                let Random = RandomNumber(1, ElementCount);
                
                if(!CountMassiv.includes(Random)) {
                    CountMassiv.push(Random);
                    FLag = false;
                }
            }
        }

        CountMassiv.forEach((ID) => {

            for (let i = 0; i < MassivOfBlocks.length; i++) {
                if(MassivOfBlocks[i].id == `D${ID}`){
                    RandomiseMassiv.push(MassivOfBlocks[i]);
                    break;
                }               
            }
        });

        let Number = RandomiseMassiv.length;
        let Styles = GenerateStyles(Number);

        MainBlock.innerHTML = '';
        GenerateBlocks(Number, Styles, RandomiseMassiv);
        RandomiseButton.style.display = 'none';
        MainBlock.addEventListener('click', (e) => {
            ClickBlock(e);
        })

    }

    function ClickBlock(Event): void {
        let Block = Event.path[0];
        let ArrayId = Block.id.split('');
        ArrayId[0] = '';
        let Id = Number(ArrayId.join(''));

        if(!IsChoosed) {
            CurrentId = Id;
            CurrentBlock = Block;
            IsChoosed = !IsChoosed;
        } else if(CurrentId == Id) {
            console.log('...');
        } else{
            ChangePlace(CurrentBlock, Block);
            IsChoosed = !IsChoosed;
        }
    }

    function ChangePlace(CurrBlock, NewBlock):void {
        const DopX = NewBlock.style.left;
        const DopY = NewBlock.style.top;

        NewBlock.style.left = CurrBlock.style.left;
        NewBlock.style.top = CurrBlock.style.top;

        CurrBlock.style.left = DopX;
        CurrBlock.style.top = DopY;

    }

    function GenerateBlocks(Amount: number, WidthAndHeight: number, ReadyArray: Array<HTMLDivElement>): void {
        let index = 0;
        ReadyArray.forEach((Block) => {
            let BlockIdArray = Block.id.split('');
            BlockIdArray[0] = '';
            let BlockId = Number(BlockIdArray.join('')); 
            index += 1;
            MainBlock.append(Block);
            Block.style.width = `${WidthAndHeight}px`;
            Block.style.height = `${WidthAndHeight}px`;

            // Выяснить вертикальное положение элемента

            const AmountInRow = Math.sqrt(Amount);
            const CurrentRow = Math.floor((index - 1) / AmountInRow);
            const CurrentY = CurrentRow * WidthAndHeight;

            // Выяснить горизонтальное положение элемента

            const CurrentColumn = (index - (CurrentRow * AmountInRow)) - 1;
            const CurrentX = CurrentColumn * WidthAndHeight;

            // Присвоить положение относительно родителя

            Block.style.left = `${CurrentX}px`;            
            Block.style.top = `${CurrentY}px`;
            
            const BackX = ((BlockId - (Math.floor((BlockId - 1) / AmountInRow) * AmountInRow)) - 1) * WidthAndHeight;
            const BackY = Math.floor((BlockId - 1) / AmountInRow) * WidthAndHeight;

            Block.style.backgroundPosition = `left -${BackX}px top -${BackY}px`;

        })
    }

    function GetNumber(Value: string):number {
        if(Value == 'default') return 3 * 3; 
        if(Value == 'More') return 4 * 4; 
        if(Value == 'More+') return 5 * 5;
    }

    function RandomNumber(min:number, max:number):number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }