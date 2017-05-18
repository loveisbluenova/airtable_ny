   
var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyIvQZcMYmjNbtUO' }).base('appw6jRyGYbFN687t');


var search_string = '';
var flag_for_request = 0;

$('#mysearchbutton').click(function(){


    flag_for_request = 1;
    search_string = $('#myInput').val();
   // alert(search_string);
    $('#tblData').html('');
    base('commitments').select({
        
         filterByFormula: 'FIND("' + search_string + '", description) > 0',
      
        
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('description'));

            var $row = $('<tr>');

            $row.append($('<td>').text(record.get('description') + ' / ' + record.get('commitmentdescription')));
            $row.append($('<td>').text(record.get('plancommdate')));
            $row.append($('<td>').text('$' + record.get('noncitycost')));
            $row.append($('<td>').text('$' + record.get('citycost')));
            $row.append($('<td>').text(record.get('budgetline')));
            $row.append($('<td>').text(record.get('fmsnumber')));
            $row.append($('<td>').text(record.get('commitmentcode')));
            $row.attr('data-record-id', record.getId());

            $('#tblData').append($row);
        });

        

        fetchNextPage();


    }, function done(error) {
        console.log(error);
    });

});
var data = [];
var index = 0;
var loadArtists = function() {
    
    
    if (flag_for_request == 0)
    base('commitments').select({


         sort: [
            {field: 'description', direction: 'asc'}
        ],
      
        
    }).eachPage(function page(records, fetchNextPage) {
        data.push(records);
        index ++;
         
        records.forEach(function(record) {
            if (flag_for_request == 1)
                return; 

            console.log('Retrieved ', record.get('description'));

            var $row = $('<tr>');

            $row.append($('<td>').text(record.get('description') + ' / ' + record.get('commitmentdescription')));
            $row.append($('<td>').text(record.get('plancommdate')));
            $row.append($('<td>').text('$' + record.get('noncitycost')));
            $row.append($('<td>').text('$' + record.get('citycost')));
            $row.append($('<td>').text(record.get('budgetline')));
            $row.append($('<td>').text(record.get('fmsnumber')));
            $row.append($('<td>').text(record.get('commitmentcode')));
            $row.attr('data-record-id', record.getId());

            $('#tblData').append($row);
        });

        //alert(search_string);
        fetchNextPage();

         


    }, function done(error) {
        console.log(error);
    });


  


    base('agency').select({
         sort: [
            {field: 'magency', direction: 'asc'}
        ],
      
        
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
           

            console.log('Retrieved ', record.get('magency'));

            var $row;
          
            $row = $('<option>').text(record.get('magency'));

            $row.attr('data-record-id', record.getId());

            $('#first-disabled2').append($row);
        });          
               
        $('.selectpicker').each(function () {
          var $selectpicker = $(this);
          $.fn.selectpicker($selectpicker, $selectpicker.data());
        });

        fetchNextPage();
            

    }, function done(error) {
        console.log(error);
    });

};

  
   loadArtists();


