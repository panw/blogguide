$(function() {
  $( ".location_field" ).autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: "http://ws.geonames.org/searchJSON",
        dataType: "jsonp",
        data: {
          featureClass: "P",
          style: "full",
          maxRows: 12,
          name_startsWith: request.term
        },
        success: function( data ) {
          response( $.map( data.geonames, function( item ) {
            return {
              label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
              value: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName
            }
          }));
        }
      });
    },
    minLength: 2,
    open: function() {
      $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    },
    close: function() {
      $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    }
  }); // end of location autocomplete
  
  // Tag Autocomplete
  $( ".tag_field" ).autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: "/tags.json",
        dataType: "json",
        data: {
          featureClass: "P",
          style: "full",
          maxRows: 12,
          search_term: request.term
        },
        success: function( data ) {
          response( $.map( data, function( item ) {
            return {
              label: item.name,
              value: item.name
            }
          }));
        }
      });
    },
    minLength: 2,
    open: function() {
      $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    },
    close: function() {
      $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    }
  }); // end of Tag autocomplete
  
  $("#add_place_button").click(function(){
    $("#add_place_dialog").dialog({
      height: 500,
			width: 450,
			modal: true,
      title: 'Add Place',
      buttons: {
        Add: function(event) {
         var $form = $("#add_place_form"),
             name = $form.find('input[name="name"]').val(),
             description = $form.find('textarea[name="description"]').val(),
             tag_list = $form.find('input[name="tag_list"]').val();
          console.log("name: " + name);
          console.log("desc: " + description);
          console.log("tag_list: " + tag_list);
          
          /* Send the data using post */
          var posting = $.post( '/places', { place: { name: name, description: description, tag_list: tag_list } });
          console.log(posting);
          /* Put the results in a div */
          posting.done(function( data ) {
            console.log("Posting Done");
            console.log(data);
            var tags = tag_list.split(",");
            var tag_string = "";
            for(i in tags){
              tag_string = tag_string + '<a href="/tags/'+tags[i]+'">'+tags[i]+'</a>';
              if((i+1)<tags.length){
                tag_string = tag_string + ', ';
              }
            }
            console.log(tag_string);
            $('#masonry-container').append('<div class="box col3"><p><a href="places/'+data.id+'">'+data.name+'</a></p><p>'+data.description+'</p><p>Tags:'+tag_string+'</p></div>');
          });
          $(this).dialog( "close" );
        },
        Cancel: function(){
          $(this).dialog( "close" );
        }
      }
    }); //end of dialog
  }); //end of click function for dialog
});