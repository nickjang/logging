
/**
 * Allow dragging over item to select or 
 * unselect it. 
 * If mouse is down, then select/unselect
 * based on the first option interacted with.
 */
const handleMouseOver = (id) => {
  if (this.state.mouseDown) {
    const isSelected = this.state.selected.includes(id);
    let selected = [...this.state.selected];
    // If firstInteracted doesn't exist, select/unselect option and set it as firstInteracted
    if (!this.state.firstInteracted.id) {
      if (isSelected) selected = selected.filter(log => log !== id);
      else selected.push(id);
      this.setState({ firstInteracted: { id, isSelected: !isSelected }, selected });
    } else {
      // If firstInteracted exists, select based on it
      if (this.state.firstInteracted.isSelected) {
        if (isSelected) return;
        this.setState({ selected: [...selected, id] });
      } else {
        if (!isSelected) return;
        selected = selected.filter(log => log !== id);
        this.setState({ selected });
      }
    }
  }
}

/**
 * All select/unselect multiple logs with shift.
 * If shift key down and firstInteracted exists, 
 * select/unselect indexes from firstInteracted
 * to log clicked based on firstInteracted. 
 * If shift key down, then select/unselect. 
 * If shift not key down, select/unselect item 
 * that was mouseupped. 
 */
const handleMouseUp = (id) => {
  const isSelected = this.state.selected.includes(id);
  let selected = [...this.state.selected];

  if (this.state.shiftPressing) {
    // if firstInteracted exists, select based on firstInteracted
    if (this.state.firstInteracted.id) {
      if (this.state.firstInteracted.isSelected) {
        if (isSelected) return;
        this.setState({ selected: [...selected, id] });
      } else {
        if (!isSelected) return;
        selected = selected.filter(log => log !== id);
        this.setState({ selected });
      }
      // if firstInteracted doesn't exist, select/unselect option and set it as firstInteracted
    } else {
      if (isSelected) selected = selected.filter(log => log !== id);
      else selected.push(id);
      this.setState({ firstInteracted: { id, isSelected: !isSelected }, selected })
    }
  } else {
    if (isSelected) selected = selected.filter(log => log !== id);
    else selected.push(id);
    this.setState({ selected });
  }
}

const handleShiftKeyDown = (e) => {
  if (e.keyCode === 16) this.setState({ shiftPressing: true });
}

const handleShiftKeyUp = (e) => {
  if (e.keyCode === 16) this.setState({ shiftPressing: false, firstInteracted: '' });
}

const updateSelectedLogs = (logs) => {
}

/*
componentDidMount = () => {
  document.addEventListener('keydown', (e) => this.handleShiftKeyDown(e));
  document.addEventListener('keyup', (e) => this.handleShiftKeyUp(e));
  document.addEventListener('mousedown', () => this.setState({ mouseDown: true }));
  document.addEventListener('mouseup', () => this.setState({ mouseDown: false, firstInteracted: '' }));
}

<option>
onMouseOver={(e) => this.handleMouseOver(e.target.value)}
onMouseUp={(e) => this.handleMouseUp(e.target.value)}

state:
firstInteracted: {
  id: '',
  isSelected: false
}
shiftPressing: false,
mouseDown: false
*/