/**
 * Created by chao on 2017/9/25.
 * 首页
 */

import React, { Component } from 'react';

import Container from './Container';
import HttpRequest from '../utils/HttpRequest';
import LoadingContainer from './LoadingContainer';
import HomeFours from '../components/HomeFours';
import HomeTopic from './HomeTopic';
import Title from '../components/Title';
import ScrollView from '../components/HomeScroll';
import ChosenGame from './ChosenGameContainer';
import HomeChosenGameTop from './HomeChosenGameTop';
import IconRight from '../components/IconRight';
import HomeChoseGameRight from './HomeChosenGameRight';
import ChosenGameScroll from '../components/ChosenGameScroll';

class PlayGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false
    };
  }
  render () {
    // eslint-disable-next-line
    return this.state.data === null ? <LoadingContainer name='首页'clickButton={() => this.getData()} err={this.state.err} /> : <Container marginBottom={0.24}>
      <HomeFours click={(gid) => {
        this.props.history.push('gamedetails' + gid);
      }} data={this.state.data.banner} />
      <HomeTopic>
        <Title margin='0.24rem 0 0 0.24rem' color='#000' fontSize='0.3rem'>游戏专题</Title>
        <Title margin='0.24rem 0 0 0.24rem' color='#999' fontSize='0.24rem'>ACT ACT 我们为你挑好了</Title>
        <ScrollView click={(did) => {
          this.props.history.push('/?did=' + did);
        }} data={this.state.data.dissertation} />
      </HomeTopic>
      <ChosenGame>
        <HomeChosenGameTop>
          <Title margin='0.24rem 0 0 0.24rem' color='#000' fontSize='0.3rem'>游戏精选</Title>
          <HomeChoseGameRight onClick={() => {
            this.props.history.push('gamelist');
          }
          }>
            <Title margin='0.24rem 0 0 0.24rem' color='#83b233' fontSize='0.24rem'>
              更多
            </Title>
            <IconRight fontSize='0.3rem' color='#83b233' />
          </HomeChoseGameRight>
        </HomeChosenGameTop>
        <ChosenGameScroll click={(gid) => {
          this.props.history.push('gamedetails' + gid);
        }} data={this.state.data.gameList} />
      </ChosenGame>
    </Container>;
  }
  getData () {
    this.setState({
      err: false
    });
    HttpRequest.getHomeData({}, (res) => {
      document.title = '首页';
      console.log(res);
      this.setState({
        data: res
      });
    }, (err) => {
      document.title = '首页';
      this.setState({
        data: null,
        err: true
      });
    });
  }
  componentDidMount () {
    this.getData();
  }
}

export default PlayGameContainer;

