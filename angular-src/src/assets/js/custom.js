
// login form
$(function(){
    $(".borderbtm input").on("focus", function(){
        $(this).addClass("focus");
    });
    $(".borderbtm input").on("blur", function(){
        if($(this).val()  == "")
            $(this).removeClass("focus");
    });
});