export default class Number extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: '000000', // 初始化6位数
      next: '000000',
      inits: 0,
      listAll: [[0], [0], [0], [0], [0], [0]],
      contrlAnimationWay: false,
    };
    this.key1 = 0;
  }

  componentWillUnmount() {}
  componentDidMount() {
    setTimeout(() => {
      this.run();
    });
    // this.setTimer()
  }

  // 获取数据
  getNumber() {
    const { inits } = this.state;
    const random = Math.floor(Math.random() * (100000 - 1) + 1);
    const prev = this.addZero(inits, 6);
    const next = this.addZero(inits + 1235, 6);
    this.setState({
      inits: inits + 1235,
    });
    this.getData(prev, next);
  }
  // 数字补零
  addZero(num, n) {
    let len = num.toString().length;
    while (len < n) {
      num = '0' + num;
      len ++;
    }
    return num;
  }
  // 对比数据前后变化
  getData(prev, next) {
    let { listAll } = this.state;
    listAll = [];
    const prevArray = prev.toString().split('');
    const nextArray = next.toString().split('');
    console.log(11, prevArray);
    console.log(22, nextArray);
    const listInit = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ];

    for (let i = 0; i < prevArray.length; i ++) {
      const prevNumber = parseInt(prevArray[i]);
      const nextNumber = parseInt(nextArray[i]);
      let start = -1;
      let end = -1;

      for (let j = 0; j < listInit.length; j ++) {
        if (listInit[j] === prevNumber) {
          start = j;
        }
        if (start !== -1 && listInit[j] === nextNumber) {
          end = j;
          break;
        }
      }
      listAll.push(listInit.slice(start, end + 1));
      console.log(listAll);
    }
    this.setState({
      listAll,
    });
  }
  run() {
    this.getNumber();
    this.key1 ++;
  }
  setTimer() {
    setInterval(() => {
      setTimeout(() => {
        this.run();
      }, 0);
    }, 1000 * 4);
  }

  render() {
    const { listAll } = this.state;
    return (
      <div className="new-tmall911">
        {/* 数字滚动 */}
        <div className="box-number">
          <div onClick={this.setTimer.bind(this)}>累计</div>
          {listAll.map((list, i) => {
            return (
              <div key={i} className="list-wrap">
                <div
                  className={`roll roll_${list.length - 1}`}
                  key={this.key1 ++}
                >
                  {list.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
                </div>
              </div>
            );
          })}
          <div>人已参与</div>
        </div>
        {/* 数字end */}
      </div>
    );
  }
}
