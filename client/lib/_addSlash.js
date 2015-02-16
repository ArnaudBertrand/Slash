Template.addSlash.rendered = function (){
	$('.add-slash-form').hide();
	$('.add-slash-form').slideDown("slow");
	$('.add-new-slash i').removeClass("fa-plus");
	$('.add-new-slash i').addClass("fa-minus");
}

Template.addSlash.destroyed = function(){
	$('.add-new-slash i').removeClass("fa-minus");
	$('.add-new-slash i').addClass("fa-plus");
}