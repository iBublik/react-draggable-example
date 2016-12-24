const { Component } = React;

class Draggable extends Component {    
  constructor(props) {
    super(props);
    
    this.state = { dragged: false, left: 0, top: 0 };
    this.onMouseDown = this.toggleDrag.bind(this, true);
    this.onMouseMove = this.performDrag.bind(this);
    this.onMouseUp = this.toggleDrag.bind(this, false);
  }
  
  toggleDrag(dragged) {
    this.setState({...this.state, dragged});
  }
  
  performDrag(event) {
    if(!this.state.dragged) {
      return;
    }
    const offsetX = this.props.width / 2;
    const offsetY = this.props.height / 2;
    this.setState({...this.state, left: event.pageX - offsetX, top: event.pageY - offsetY});
  }
  
  render() {    
    const style = {
      ...this.props, ...this.state,
      cursor: 'move',
      position: 'absolute'             
    };
    return (
      <div 
        style={style} 
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
      >
        {this.props.children}
      </div>
    );
  }
}

Draggable.defaultProps = {
  width: 300, height: 100, backgroundColor: 'yellow'
}

ReactDOM.render(
  <Draggable>Hello, world!</Draggable>,
  document.getElementById('app')
);

