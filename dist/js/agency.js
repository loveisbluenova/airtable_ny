   
var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyIvQZcMYmjNbtUO' }).base('appw6jRyGYbFN687t');

var search_string = '';
var flag_for_request = 0;

$('#mysearchbutton').click(function(){


    flag_for_request = 1;
    search_string = $('#myInput').val();
    //alert(search_string);
    $('#row').html('');
    
    base('agency').select({
        
        filterByFormula: 'FIND("' + search_string + '", magencyname) > 0',
        
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('magencyname'));

            
            var $row = $('#row');
            var html ='<div class="col-md-4"><div class="box box-solid"><div class="box-header with-border  text-center"><h3 class="box-title">' + record.get('magencyname') + '</h3></div><div class="box-body" id="tblData"><dl class="dl-horizontal">';
            html += "<dt>Agency Acronym</dt>"+"<dd>" + record.get('magencyacro') + "</dd>";
            html += "<dt># Project</dt>"+"<dd>" + record.get('projects') +"</dd>";
            html += "<dt>- Total Cost</dt>"+"<dd>" + record.get('Total Project Cost') + "</dd>";
            html += "<dt># Commitments</dt>"+"<dd>" + record.get('commitments') +"</dd>";
            html += "<dt>- City Costs</dt>"+"<dd>" + record.get('Commitments Cost') + "</dd>";
            html += "<dt>- Non City Costs </dt>"+"<dd>" + record.get('Commitments NonCity Cost') + "</dd>";

            // $row.append($('<dd>').text(record.get('magencyacro')));
            // $row.append($('<dd>').text(record.get('Total Project Cost')));
            // $row.append($('<dd>').text(record.get('commitments')));
            // $row.append($('<dd>').text(record.get('Commitments Cost')));
            // $row.append($('<dd>').text(record.get('Commitments NonCity Cost')));
            html += "</dl></div></div></div></div>"

            $row.append(html);

            // $('#tblData').append($row);
        });
      
         
            fetchNextPage();
        
    }, function done(error) {
        console.log(error);
    });

});


$('#mysearchbutton1').click(function(){


    flag_for_request = 1;


    search_array = $('#first-disabled2').val();
    alert(search_array);

    for (var i = 0;i < search_array.length;i ++) {
        search_string += 'FIND("' + search_array[i] + '", magencyname) > 0';
        if (i != search_array.length - 1) {
            search_string += ' AND '
        }
    }
    
    base('agency').select({
        
         filterByFormula: 'FIND("' + search_array + '", description) > 0',
        
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('magencyname'));

            var $row = $('#row');
            var html ='<div class="col-md-4"><div class="box box-solid"><div class="box-header with-border  text-center"><h3 class="box-title">' + record.get('magencyname') + '</h3></div><div class="box-body" id="tblData"><dl class="dl-horizontal">';
            html += "<dt>Agency Acronym</dt>"+"<dd>" + record.get('magencyacro') + "</dd>";
         //   html += "<dt># Project</dt>"+"<dd>" + record.get('projects') + "</dd>";
            html += "<dt>- Total Cost</dt>"+"<dd>" + record.get('Total Project Cost') + "</dd>";
          //  html += "<dt># Commitments</dt>"+"<dd>" + record.get('commitments') + "</dd>";
            html += "<dt>- City Costs</dt>"+"<dd>" + record.get('Commitments Cost') + "</dd>";
            html += "<dt>- Non City Costs </dt>"+"<dd>" + record.get('Commitments NonCity Cost') + "</dd>";

            // $row.append($('<dd>').text(record.get('magencyacro')));
            // $row.append($('<dd>').text(record.get('Total Project Cost')));
            // $row.append($('<dd>').text(record.get('commitments')));
            // $row.append($('<dd>').text(record.get('Commitments Cost')));
            // $row.append($('<dd>').text(record.get('Commitments NonCity Cost')));
            html += "</dl></div></div></div></div>"

            $row.append(html);

            // $('#tblData').append($row);
        });
      
         
            fetchNextPage();
        
    }, function done(error) {
        console.log(error);
    });

});
var loadArtists1 = function() {
    $('#description').empty();
    base('agency').select({

          sort: [
            {field: 'magencyname', direction: 'asc'}
        ],

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('magencyname'));
            var linkproject = record.get('projects');
            var linkprojectvalue = linkproject.length;
            var linkcommitment = record.get('commitments');
            var linkcommitmentvalue = linkcommitment.length;
        //    base('projects').find(linkproject, function(err, projectrecord) {
         //       if (err) { console.error(err); return; }

         //       $.each(linkcommitment, function(index, value) {
          //          base('commitments').find(value, function(err, commitmentrecord) {
                      // if (err) { console.error(err); return; }

                        var $row = $('#row');
                        var html ='<div class="col-md-4"><div class="box box-solid"><div class="box-header with-border  text-center"><h3 class="box-title">' + record.get('magencyname') + '</h3></div><div class="box-body" id="tblData"><dl class="dl-horizontal">';
                        html += "<dt>Agency Acronym</dt>"+"<dd>" + record.get('magencyacro') + "</dd>";
                        html += "<dt># Projects</dt>"+"<dd>" + linkprojectvalue +"</dd>";
                        html += "<dt>- Total Cost</dt>"+"<dd>" + record.get('Total Project Cost') + "</dd>";
                        html += "<dt># Commitments</dt>"+"<dd>" + linkcommitmentvalue +"</dd>";
                        html += "<dt>- City Costs</dt>"+"<dd>" + '$' + record.get('Commitments Cost') + "</dd>";
                        html += "<dt>- Non City Costs </dt>"+"<dd>" +'$'+ record.get('Commitments NonCity Cost') + "</dd>";
                        html += "</dl></div></div></div></div>"
                        $row.append(html);
                     //   });
              //  });
            });

            // $('#tblData').append($row);
     //   });
      
         
            fetchNextPage();
        
    }, function done(error) {
        console.log(error);
 });
    /*base('agency').select({
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
          $.fn.selectpicker.call($selectpicker, $selectpicker.data());
        });

        fetchNextPage();
            

    }, function done(error) {
        console.log(error);
    });*/
};
loadArtists1();













