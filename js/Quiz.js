class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question();
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    

    //write code to change the background color here
    background("yellow");
    

    //write code to show a heading for showing the result of Quiz
    textSize(30);
    textAlign(CENTER);
    fill("black");
    text("RESULT OF THE QUIZ", 850/2, 50);

    //dotted line
   for (var i =0; i < 300; i+=50) {
     line(285+i, 60, 325+i, 60);
   }
    
    

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined) {
      fill("blue");
      textSize(20);
      textAlign(LEFT)
      text("*Note: Contestant who answered correct is highlighted in green color", 130, 230);
    //write code to highlight contest who answered correctly
    var yIncrement = 260;
    for(var cont in allContestants) {
      
      if(allContestants[cont].answer === "2") {
      fill("green");
      }
      else {
      fill("red");
      }
      
      text(allContestants[cont].name + " answered:" + allContestants[cont].answer, 150, yIncrement);
      yIncrement += 20;
    }
   
      
      console.log(yIncrement);
   
  }
    
  }

}
