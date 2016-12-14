import React, { PropTypes } from 'react';
import '../main.css';
import TodoList from "./TodoList";


class Header extends React.Component {
  constructor(){
    super();
    this.state={
    items:[{title:'women',completed:false,idn:1},
          {title:'haha',completed:true,idn:2}
          ],

      //show显示 0就是all 1就是active 2就是completed
      show:0
    }
  }

//改变completed的状态，点击handleChange之后触发这个函数，i是在子组件中传过来的。
  handleCompleted(id){
      var index = this.state.items.findIndex(function (ele) {
      return id==ele.idn})

        this.state.items[index].completed=!this.state.items[index].completed
        this.setState({
          items: this.state.items
        })
  }
//改变状态结束

//删除开始
handleDelete(id){
    var index = this.state.items.findIndex(function (ele) {
      return id==ele.idn})

  this.state.items.splice(index,1);
  this.setState({items:this.state.items})
}
//删除结束

  handleSubmit(e){
    e.preventDefault();//阻止默认行为

    let inputValue= this.refs.aaa.value.trim();//trim 忽略首尾空格　获取到文本框中的值。
    this.refs.aaa.value=null;//添加完成之后让文本框为空。

  //判断要如果文本框中是空值则出现弹出框
    if(inputValue==""){
        this.refs.aaa.focus();//让光标在文本域内
        return alert('不能为空')
    }
  //判断结束

    let date = new Date();
    let newItem={title:inputValue,completed:false,idn:date.getTime()};


//第一种方法
    this.state.items.push(newItem)//将货渠道的文本框中的值，传递给items
    this.setState({items:this.state.items})
//结束

//第二种方法
    // this.setState((prevState)=>({
    //   items:prevState.items.concat(newItem),//concat是合并俩个数组}))
//结束
  }

handleShow(i){
  this.setState({
    show:i
  })
}

  render () {

    if(this.state.show==0){
      var showItems=this.state.items
    }
    else if(this.state.show==1){
      var showItems=this.state.items.filter(function(element){return element.completed==false})
    }
    else{
      var showItems=this.state.items.filter(function(element){return element.completed==true})
    }

//添加all active completed 三个按钮
    let name=['All','Active','Completed'];
    let buttons= name.map((item,index) => <button key={index} onClick={this.handleShow.bind(this,index)}
     style={this.state.show==index?{backgroundColor:"teal"} :null}>{item}</button>)
//添加结束
      return(
        <div>
          <h1>TODO</h1>
            <TodoList  completed={this.handleCompleted.bind(this)} Delete={this.handleDelete.bind(this)} items={showItems}/>
            <form　onSubmit={this.handleSubmit.bind(this)}>
              <input placeholder='add a todo' ref='aaa'/>
              <button >Add {this.state.items.length+1}</button>
            </form>
            {buttons}
        </div>
      )
  }
}

export default Header;
