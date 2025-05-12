// import { Component, OnInit } from '@angular/core';
// import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
// import { io } from 'socket.io-client';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-code-game',
//   standalone: true,
//   imports: [FormsModule,CommonModule,DragDropModule],
//   templateUrl: './code-game.component.html',
//   styleUrl: './code-game.component.css'
// })
// export class CodeGameComponen implements OnInit {
//   questionId=''
//   codeBlocks:string[]=[]
//  leaderboard: { [socketId: string]: { name: string; score: number } } = {};

//   socket=io('');

//   timer=30;
//   intervalId:any
//   roundActive:boolean=false

//   playerName=''
//   joined=false

// ngOnInit(): void {
//   this.socket=io('http://localhost:3000');

//   this.socket.on('newQuestion',(data)=>{
//   this.codeBlocks=data.question;
//   this.questionId=data.id;
//   this.startRound()
//   });

//   this.socket.on('codeResult',(data)=>{
//         alert(data.message)
//       })

//       this.socket.on('leaderboardUpdate',(data)=>{
//       this.leaderboard=data
//       })

//   }

//     startRound(){
//       this.roundActive=true
//         this.intervalId=setInterval(()=>{
//           this.timer--;
//           if(this.timer===0){
//             clearInterval(this.intervalId);
//             this.roundActive=false;
//             alert("TIMES UP!!")
//           }
//         },1000)
//     }

//     drop(event:CdkDragDrop<string[]>){
//       moveItemInArray(this.codeBlocks,event.previousIndex,event.currentIndex);
//     }


//     submitCode(){

//       if (!this.roundActive) {
//     alert("⛔ Round over!");
//     return;
//   }
//       const joinedcode=this.codeBlocks.join(' ');
//       this.socket.emit('submitCode',{
//         code:joinedcode,
//         questionId:this.questionId}
//       );

      

//       this.socket.on('winner',(data)=>{
//         console.log("winner is",data.id);
//       })

//       clearInterval(this.intervalId);
//       this.roundActive = false;
//     }

//     joinGame(){
//       if(!this.playerName.trim()){
//         alert("Please enter your Name");
//         return;
//       }
//       this.socket.emit('joinGame',this.playerName);
//       this.joined=true;
//     }

// }


//add room match
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-code-game',
  standalone: true,
  imports: [FormsModule,CommonModule,DragDropModule],
  templateUrl: './code-game.component.html',
  styleUrl: './code-game.component.css'
})
export class CodeGameComponen implements OnInit {
  questionId=''
  codeBlocks:string[]=[]
 leaderboard: { [socketId: string]: { name: string; score: number } } = {};

  socket=io('');

  timer=30;
  intervalId:any
  roundActive:boolean=false

  playerName=''
  joined=false

  roomId:string=''
  roomCreatedMessage=''

ngOnInit(): void {
  this.socket = io('http://localhost:3000');

  this.socket.on('newQuestion', (data) => {
    this.codeBlocks = data.question;
    this.questionId = data.id;
    this.startRound();
  });

  this.socket.on('codeResult', (data) => {
    alert(data.message);
  });

  this.socket.on('leaderboardUpdate', (data) => {
    this.leaderboard = data;
  });

  this.socket.on('winner', (data) => {
    console.log("🏆 Winner is", data.id);
  });
}


    startRound(){
      this.roundActive=true
        this.intervalId=setInterval(()=>{
          
          if(this.timer>0){
            this.timer--
          }
            else{
            clearInterval(this.intervalId);
            this.roundActive=false;
            alert("TIMES UP!!")
          }
        },1000)
    }

    drop(event:CdkDragDrop<string[]>){
      moveItemInArray(this.codeBlocks,event.previousIndex,event.currentIndex);
    }


    submitCode(){

      if (!this.roundActive) {
    alert("⛔ Round over!");
    return;
  }
      const joinedcode=this.codeBlocks.join(' ');
      this.socket.emit('submitCode',{
        code:joinedcode,
        questionId:this.questionId}
      );

      

      this.socket.on('winner',(data)=>{
        console.log("winner is",data.id);
      })

      clearInterval(this.intervalId);
      this.roundActive = false;
    }
createRoom() {
  if (!this.playerName.trim()) {
    alert("Please enter your name");
    return;
  }
  if (!this.roomId.trim()) {
    this.roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  this.socket.emit('createRoom', { roomId: this.roomId, name: this.playerName });
  this.joined = true;
}

joinRoom() {
  if (!this.playerName.trim() || !this.roomId.trim()) {
    alert("Please enter your name and room ID");
    return;
  }
  this.socket.emit('joinRoom', { roomId: this.roomId, name: this.playerName });
  this.joined = true;
}
}

