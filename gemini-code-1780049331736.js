let chessBoard = null;
let selectedSquare = null;
let chessGameMode = null;
let chessHistory = [];

const pieces = {
  'P': '♟', 'N': '♞', 'B': '♝', 'R': '♜', 'Q': '♛', 'K': '♚',
  'p': '♙', 'n': '♘', 'b': '♗', 'r': '♖', 'q': '♕', 'k': '♔'
};

function initChess() {
  chessBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];
  selectedSquare = null;
  chessHistory = [];
}

function renderChessBoard() {
  let boardHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isLight = (row + col) % 2 === 0;
      const piece = chessBoard[row][col];
      const squareClass = isLight ? 'light' : 'dark';
      const isSelected = selectedSquare && selectedSquare.row === row && selectedSquare.col === col;
      const validMoves = selectedSquare ? getValidMoves(selectedSquare.row, selectedSquare.col) : [];
      const isValidMove = validMoves.some(m => m.row === row && m.col === col);
      
      boardHTML += `
        <div class='chess-square ${squareClass} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}' 
             onclick='selectChessSquare(${row}, ${col})'>
          ${piece ? pieces[piece] : ''}
        </div>
      `;
    }
  }
  document.getElementById('chessBoard').innerHTML = boardHTML;
  updateCapturedPieces();
}

function selectChessSquare(row, col) {
  if (!chessBoard) return;
  
  const piece = chessBoard[row][col];
  const isTurnWhite = chessHistory.length % 2 === 0;
  const isPieceWhite = piece && piece === piece.toUpperCase();
  
  if (selectedSquare) {
    const validMoves = getValidMoves(selectedSquare.row, selectedSquare.col);
    const isValidMove = validMoves.some(m => m.row === row && m.col === col);
    
    if (isValidMove) {
      const movedPiece = chessBoard[selectedSquare.row][selectedSquare.col];
      chessBoard[row][col] = movedPiece;
      chessBoard[selectedSquare.row][selectedSquare.col] = null;
      chessHistory.push({from: selectedSquare, to: {row, col}, piece: movedPiece});
      selectedSquare = null;
      
      updateChessStatus();
      
      if (chessGameMode === 'bot' && (chessHistory.length % 2 !== 0)) {
        setTimeout(() => makeBotMove(), 500);
      }
    } else if (piece && ((isTurnWhite && isPieceWhite) || (!isTurnWhite && !isPieceWhite))) {
      selectedSquare = {row, col};
    } else {
      selectedSquare = null;
    }
  } else if (piece && ((isTurnWhite && isPieceWhite) || (!isTurnWhite && !isPieceWhite))) {
    selectedSquare = {row, col};
  }
  
  renderChessBoard();
}

function getValidMoves(row, col) {
  const piece = chessBoard[row][col];
  if (!piece) return [];
  
  const moves = [];
  const type = piece.toLowerCase();
  const isWhite = piece === piece.toUpperCase();
  
  if (type === 'p') {
    if (isWhite) {
      if (row > 0 && !chessBoard[row - 1][col]) moves.push({row: row - 1, col});
      if (row === 6 && !chessBoard[row - 1][col] && !chessBoard[row - 2][col]) moves.push({row: row - 2, col});
      if (row > 0 && col > 0 && chessBoard[row - 1][col - 1] && chessBoard[row - 1][col - 1] !== chessBoard[row - 1][col - 1].toUpperCase()) moves.push({row: row - 1, col: col - 1});
      if (row > 0 && col < 7 && chessBoard[row - 1][col + 1] && chessBoard[row - 1][col + 1] !== chessBoard[row - 1][col + 1].toUpperCase()) moves.push({row: row - 1, col: col + 1});
    } else {
      if (row < 7 && !chessBoard[row + 1][col]) moves.push({row: row + 1, col});
      if (row === 1 && !chessBoard[row + 1][col] && !chessBoard[row + 2][col]) moves.push({row: row + 2, col});
      if (row < 7 && col > 0 && chessBoard[row + 1][col - 1] && chessBoard[row + 1][col - 1] === chessBoard[row + 1][col - 1].toUpperCase()) moves.push({row: row + 1, col: col - 1});
      if (row < 7 && col < 7 && chessBoard[row + 1][col + 1] && chessBoard[row + 1][col + 1] === chessBoard[row + 1][col + 1].toUpperCase()) moves.push({row: row + 1, col: col + 1});
    }
  } else if (type === 'n') {
    const knightMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
    knightMoves.forEach(([dr, dc]) => {
      const nr = row + dr, nc = col + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) moves.push({row: nr, col: nc});
    });
  } else if (type === 'b' || type === 'r' || type === 'q') {
    const dirs = [];
    if (type === 'b' || type === 'q') dirs.push([1,1],[1,-1],[-1,1],[-1,-1]);
    if (type === 'r' || type === 'q') dirs.push([0,1],[0,-1],[1,0],[-1,0]);
    
    for (let [dr, dc] of dirs) {
      for (let i = 1; i < 8; i++) {
        const nr = row + dr * i, nc = col + dc * i;
        if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
        moves.push({row: nr, col: nc});
        if (chessBoard[nr][nc]) break;
      }
    }
  } else if (type === 'k') {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = row + dr, nc = col + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) moves.push({row: nr, col: nc});
      }
    }
  }
  
  return moves.filter(m => {
    const targetPiece = chessBoard[m.row][m.col];
    if (!targetPiece) return true;
    const isTargetWhite = targetPiece === targetPiece.toUpperCase();
    return isWhite !== isTargetWhite;
  });
}

