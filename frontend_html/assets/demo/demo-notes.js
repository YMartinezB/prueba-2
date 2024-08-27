jQuery(document).ready(function() {

    var notes = [];
    var noteSelected = 0;
    var demoNotes = [{
        content: 'New Note',
        createdAt: '9/23/2014 at 11:32 PM'
    }, {
        content: 'In Woking junction, until a late hour, trains were stopping and going on, others were shunting on the sidings, passengers were alighting and waiting, and everything was proceeding in the most ordinary way. A boy from the town, trenching on Smith\'s monopoly, was selling papers with the afternoon\'s news. The ringing impact of trucks, the sharp whistle of the engines from the junction, mingled with their shouts of "Men from Mars!" Excited men came into the station about nine o\'clock with incredible tidings, and caused no more disturbance than drunkards might have done. People rattling Londonwards peered into the darkness outside the carriage windows, and saw only a rare, flickering, vanishing spark dance up from the direction of Horsell, a red glow and a thin veil of smoke driving across the stars, and thought that nothing more serious than a heath fire was happening. It was only round the edge of the common that any disturbance was perceptible. There were half a dozen villas burning on the Woking border. There were lights in all the houses on the common side of the three villages, and the people there kept awake till dawn.',
        createdAt: '2/23/2014 at 01:32 AM'
    }];

    if (localStorage) {
        notes = JSON.parse(localStorage.getItem('jj.notes')) || demoNotes;
    } else {
        notes = demoNotes;
    }

    var noteLiHtml = '<li class="notes-snippet">'+
        '<h6 class="notes-title">%title%</h6>'+
        '<span class="notes-date">%createdAt%</span>'+
    '</li>';

    var updateNoteList = function (notes) {
        var noteList = '';
        for (var i = 0, length = notes.length; i < length; i++) {
            noteList += noteLiHtml.replace('%title%', notes[i].content.replace('<br>', ' ').substr(0,20)+'...').replace('%createdAt%', notes[i].createdAt);
        };

        $('ul.notes-list').html(noteList);
    };

    updateNoteList(notes);

    var openNote = function (noteIndex) {
        noteSelected = noteIndex;
        $('.note').html(notes[noteIndex].content);
    };

    $('body').on('click', '.notes-snippet', function () {
        openNote($(this).index());
    });

    openNote(0);

    $('.notes-options .btn-success').click ( function () {
        notes.push( {
            content: 'lorem ipsum dolor sit amet',
            createdAt: '9/23/2014 at 11:32 PM'
        });
        updateNoteList(notes);
        openNote(notes.length-1);
    });

    $('.note')[0].addEventListener('input', function () {
        notes[noteSelected].content = $('.note').html();
        if (localStorage) localStorage.setItem('jj.notes', JSON.stringify(notes));
        updateNoteList(notes);
    }, false);

    $('#panel-advancedoptions').panels({
        localStorage: false, 
        sortable: false,
        toggleColors: true,
        deleteButton: false,
        toggleButton: false
    });

    resizeNotes($('.notes-list'), noteListHeight());
    resizeNotes($('.note'), noteHeight());
    

    $('.note').summernote({
        airMode: true
    });

});

var noteHeight = function () {
    var h = getViewPort().height;
    var tOffset = $('.note').offset().top;
    var t = h - tOffset; //removing size from top

    var f = ($('footer').height() + parseInt($('.static-content').css('margin-bottom').replace('px', '')));
    var t = t - f - 1; //removing size from bottom

    return t;
}

var noteListHeight = function () {
    var t = noteHeight() - $('.notes-options').outerHeight() - $('.notes-search').outerHeight();
    return t;
}

function resizeNotes(menu, n_height) { //change height of scroll based on sidebar viewport height
    if (menu.parent('.slimScrollDiv').size() === 1) { 
        menu.slimScroll({destroy: true});
        menu.removeAttr('style');
    }
    menu.slimscroll({height:n_height});
}


$(window).resize(function(){
    resizeNotes($('.notes-list'), noteListHeight());
    resizeNotes($('.note'), noteHeight());
});