import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'api/invoke/video/invoke/video';
const api = 'https://beiyou.bytedance.com/';

export default class Axios extends React.Component{
	constructor(props){
		super(props);
		this.state={
			videoList: [],
		}
	}
	getData=()=>{
		axios.get('/api/invoke/video/invoke/video')
		.then((res)=>{
			this.setState({
				videoList: res.data
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	render(){
		return(
		<div>
			<button onClick={this.getData}>获取数据</button>
			<ul>
			{
				this.state.videoList.map((value, key)=>{
					return (<li key={key}>{value.nickname}</li>)
				})
			}
			</ul>
		</div>
		)
	}
}


class Clock extends React.Component{ // 时钟类，显示时间，可无
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }
  
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  
  tick(){
    this.setState({
      date: new Date()
    });
  }
  render(){
    return (
      <div>
        <h2 className="style_clock">
		当前时间: {this.state.date.toLocaleTimeString()}
		</h2>
      </div>
    )
  } 
}

function Item(props){ // 输入自定义组件
  return(
    <form >
        <div className="style_table">
			  <b className="style_input_name">{props.name}</b>
			  <input type={props.type}/>
        </div>
    </form>  
  )
}

class MyButton extends React.Component{ // 按钮点击事件类 
  constructor(props){
    super(props);
  }
  handleClick = () => {
    //根据房间号和入住时间查询
    if(this.props.name == '查询账单'){
      //查询详单
      console.log("查询账单", this);
    }
    else{
      //查询账单
      console.log('查询详单', this);
    }
  }
  render(){
    return (
	  <center>
	    <button onClick={this.handleClick} className="button_click">
          {this.props.name}
        </button>
	  </center>
    )
  }
}

class BillShowing extends React.Component{ //表单类
	constructor(props){
		super(props);
		this.state={
			ac_status: "off",
			temp: 25,
			target_temp: 28,
			elec: 5,
			total_money: 5,
			timestamp:"2020-5-24 21:00-2020-5-24 21:30",
		}
	}
	
	listItem(item_name, item_val){
		return(
			<li>
				<b>{item_name}: </b>
				<b>{item_val}</b>
			</li>
		);
	}
	
	render(){
		return(
			<ul>
			{this.listItem("时间段", this.state.timestamp)}
			{this.listItem("空调状态", this.state.ac_status)}
			{this.listItem("当前温度", this.state.temp)}
			{this.listItem("目标温度", this.state.target_temp)}
			{this.listItem("耗电量", this.state.elec)}
			{this.listItem("电费", this.state.total_money)}
			</ul>
		);
	}
}	
			
		

class FrontDesk extends React.Component{ //前台界面类
  
  render(){
    return (
      <div>
		   <div>
			   <div className="title_back" >
				 <h1>酒店前台管理系统 </h1>
			   </div>
			   <div>
					<span className="control_bar">
						<Clock/>
						<Item name="房 间 号 ：" type="text"/>
						<Item name="入住时间：" type="datetime-local" value='2020-5-30T15:00'/>
						<MyButton name="查询账单"/>
						<MyButton name="查询详单"/>
						<Axios/>
					</span>
					<span className="show_page">
						<div className="show_border">
							<BillShowing/>
							<BillShowing/>
							<BillShowing/>
						</div>
					</span>
			   </div>
		   </div>
      </div>
    );
  }
}

ReactDOM.render(
  <FrontDesk />,
  document.getElementById('root')
);
