   
   
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
    base('projects').select({
        
         filterByFormula: 'FIND("' + search_string + '", projectid) > 0',
     
        

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('description'));

            var $row = $('<tr>');
            $row.append($('<td>').text(record.get('projectid')));
            $row.append($('<td>').text(record.get('managingagency')));
            $row.append($('<td>').text(record.get('description')));
            $row.append($('<td>').text(record.get('commitments')));
            $row.append($('<td>').text('$' + record.get('totalcost')));

            if (flag_for_request == 0)
            $('#tblData').append($row);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });

});

var loadArtists1 = function() {
    
    
    if (flag_for_request == 1)
        return;
    base('projects').select({

        sort: [
           {field: 'projectid', direction: 'asc'}
        ],
        //filterByFormula : "OR( RECORD_ID() = 'managingagency', RECORD_ID() = 'commitments')",
      
        
    }).eachPage(function page(records, fetchNextPage) {

         
        records.forEach(function(record) {
            if (flag_for_request == 1)
                return;

            console.log('Retrieved ', record.get('managingagency'));
           
           //$row.append($('<td>').text(record.get("managingagency")));  
           var linkagency = record.get('managingagency') ;
           var linkcommitment = record.get('commitments') ;
           
           if (flag_for_request == 1)
                return;

           base('agency').find(linkagency, function(err, magency) {
                if (err) { console.error(err); return; }
                
                if (flag_for_request == 1)
                    return;



                    base('commitments').find(linkcommitment[0], function(err, commitment) {
                        if (flag_for_request == 1)
                            return;

                        if (err) { console.error(err); return; }
                        var $row = $('<tr>');
                        $row.append($('<td onclick="tdClick(this)">').text(record.get('projectid')));
                        $row.append($('<td>').text(magency.get('magency')));
                        $row.append($('<td>').text(record.get('description')));
                        $row.append($('<td>').text(commitment.get('commitmentcode')));
                        $row.append($('<td>').text('$' + record.get('totalcost')));

                        $row.attr('data-record-id', record.getId());

                        $('#tblData').append($row);
                          
                    });

            });            
        });

        if (flag_for_request == 0)
            fetchNextPage();

    }, function done(error) {
        console.log(error);
    });
};


function tdClick(td) {

    var project_id= $(td).text();

    flag_for_request = 1;
    base('projects').select({
        
         filterByFormula: 'FIND("' + project_id + '", projectid) > 0',
         
        

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {


            console.log('Retrieved ', record.get('managingagency'));
           
           //$row.append($('<td>').text(record.get("managingagency")));  
           var linkagency = record.get('managingagency') ;
           var linkcommitment = record.get('commitments') ;
           //var res = linkcommitment.split(",");
           //var n = linkcommitment.length;
         //alert(n);
            base('agency').find(linkagency, function(err, magency) {
                if (err) { console.error(err); return; }


                    base('commitments').find(linkcommitment[0], function(err, commitment) {
                        if (err) { console.error(err); return; }

                        $('#tblData').html('');

                        var $row1 = $('#row');
                        var html="<dt>Project Name</dt>"+"<dd>" + record.get('description') + "</dd>";
                        html += "<dt>Agnecy name</dt>"+"<dd>" + magency.get('magency') + "</dd>";
                        html += "<dt>City Cost + Non-City Cost</dt>"+"<dd>" + "$"+ record.get('citycost') + "+" + "$"+record.get('noncitycost') + "</dd>";
                        html += "<dt>Total Cost</dt>"+"<dd>" + "$" + record.get('citycost') + "</dd>";
                        html += "<dt># of Commitments</dt>"+"<dd>" + commitment.get('commitmentcode') + "</dd>";

                        var $row = $('#tblData');
                        $row.append($('<td>').text(record.get('projectid')));
                        $row.append($('<td>').text(magency.get('magency')));
                        $row.append($('<td>').text(record.get('description')));
                        $row.append($('<td>').text(commitment.get('commitmentcode')));
                        $row.append($('<td>').text('$' + record.get('totalcost')));

                        $row1.append(html);

                        $('#tblData').append($row);
                          
                    });

            });            
        });

    }, function done(error) {
        console.log(error);
    });
};

loadArtists1();


