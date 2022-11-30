window.onload = () => {
    $(document).ready(function(){
        // Activate tooltip
        $('[data-toggle="tooltip"]').tooltip();
        
        // Select/Deselect checkboxes
        var checkbox = $('table tbody input[type="checkbox"]');
        $("#selectAll").click(function(){
            if(this.checked){
                checkbox.each(function(){
                    this.checked = true;                        
                });
            } else{
                checkbox.each(function(){
                    this.checked = false;                        
                });
            } 
        });
        checkbox.click(function(){
            if(!this.checked){
                $("#selectAll").prop("checked", false);
            }
        });
        $(function() 
      {
        $('#table').bootstrapTable()
      }
      )
      
    //Moment.JS Return Date Ranges
    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }
     
      
      $('#ok').click( function() 
      { 
    
        var $table = $('#table')
        var from=$("input[type=date][name=date1]" ).val();
        var to=$("input[type=date][name=date2]" ).val();
        $table.bootstrapTable('filterBy',{ ETA: getDates(from,to)}) 
            
        
     
    })
    });
    
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


