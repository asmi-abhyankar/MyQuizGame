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
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    fill ("black");
    textSize(35);
    text ("Result of the Quiz",300,30);
    //call getPlayerInfo() here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("blue")
      textSize(20)
      text("*NOTE: Contestant who answered correctly are highlighted in green ",100,250)
    }
    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2"
      if (correctAns=== allContestants[plr].answer)
        fill("Green");
      else
        fill("red");
    }
  }

}
