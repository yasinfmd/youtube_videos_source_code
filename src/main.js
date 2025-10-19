import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

const data = {
  labels: [],
  datasets: [
    {
      label: "Gerçek Aralık (ms)",
      data: [],
      borderColor: "#00ff9d",
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.25,
      cubicInterpolationMode: "monotone",
    },
  ],
};

const averagePlugin = {
  id: "averageLabel",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const dataset = chart.data.datasets[0].data;
    if (!dataset.length) return;

    const avg =
      dataset.reduce((sum, val) => sum + val, 0) / dataset.length;

    ctx.save();
    ctx.font = "16px Inter";
    ctx.fillStyle = "#facc15";
    ctx.textAlign = "center";
    ctx.fillText(`Ortalama: ${avg.toFixed(2)} ms`, chart.width / 2, 20);
    ctx.restore();
  },
};

const chart = new Chart(ctx, {
  type: "line",
  data,
  options: {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { color: "#1e293b" },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "#1e293b" },
        beginAtZero: true,
        title: { display: true, text: "ms", color: "#64748b" },
      },
    },
    plugins: {
      legend: { labels: { color: "#e2e8f0" } },
    },
  },
  plugins: [averagePlugin],
});


let last=performance.now();
let counter=0;

setInterval(() => {
   const now = performance.now();
   const diff = now - last;
   last = now;
  // console.log("tick",diff);
    data.labels.push(++counter);
    data.datasets[0].data.push(diff);
    
    console.log(diff)
    if (data.labels.length > 200) {
      data.labels.shift();
      data.datasets[0].data.shift();
    }

    chart.update();
    document.querySelector('.chart-container').scrollLeft = 99999;
  // const now = performance.now();
  // const delta = now - last;
  // last = now;

  // data.labels.push(++counter);
  // data.datasets[0].data.push(delta);

  // if (data.labels.length > 200) {
  //   data.labels.shift();
  //   data.datasets[0].data.shift();
  // }

  // chart.update();
}, 1);