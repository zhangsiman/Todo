import React, { PropTypes } from 'react'

class TodoList extends React.Component {

  handleChange(id){
    this.props.completed(id);
  }//在父组件中得到completed的状态值。i 是索引值。

  handleDelete(id){
      this.props.Delete(id);
  }

  render () {
    let list=this.props.items.map((item,index)=>
    <div key={index}>
      <input type="radio"  checked={item.completed} onChange={this.handleChange.bind(this,item.idn)}/>
        <span style={item.completed ? {textDecoration:"line-through",color:'#bbb'} :null } >{item.title}</span>
      <span onClick={this.handleDelete.bind(this,item.idn)} style={{color:'#bbb',cursor:'pointer'}}>X</span>
    </div>

    )
    return(
        <div>
          {list}
        </div>

    )
  }
}

export default TodoList;
