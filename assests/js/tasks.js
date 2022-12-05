window.onload = () => {
    todayInput.value = new Date().toLocaleDateString();
    new Chart(bar, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });
    new Chart(doughnut, {
        type: 'doughnut',
        data : {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
        }
    });

}

const todayInput = document.getElementById('dash-daterange');

const bar = document.getElementById('bar');
const doughnut = document.getElementById('doughnut');


