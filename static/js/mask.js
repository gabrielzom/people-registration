$("#input-number_of_cellphone").on("keypress", function(){
    $(this).mask("(00) 0000-00000")
    $(this).on("change", function() {
      if ($(this).val().length == 15) {
        $(this).mask("(00) 00000-0000")
      } else {
        $(this).mask("(00) 0000-00000")
      }
    }) 
})

$("#input-zip_code").on("keypress", function(){
    $(this).mask("00000-000")
}) 
