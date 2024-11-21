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