$(function() {
  $(".button").button();
  $(".dialog").hide();
  $('#masonry-container').masonry({
    itemSelector: '.box',
  });
  
  // Location Autocomplete
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
  
  $("#new_post_button").click(function(){
    $("#new_post_dialog").dialog({
      height: 500,
			width: 700,
      resizable: false,
			modal: true,
      title: 'New Post',
      buttons: {
        Add: function(event) {
         var $form = $("#new_post_form"),
             content = $form.find('textarea[name="content"]').val(),
             loc = $form.find('input[name="location_list"]').val(),
             tags = $form.find('input[name="tag_list"]').val();
         var posting = $.post( '/posts', { post: { content: content, location_list: loc, tag_list: tags } });
         //reload page on completion
         window.location = document.URL;
        },
        Cancel: function(){
          $(this).dialog( "close" );
        }
      }
    }); //end of dialog
  }); //end of click function for dialog
});