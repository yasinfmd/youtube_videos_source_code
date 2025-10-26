const moles=document.querySelectorAll('.mole');
const scoreDisplay=document.getElementById('score');
const levelDisplay=document.getElementById('level');
let score=0;
let level=1;
let speed=1000;
let hideTimeout;

function randomMole(){
    const randomIndex=Math.floor(Math.random()*moles.length);
    const mole=moles[randomIndex];
    return mole;
}


function showMole(){
    const mole=randomMole();
    mole.classList.add('up');
    hideTimeout=setTimeout(()=>{
        mole.classList.remove('up');
        if(level<=5){
            showMole();
        }
    },speed);
}

moles.forEach(mole=>{
    mole.addEventListener('click',()=>{
        if(mole.classList.contains('up')){
            score++;
            scoreDisplay.textContent=score;
            mole.classList.remove('up');

            if(score%5===0){
                level++;
                levelDisplay.textContent=level;
                speed=Math.max(400,speed-100);
                clearTimeout(hideTimeout);
                showMole();
            }
        }else{
            score=Math.max(0,score-1);
            scoreDisplay.textContent=score;
        }
    });
});

showMole(); 