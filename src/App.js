import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information : [
      {
        id : 0,
        name : '홍길동',
        phone : '010-1234-1234'
      },
      {
        id : 1,
        name : '홍길순',
        phone : '010-2345-2345'
      }
    ],
    keyword : ''
  }

  // 데이터 생성
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information : information.concat({ id : this.id++, ...data })
    });
  }

  // 불변성을 지켜야한다!!!

  // 데이터 삭제
  // const arr = [1, 2, 3, 4, 5]; 에서 3 제외하고 뽑기
  // array.slice(0,2).concat(array.slice(3,5));
  // [ ...array.slice(0,2), ...array.slice(3,5) ];
  // array.filter(num => num !== 3);
  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  // 데이터 수정
  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information: information.map(
          info => info.id === id
            ? { ...info, ...data} // 기존의 값과 전달받은 data를 이어줌.
            : info // 기존 값 유지
        )
    });
  }

  // 데이터 검색
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    });
  }

  render() {
    const { information, keyword } = this.state;
    const filterdList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
              <PhoneForm onCreate={ this.handleCreate } />
              <p>
                <input
                  placeholder='검색할 이름을 입력하세요'
                  onChange={ this.handleChange }
                  value={ keyword }
                />
              </p>
              <hr/>
              <PhoneInfoList 
                data={ filterdList }
                onRemove={ this.handleRemove }
                onUpdate={ this.handleUpdate }
              />
          </div>
          {/* {JSON.stringify(information)} */}
        </header>
      </div>
    );
  }
}

export default App;