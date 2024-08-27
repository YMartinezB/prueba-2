$('#panel-advancedoptions').panels({
    localStorage: false, 
    sortable: true,
    toggleColors: true
});


$('.checklist-toggler').click(function () {
	if (($(this).parents('.card-checklist').children('.checklist-container').css('display'))=="none") {
		$(this).parents('.card-checklist').children('.checklist-container').slideDown({duration:200});
		$(this).children('.fa').toggleClass('fa-angle-down fa-angle-up');
	} else {
		$(this).parents('.card-checklist').children('.checklist-container').slideUp({duration:200});
		$(this).children('.fa').toggleClass('fa-angle-down fa-angle-up');
	}
});



//Give ID to each nestable list and allow dragging between them
$('#nestable-list-1,#nestable-list-2').nestable({group: 1});

//Give ID to each card list and allow dragging between them
//$('#nestable-card-1,#nestable-card-2').nestable({group: 2});

	$('#sortable-tasks-2, #sortable-tasks').sortable({
		connectWith: ".sortable-connected",
		receive: function (event, ui) {
			var lists = $('.sortable-connected');
			for (var i = lists.length - 1; i >= 0; i--) {
				if ($(lists[i]).children().length < 1) $(lists[i]).html('');
			};
		}
	});

	$( function () {

		$('.card-task .checkbox-inline .iCheck-helper').click( function () {
			var total = $(this).closest('.card-task').find('.checkbox-inline input').length;
			var checked = $(this).closest('.card-task').find('.checkbox-inline input:checked').length;
			$(this).closest('.card-task').find('.card-done').html(checked+'/'+total);
			$(this).closest('.card-task').find('.progress-bar').css("width", (checked/total)*100+'%');
		});

		$('.card-task').each( function () {
			var total = $(this).find('.checkbox-inline input').length;
			var checked = $(this).find('.checkbox-inline input:checked').length;
			$(this).find('.card-done').html(checked+'/'+total);
			$(this).find('.progress-bar').css("width", (checked/total)*100+'%');
		});

		$('.card-task .card-options .toggle-check').click( function () {
			if ($(this).find('i').hasClass('fa-check')) {
				$(this).closest('.card-task').find('div.icheckbox_minimal-blue:not(.checked) .iCheck-helper').click();
				$(this).find('i').removeClass('fa-check').addClass('fa-undo');
			}
			else {
				$(this).closest('.card-task').find('div.icheckbox_minimal-blue.checked .iCheck-helper').click();
				$(this).find('i').removeClass('fa-undo').addClass('fa-check');
			}
		});
	});
