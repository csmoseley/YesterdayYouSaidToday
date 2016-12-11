function refresh(){
$.get( "tasks.json", function( data ) {
  var container = $( "#todoList" );
  container.empty(); for(i=0; i < data.length; i++){
  container.append('<li data-obj-id="'+data[i].id+'" class="list-group-item ' + getStatusColor(data[i].status) + '"><button type="button" class="close" onclick="removeTask(this)"><span>&times;</span></button>'+data[i].name+'</li>');
}
container.append("<li class='list-group-item'><input class='form-control' onfocusout='addTask(this, \"Dining Room\")' placeholder='Add a new task'></li>");
});
}


function removeTask(element){
  var id = element.parentElement.getAttribute("data-obj-id");
  $.ajax({
    url: '/tasks/' + id + ".json",
    type: 'DELETE',
    success: function(result) {
        console.log("Deleted Task:" + id);
        refresh();
    }
});
}

function addTask(element, room){
$(element).addClass("disabled");
console.log(element.value + ":" + room);
if(element.value.trim != ""){ $.post("tasks.json", {task: {room: room, status: 0, name: element.value}});
refresh();
}
}

function getStatusColor(status){
  switch(status){
    case 0:
      return "";
      break;
    case 1:
      return "list-group-item-success";
      break;
    default:
      return "";
  }
}





window.onload = refresh();
