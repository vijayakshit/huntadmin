import React, { Component } from 'react'
import { Table, Icon, Divider } from 'antd';

export default class LeaderBoardTable extends Component {

  render() {
    const columns = [{
        title: 'Rank',
        dataIndex: 'position',
        key: 'position',
      }, {
        title: 'Hunter',
        dataIndex: 'huntername',
        key: 'huntername',
      }, {
        title: 'Completion',
        dataIndex: 'completion',
        key: 'completion',
      },{
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
      },
    ];
      
    const truedata = []

    this.props.selectedHuntData.rankings.forEach(rankingObject => {
      truedata.push({
        position: rankingObject.position,
        huntername: rankingObject.huntername,
        completion: rankingObject.completion,
        score: rankingObject.score,
      });
    });



      const data = [{
        key: '1',
        huntername: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }];

    return (
      <div>
        <Table columns={columns} dataSource={truedata} />
      </div>
    )
  }
}
