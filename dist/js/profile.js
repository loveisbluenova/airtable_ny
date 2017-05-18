   
var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyIvQZcMYmjNbtUO' }).base('appw6jRyGYbFN687t');


var search_string = '';
var flag_for_request = 0;

$('#mysearchbutton').click(function(){


    flag_for_request = 1;
    search_string = $('#myInput').val();
    alert(search_string);
    $('#tblData').html('');
    base('projects').select({
        
         //filterByFormula: 'FIND("' + search_string + '", projectid) > 0',
         filterByFormula :"OR( RECORD_ID() = 'recXXXXXX', RECORD_ID() = 'recXXXXXX')",
        

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('description'));

            var $row = $('<tr>');
            $row.append($('<td>').text(record.get('projectid')));
            $row.append($('<td>').text(record.get('managingagency')));
            $row.append($('<td>').text(record.get('description')));
            $row.append($('<td>').text(record.get('commitments')));
            $row.append($('<td>').text('$' + record.get('totalcost')));

            $('#tblData').append($row);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });

});

var loadArtists = function() {
    
    
    if (flag_for_request == 0)
    base('projects').select({


         sort: [
            {field: 'projectid', direction: 'asc'}
        ],

      
        
    }).eachPage(function page(records, fetchNextPage) {

         
        records.forEach(function(record) {
            if (flag_for_request == 1)
                return; 

            console.log('Retrieved ', record.get('projectid'));

            var $row = $('<tr>');

            $row.append($('<td onclick="tdClick(this)">').text(record.get('projectid')));
            $row.append($('<td onclick="tdClick(this)">').text(record.get('managingagency')));
            $row.append($('<td onclick="tdClick(this)">').text(record.get('description')));
            $row.append($('<td onclick="tdClick(this)">').text(record.get('commitments')));
            $row.append($('<td onclick="tdClick(this)">').text('$' + record.get('totalcost')));

            $row.attr('data-record-id', record.getId());

            $('#tblData').append($row);
        });

        // alert(search_string);
        // fetchNextPage();

    }, function done(error) {
        console.log(error);
    });
};

function tdClick(td) {
    var project_id= $(td).text();
    $('#tblData').html('');
    base('projects').select({
        
         filterByFormula: 'FIND("' + project_id + '", projectid) > 0',
         //filterByFormula :"OR( RECORD_ID() = 'recXXXXXX', RECORD_ID() = 'recXXXXXX')",
        

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('description'));

            var $row1 = $('#row');
            //var html ='<div class="col-md-4"><div class="box box-solid"><div class="box-header with-border  text-center"><h3 class="box-title">' + record.get('magencyname') + '</h3></div><div class="box-body" id="tblData"><dl class="dl-horizontal">';
            var html="<dt>Project Name</dt>"+"<dd>" + record.get('description') + "</dd>";
            html += "<dt>Agnecy name</dt>"+"<dd>" + record.get('managingagency') + "</dd>";
            html += "<dt>City Cost + Non-City Cost</dt>"+"<dd>" + "$"+ record.get('citycost') + "+" + "$"+record.get('noncitycost') + "</dd>";
            html += "<dt>Total Cost</dt>"+"<dd>" + "$" + record.get('citycost') + "</dd>";
            html += "<dt># of Commitments</dt>"+"<dd>" + record.get('commitments') + "</dd>"+"<br>";

            $row1.append(html);

            var $row = $('<tr>');
            $row.append($('<td>').text(record.get('projectid')));
            $row.append($('<td>').text(record.get('managingagency')));
            $row.append($('<td>').text(record.get('description')));
            $row.append($('<td>').text(record.get('commitments')));
            $row.append($('<td>').text('$' + record.get('totalcost')));

            $('#tblData').append($row);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
}

loadArtists();

