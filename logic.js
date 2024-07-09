const toes=document.querySelectorAll(".toe_box");

const player1=document.getElementById('player-1');
const player2=document.getElementById('player-2');
const dialog_modal=document.getElementById('modal1');

let active_player="player-1";
check_active_player_label();


let player_1_toes=[];
let player_2_toes=[];

let win_conditions=[
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['1','4','7'],
    ['2','5','8'],
    ['3','6','9'],
    ['1','5','9'],
    ['3','5','7']
];

for(i=0;i<toes.length;i++){
    toes[i].textContent=" ";
    toes[i].addEventListener('click',function() {
        toe_clicked(this.id);
    });
    console.log("added events");
}

function toe_clicked(id){
    if(player_1_toes.includes(id) || player_2_toes.includes(id)){
        return(null);
    }

    console.log("pressed ",Number(id)," by ",active_player);


    if (active_player=="player-1"){
        player_1_toes.push(id);
        toes[Number(id)-1].textContent="X";

        check_win_conditions(player_1_toes);
    }
    else if(active_player=="player-2"){
        player_2_toes.push(id);
        toes[Number(id)-1].textContent="O";
        check_win_conditions(player_2_toes);
    }
    console.log(player_1_toes,player_2_toes);

    check_tie_conditions();
    

    toggle_active_player();
    check_active_player_label();
}

function check_active_player_label(){
    if(active_player=="player-1"){
        if(!player1.classList.contains('active')){
            player1.classList.add('active');
        }
        if(player2.classList.contains('active')){
            player2.classList.remove('active');
        }
    }
    else if(active_player=="player-2"){
        if(!player2.classList.contains('active')){
            player2.classList.add('active');
        }
        if(player1.classList.contains('active')){
            player1.classList.remove('active');
        }
    }
}

function toggle_active_player(){
    if(active_player=="player-1"){
        active_player="player-2";
    }
    else if(active_player=="player-2"){
        active_player="player-1";
    }
}

function check_win_conditions(player_toes){
    for(i=0;i<=7;i++){
        if(player_toes.includes(win_conditions[i][0]) && player_toes.includes(win_conditions[i][1]) && player_toes.includes(win_conditions[i][2])){
            console.log(active_player," wins");
            dialog_modal.firstElementChild.textContent=`${active_player.toUpperCase()} Won `;
            dialog_modal.showModal();
            toggle_active_player();
            return(1);
        }
    }
    return(0);
}

function check_tie_conditions(){
    if((player_1_toes.length + player_2_toes.length)==9){
        dialog_modal.firstElementChild.textContent="Its a tie";
        dialog_modal.showModal();
    }
}

function play_again(){
    console.log("play again");
    dialog_modal.close();
    player_1_toes=[];
    player_2_toes=[];
    for(i=0;i<toes.length;i++){
        toes[i].textContent=" ";
    }
    active_player="player-1";
    check_active_player_label();
}
// dialog_modal.showModal();