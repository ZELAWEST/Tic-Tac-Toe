const cell = function () {
  let value = ''
  const addToken = function (player) {
    value = player
  }
  const getValue = function () {
    return value
  }
  return {
    addToken,
    getValue
  }
}


const gameBoard = (function () {

  const board = []

  for (let row = 0; row < 3; row++) {
    board[row] = []
    for (let col = 0; col < 3; col++) {
      board[row].push(cell())

    }

  }

  const dropToken = function (colunm, player) {


    if (board[colunm[0]][colunm[1]].getValue() === '') {
      board.forEach((item) => item.forEach(it => console.log(it.getValue())))
      board[colunm[0]][colunm[1]].addToken(player)
      printBoard()
    }
  }
  const getBoard = function () {
    return board
  }
  const printBoard = function () {
    let boardWithCellValues = board.map((rows) => rows.map(col => col.getValue()))


    console.log(boardWithCellValues)
  }

  return {
    getBoard,
    printBoard,
    dropToken
  }
})()


const gameController = (function () {


  const winnerMessage = document.getElementById('massage')
  const modal = document.getElementById('winnerDialog')
  const closeModalBUtton = document.getElementById('close')
  const playerName = document.getElementById('playerName')


  const winner = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]]
  ]





  const players = [
    {
      name: '',
      token: 'O'
    },
    {
      name: '',
      token: 'X'
    }
  ];

  const currentPlayers = function () {
    return players
  }

  const getCellsArray = function () {
    let cells = []
    for (let i = 0; i < 3; i++) {

      for (let j = 0; j < 3; j++) {


        cells.push(winner[i][j])

      }

    }
    return cells
  }

  let activePlayer = players[0];

  const switchPlayerTurn = () => {


    return activePlayer = activePlayer === players[0] ? players[1] : players[0]

  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameBoard.printBoard();
    switchPlayerTurn()

    console.log(`${getActivePlayer().name}'s turn.`);
    winnerMessage.textContent = getActivePlayer().name
  }

  const playRound = (column) => {



    console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column}...`

    );


    gameBoard.dropToken(getCellsArray()[column], getActivePlayer().token);


    printNewRound()

  }
  //check for a draw
  const checkTie = function (currentPlayer, theBoard) {
    playerName.textContent = ''
    for (let i = 0; i < winner.length; i++) {
      const [a, b, c] = winner[i]

      if ((theBoard[a[0]][a[1]].getValue() !== currentPlayer.token || theBoard[a[0]][a[1]].getValue() === '') &&
        (theBoard[b[0]][b[1]].getValue() !== currentPlayer.token || theBoard[b[0]][b[1]].getValue() === '') &&
        (theBoard[c[0]][c[1]].getValue() !== currentPlayer.token || theBoard[c[0]][c[1]].getValue() === '')) {
        return false
      }
    }
    return true
  }


  //check for a win
  const checkWinner = function (currentPlayer, theBoard) {
    for (let i = 0; i < winner.length - 1; i++) {
      const [a, b, c] = winner[i]



      if (theBoard[a[0]][a[1]].getValue() === currentPlayer.token &&
        theBoard[b[0]][b[1]].getValue() === currentPlayer.token &&
        theBoard[c[0]][c[1]].getValue() === currentPlayer.token) {



        return true
      }
    }
    return false
  }

  const showWinnerDialog = function () {

    if (checkWinner(getActivePlayer(), gameBoard.getBoard())) {
      console.log(getActivePlayer().token)

      console.log(winnerMessage)
      winnerMessage.textContent = `The winner of the game is `
      playerName.textContent = ` ${getActivePlayer().name}`
      modal.showModal()
      return true
    } else if (checkTie(getActivePlayer(), gameBoard.getBoard())) {

      winnerMessage.textContent = `The game ends in a draw`
      modal.showModal()
      return true

    } else {
      switchPlayerTurn()
    }
    closeModalBUtton.addEventListener('click', () => {
      modal.close()
    })
  }



  printNewRound();

  return {
    playRound,
    getActivePlayer,
    showWinnerDialog,
    switchPlayerTurn,
    currentPlayers
  };
})()



const screenController = (function () {
  let activePlayer = ''

  const playerTurnDiv = document.querySelector('.current')
  const boardDiv = document.querySelector('.board')


  if (gameController.currentPlayers()[0].name === '' || gameController.currentPlayers()[1] === 0) {
    boardDiv.style.pointerEvents = 'none'
  }




  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn

    activePlayer = gameController.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    // Render board squares
    gameBoard.printBoard()
    let index = 0

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellButton = document.createElement("button");
        cellButton.setAttribute('id', index++)
        cellButton.setAttribute('class', 'button')
        cellButton.style.setProperty('--shadowColor', getRandomColor())
        cellButton.classList.add("cell");
        let cell = gameBoard.getBoard()
        cellButton.textContent = cell[i][j].getValue()
        cellButton.addEventListener('click', (e) => {
          clickHandlerBoard(e)
        })
        boardDiv.appendChild(cellButton)
      }

    }

  }
  const getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.id;
    console.log(selectedColumn)
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn) return;

    gameController.playRound(selectedColumn);
    gameController.switchPlayerTurn()

    if (gameController.showWinnerDialog()) {
      gameBoard.getBoard().forEach(item => item.forEach(i => {
        i = ''
      }))
      boardDiv.style.pointerEvents = "none"


    }




    updateScreen()

  }

  const returnCellDiv = function () {
    return boardDiv
  }

  updateScreen();



  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  return {
    returnCellDiv,
    clickHandlerBoard
  }
})()
const StartGame = (function () {

  const player1 = document.getElementById('player1')
  const player2 = document.getElementById('player2')
  console.log(player1)


  // if (player1.value === '' || player2.value === '') {
  //   return
  // } else {


  console.log(gameController.currentPlayers()[0].name)
  const startButton = document.querySelector('.start')

  startButton.addEventListener('click', function () {

    gameController.currentPlayers()[0].name = player1.value
    gameController.currentPlayers()[1].name = player2.value


    gameBoard.getBoard().forEach(row => row.forEach(col => col.addToken('')))
    for (let i = 0; i < screenController.returnCellDiv().children.length; i++) {
      screenController.returnCellDiv().children.item(i).textContent = ''


    }


    gameBoard.printBoard()

    document.querySelector('#player1').value = ''
    document.querySelector('#player2').value = ''
    if (gameController.currentPlayers()[0].name === '' || gameController.currentPlayers()[1] === 0) {
      screenController.returnCellDiv().style.pointerEvents = 'none'
    } else {
      screenController.returnCellDiv().style.pointerEvents = 'auto'
    }



  })
  
})()
