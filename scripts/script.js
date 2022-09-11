
let Generator = new DataHandler(1000, { min: 0, max: 1000 });
Generator.generateData();
const generatedData = Generator.getData();

console.log(generatedData);


const ctx = document.getElementById('myChart').getContext('2d');

const data = {
  datasets: [{
    label: 'red',
    data: [...generatedData.red],
    backgroundColor: 'rgb(255, 0, 0)'
  },
  {
    label: 'white',
    data: [...generatedData.white],
    backgroundColor: 'white'
  }],
};

const myChart = new Chart(ctx, {
  type: 'scatter',
  data: data,
  options: {
    responsive: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    }
  }
});

function updateChart() {
  const Generator = new DataHandler(1000, { min: -1000, max: 1000 });
  Generator.generateData();
  const generatedData = Generator.getFixedData();

  myChart.data.datasets[0].data = [...generatedData.red];
  myChart.data.datasets[1].data = [...generatedData.white];
  myChart.update();
}

const model = new Perceptron(2, document.getElementById('rate').value);

function fit() {
  const red = [];
  const white = [];
  let error = 0;

  myChart.data.datasets[0].data.forEach((point) => {
    const isRed = Generator.isRed(point.x, point.y);
    model.train([point.x, point.y], isRed);
    if (model.guess([point.x, point.y]) === 1) {
      isRed === 1 ? error = error : error += 1;
      red.push(point);
    } else {
      isRed === 0 ? error = error : error += 1;
      white.push(point);
    }
  });
  myChart.data.datasets[1].data.forEach((point) => {
    const isRed = Generator.isRed(point.x, point.y);
    model.train([point.x, point.y], isRed);
    if (model.guess([point.x, point.y]) === 1) {
      isRed === 1 ? error = error : error += 1;
      red.push(point);
    } else {
      isRed === 0 ? error = error : error += 1;
      white.push(point);
    }
  });

  
  myChart.data.datasets[0].data = [...red];
  myChart.data.datasets[1].data = [...white];
  
  document.getElementsByClassName('xWeight')[0].innerText = model.weights[0];
  document.getElementsByClassName('yWeight')[0].innerText = model.weights[1];
  
  myChart.update();
  document.getElementsByClassName('epoch')[0].innerText = parseInt(document.getElementsByClassName('epoch')[0].innerText) + 1;
  document.getElementsByClassName('accuracy')[0].innerText = (Generator.total - error) * 100 / Generator.total + '%';
}

document.getElementsByClassName('xWeight')[0].innerText = model.weights[0];
document.getElementsByClassName('yWeight')[0].innerText = model.weights[1];

document.getElementById('train').addEventListener('click', () => {
  fit();
});
document.getElementById('slider').addEventListener('input', () => {
  document.getElementById('points').innerText = document.getElementById('slider').value;
});
document.getElementById('slider').addEventListener('change', () => {
  Generator = new DataHandler(document.getElementById('slider').value, { min: 0, max: document.getElementById('slider').value });
  Generator.generateData();
  myChart.data.datasets[0].data = [...Generator.getData().red];
  myChart.data.datasets[1].data = [...Generator.getData().white];
  myChart.update();
});
