import { useRef } from 'react';
import game from './images/snake&ladder.jpg'
import dice1 from './images/1.png'
import dice2 from './images/2.png'
import dice3 from './images/3.png'
import dice4 from './images/4.png'
import dice5 from './images/5.png'
import dice6 from './images/6.png'
import diceRoll from './images/diceroll.gif'
import { useState } from 'react';


const Game = () => {

    let dicePic =  useRef();

    let[previousPlayer1 , setpreviousPlayer1] = useState(null);
    let[previousPlayer2 , setpreviousPlayer2] = useState(0);
    let[player , setPlayer] = useState(1);
    let snake_ladder = { 1:38 , 4:14 , 8:30 , 21:42 , 28:76 , 50:67 , 71:92 , 80:99,
                        97:78 , 95:56 , 88:24 , 62:18 , 48:26 , 36:6 , 32:10};



    let box =  [100,99,98,97,96,95,94,93,92,91,
                81,82,83,84,85,86,87,88,89,90,
                80,79,78,77,76,75,74,73,72,71,
                61,62,63,64,65,66,67,68,69,70,
                60,59,58,57,56,55,54,53,52,51,
                41,42,43,44,45,46,47,48,49,50,
                40,39,38,37,36,35,34,33,32,31,
                21,22,23,24,25,26,27,28,29,30,
                20,19,18,17,16,15,14,13,12,11,
                1,2,3,4,5,6,7 ,8,9,10]

    
    let GameStarts = ()=>{
        setpreviousPlayer1(0);
        let boxes = document.getElementsByClassName("1");
        let x = boxes[0].getBoundingClientRect();
        document.getElementById("player1").style.top = `${x.top-70}px`;
        document.getElementById("player1").style.left = `${x.left-70}px`;

        document.getElementById("player2").style.top = `${x.top-70}px`;
        document.getElementById("player2").style.left = `${x.left-80}px`;
    }

    let display = (box)=>{
        if(player==1)
        {
            let boxes = document.getElementsByClassName(box+previousPlayer1);
            console.log(boxes[0]);
            let x = boxes[0].getBoundingClientRect()
    
            document.getElementById("player1").style.top = `${x.top-90}px`;
            document.getElementById("player1").style.left = `${x.left}px`;
            setpreviousPlayer1(previousPlayer1 + box);
            box==6 ? setPlayer(1): setPlayer(2);

            let c = box+previousPlayer1;

            setTimeout(()=>{
                if(snake_ladder[c] != undefined )
                {
                    
                    let boxes = document.getElementsByClassName(snake_ladder[c]);
                    let x = boxes[0].getBoundingClientRect()
            
                    document.getElementById("player1").style.top = `${x.top-90}px`;
                    document.getElementById("player1").style.left = `${x.left}px`;
                    setpreviousPlayer1(snake_ladder[c]);
                }
            } , 500)
        }
        else
        {
            let boxes = document.getElementsByClassName(box+previousPlayer2);
            console.log(boxes[0]);
            let x = boxes[0].getBoundingClientRect()
    
            document.getElementById("player2").style.top = `${x.top-90}px`;
            document.getElementById("player2").style.left = `${x.left}px`;
            setpreviousPlayer2(previousPlayer2 + box);
            box==6 ? setPlayer(2): setPlayer(1);

            let c = box+previousPlayer2;

            setTimeout(()=>{
                if(snake_ladder[c] != undefined )
                {
                    
                    let boxes = document.getElementsByClassName(snake_ladder[c]);
                    let x = boxes[0].getBoundingClientRect()
            
                    document.getElementById("player2").style.top = `${x.top-90}px`;
                    document.getElementById("player2").style.left = `${x.left}px`;
                    setpreviousPlayer2(snake_ladder[c]);
                }
            } , 500)
        }
        
    }

    let displayDice = (val)=>
    {
        let pic = { 1:dice1 , 
                    2:dice2 , 
                    3:dice3 ,
                    4:dice4 ,
                    5:dice5,
                    6:dice6
                }
        dicePic.current.src = diceRoll;

        setTimeout(()=>{
            dicePic.current.src = pic[val];
        } , 500)

    }

    let rollDice = ()=>{
        let val = Math.floor(Math.random() * (7 - 1)) + 1;
        val = val;
        display(val);
        displayDice(val);
    }



    return ( 
    <section>

        <h1>Snake and Ladder</h1>
        <hr />

        <div id="gamepad">
            <div id="pad">
                {
                    box.map((val)=>{
                        return( 
                        <div className={`box ${val}`}>
                            {val}            
                        </div> )
                    })
                }
                
            </div>

            <div id="pic">
                <img src={game} alt="game"/>
            </div> 

            <div id="players">
                <div id="player1"></div>
                <div id="player2"></div>
            </div>

        </div>

        
        <div id="controls">
            {previousPlayer1!=null && <button onClick={rollDice}> roll </button>}
            {previousPlayer1==null && <button onClick={GameStarts}> start </button>} 
        </div>

        <div id="dice">
            <img src={dice1} alt="dice" ref={dicePic} />
        </div>


    </section> );
}
export default Game