$(document).ready(function(){

    var loadPrevious = function loadPrevious(){

    };


    $("body").keypress(function(event) {
        //alert(event.which);return;
        console.log(event.which);
        if(event.which == 44 || event.which == 46) 
        {
            if(event.which == 44) {
                console.log('load previous');
                $( "#previous" ).trigger( "click" );
            }else if(event.which==46){
                console.log('load next');
                $( "#next" ).trigger( "click" );
            }
        }else if(event.which==43){
            console.log('Save word details');
            $( "#save" ).trigger( "click" );
        }else if(event.which==45){
            console.log('Delete word details');
            $( "#delete" ).trigger( "click" );
        }else if(event.which==32){
            console.log('load speech synthesis');
            $( "#voice" ).trigger( "click" );
        }else if(event.which==13){
            console.log('Check word');
            $( "#check" ).trigger( "click" );
        }
    });
    $('#save').click(function(){
        var index = parseInt($('#index').val());
        var notes = $('#notes').val();
        var wrong=$('#wrong').val();
        console.log(notes);
        $.ajax({
            url: '/word/'+index,
            type: 'POST',
            data: {
                notes:notes,
                wrong:wrong
            },
            success: function(data) {
            //called when successful
            console.log('save success');
            $( "#next" ).trigger( "click" );
            },
            error: function(e) {
            //called when there is an error
            console.log('save failed');
            console.log(e.message);
            }
        });
    });
    $('#delete').click(function(){
        var index = parseInt($('#index').val());
        $.ajax({
            url: '/word/'+index,
            type: 'DELETE',
            data: {},
            success: function(data) {
            //called when successful
            console.log('Delete success');
            $( "#next" ).trigger( "click" );
            },
            error: function(e) {
            //called when there is an error
            console.log('Delete failed');
            console.log(e.message);
            }
        });
    });
    $('#previous').click(function(){
        var index = parseInt($('#index').val());
        index--;
        window.location.href = "/word/"+index;
        /**$.ajax({
            url: '/word/'+index,
            type: 'GET',
            data: {},
            success: function(data) {
            //called when successful
            console.log('load previous is success');
            },
            error: function(e) {
            //called when there is an error
            console.log('load previous is failed');
            console.log(e.message);
            }
        });**/
    });
    $('#next').click(function(){
        var index = parseInt($('#index').val());
        index++;
        window.location.href = "/word/"+index;
        /**$.ajax({
            url: '/word/'+index,
            type: 'GET',
            data: {},
            success: function(data) {
            //called when successful
            console.log('load next is success');
            },
            error: function(e) {
            //called when there is an error
            console.log('load next is failed');
            console.log(e.message);
            }
        });**/
    });

    $('#save-json').click(function(){
        $.ajax({
            url: '/writeLatest',
            type: 'GET',
            data: {},
            success: function(data) {
            console.log('Save json is success');
            },
            error: function(e) {
            console.log('save json is failed');
            console.log(e.message);
            }
        });
    });
    
    $('#check').click(function(){
        var currAns = ($('#word').val()).toLowerCase().trim();
        var usrAns =  ($('#answer').val()).toLowerCase().trim();
        console.log('correct ans ::'+currAns);
        console.log('user ans ::'+usrAns);
        $('#correct-ans').hide();
        $('#wrong-ans').hide();
        if(currAns===usrAns){
            $('#wrong').val('true');
            $('#correct-ans').show();
        }else{
            $('#wrong').val('false');
            $('#wrong-ans').show();
        }
        $('#curr-answer').show();
    });

    $('#voice').click(function(){
        var word = $('#word').val();
        if(!word)return;
        var msg = new SpeechSynthesisUtterance(word);
        window.speechSynthesis.speak(msg);
    });

    $('#play').click(function(){
        $( "#voice" ).trigger( "click" );
    });
});