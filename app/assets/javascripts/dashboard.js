function refresh(){
$.get( "tasks.json", function( data ) {
  var container = $( "#todoList" );
  container.empty(); for(i=0; i < data.length; i++){
  container.append('<li data-obj-id="'+data[i].id+'" class="list-group-item ' + getStatusColor(data[i].status) + '"><button type="button" class="close" onclick="removeTask(this)"><span>&times;</span></button>'+data[i].name+'</li>');
}
container.append("<li class='list-group-item'><div class='input-group'><input class='form-control' placeholder='Add a New Task'><span class='input-group-btn'><button type='button' class='btn btn-success' onclick='addTask(this, \"Dining Room\")'>+</button></span></div></li>");
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
taskName = element.parentElement.previousSibling.value;
$(element).addClass("disabled");
console.log(taskName + ":" + room);
if(taskName.trim != ""){ 
$.post("tasks.json", {task: {room: room, status: 0, name: taskName}}, function(result){refresh();});
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
