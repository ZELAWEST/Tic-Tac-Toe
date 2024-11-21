const Gameboard = function () {

    const board = []
  
    for (let row = 0; row < 3; row++) {
      board[row] = []
      for (let col = 0; col < 3; col++) {
        board[row].push(Cell())
  
      }
    }
    const dropToken = function (rows, cols, player) {
  
  
      if (board[rows][cols].getValue() === '') {
        board[rows][cols].addToken(player)
  
      }
    }
    const getBoard = function () {
      return board
    }
    const printBoard = function () {
      const boardWithCellValues = board.map((rows) => rows.map(item => item.getValue()))
  
      console.log(boardWithCellValues)
    }
  
    return {
      getBoard,
      printBoard,
      dropToken
    }
  }
  const Cell = function () {
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
  const Players = function () {
    let name = ''
    let token = 0
  
    const setName = function (playername) {
      name = playername
  
    }
    const getName = function () {
      return name
    }
    const setToken = function (playertoken) {
      token = playertoken
    }
    const getToken = function () {
      return token
    }
  
    return {
      setName,
      getName,
      setToken,
      getToken
    }
  }
  const GameController = function () {


    const winnerMessage = document.getElementById('massage')
    const modal = document.getElementById('winnerDialog')
    const closeModalBUtton = document.getElementById('close')
    const playerName = document.getElementById('playerName')
    const playerOne = document.querySelector('#player1')
    const playerTwo = document.querySelector('#player2')
  
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
    const board = Gameboard();


    const player1 = Players();
    const player2 = Players();
  
  
    player1.setName(playerOne.value)
    player1.setToken('X')
    player2.setName(playerTwo.value)
    player2.setToken('O')
  
    const players = [player1, player2]
    const getCellsArray = function () {
      let cells = []
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
  
  
          cells.push(winner[i][j])
  
        }
  
      }
      return cells
    }
}