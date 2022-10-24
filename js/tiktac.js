const {Button, Alert, Row, Container, Col} = ReactBootstrap;

const Square = ({ takeTurn, id }) => {
  const mark = ["O", "X", ""];
  // id is the square's number
  // filled tells us if square has been filled
  // tik tells us symbol in square (same as player)
  // We call takeTurn to tell Parent we have filled the square
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);

  return (
    <button
      onClick={(e) => {
        if (!filled) {
          setTik(takeTurn(id));
          setFilled(true);
          console.log(`Square: ${id} filled by player : ${tik}`);
        }
      }}
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};

const renderControls = (resetPlayer) => {
  return(
    <Button onClick = {()=>{
      resetPlayer();
    }}className = "w-50" variant = "info">Reiniciar</Button>
  );
}

const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  const [resetGame, setResetGame] = React.useState(false);
  // check for winner (see superset.js)
  let status = checkForWinner(gameState);
  console.log(`We hava a winner ${status}`);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i}></Square>;
  }
  const resetPlayer = () => {
    setPlayer(1);
    setGameState([]);
    setResetGame(true);
  }

  React.useEffect(()=>{
    if(resetGame=== true) setResetGame(false);
  },[resetGame])

  return (
    <Container className = "text-center m-auto">
      {status != "No Winner Yet" && (
        <Alert variant="success">{`Winner is ${status}`}</Alert>
      )}
      <Row>
        <Col>
          <div>
            <p>Turno: {`${player == 1 ? 'X' : 'O'}`}</p>
          </div>
        </Col>
      </Row>
      {!resetGame && 
      <Row className="game-board">
        <Row className="grid-row m-0 p-0">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </Row>
        <Row className="grid-row m-0 p-0">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </Row>
        <Row className="grid-row m-0 p-0">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </Row>
      </Row>
      }
      <Row className="text-center m-2" id="controls">
        <Col>{renderControls(resetPlayer)}</Col>
      </Row>
      
    </Container>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