function makeBotMove() {
  const validMoves = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = chessBoard[row][col];
      if (piece && piece === piece.toLowerCase()) {
        const moves = getValidMoves(row, col);
        moves.forEach(move => {
          validMoves.push({from: {row, col}, to: move, piece});
        });
      }
    }
  }
  
  if (validMoves.length > 0) {
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    chessBoard[move.to.row][move.to.col] = chessBoard[move.from.row][move.from.col];
    chessBoard[move.from.row][move.from.col] = null;
    chessHistory.push(move);
  }
  
  updateChessStatus();
  renderChessBoard();
}

function updateChessStatus() {
  const status = document.getElementById('chessStatus');
  if (chessHistory.length % 2 === 0) {
    status.innerHTML = chessGameMode === 'bot' ? "♙ White's Turn (You)" : "♙ White's Turn";
  } else {
    status.innerHTML = chessGameMode === 'bot' ? "♟ Bot is thinking..." : "♟ Black's Turn";
  }
}

function updateCapturedPieces() {
  const startingPieces = {'P': 8, 'N': 2, 'B': 2, 'R': 2, 'Q': 1, 'K': 1, 'p': 8, 'n': 2, 'b': 2, 'r': 2, 'q': 1, 'k': 1};
  const currentPieces = {'P': 0, 'N': 0, 'B': 0, 'R': 0, 'Q': 0, 'K': 0, 'p': 0, 'n': 0, 'b': 0, 'r': 0, 'q': 0, 'k': 0};
  
  for (let row of chessBoard) {
    for (let piece of row) {
      if (piece) currentPieces[piece]++;
    }
  }
  
  let captured = "";
  for (let [piece, count] of Object.entries(currentPieces)) {
    const missing = startingPieces[piece] - count;
    if (missing > 0) {
      captured += pieces[piece].repeat(missing) + " ";
    }
  }
  document.getElementById('capturedPieces').innerHTML = captured ? `Captured: ${captured}` : '';
}

function startChessVsBot(event) {
  initChess();
  chessGameMode = 'bot';
  updateChessStatus();
  renderChessBoard();
  if (typeof createSparkles === "function") createSparkles(event.clientX, event.clientY, '♟');
}

function startChessVsPerson(event) {
  initChess();
  chessGameMode = 'person';
  updateChessStatus();
  renderChessBoard();
  if (typeof createSparkles === "function") createSparkles(event.clientX, event.clientY, '♟');
}

function resetChess(event) {
  chessBoard = null;
  chessGameMode = null;
  selectedSquare = null;
  chessHistory = [];
  document.getElementById('chessBoard').innerHTML = '';
  document.getElementById('chessStatus').innerHTML = '';
  document.getElementById('capturedPieces').innerHTML = '';
  if (typeof createSparkles === "function") createSparkles(event.clientX, event.clientY, '🔄');
}