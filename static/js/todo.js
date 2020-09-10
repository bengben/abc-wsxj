$(function(){$(".searchbar > input").on("keyup",function(){var a=new RegExp($(this).val(),"i");$(".todo-listing .todo-item").hide();$(".todo-listing .todo-item").filter(function(){return a.test($(this).text())}).show()})});function dynamicNumberNotify(k){var l=k;var c=$(".todo-item");var d=$(".todo-item.all-todo-list");var e=$(".todo-item.current-task-done");var f=$(".todo-item.current-task-important");var g=d.length;var a=e.length;var b=f.length;var h=$("#all-todo-list .todo-badge");var i=$("#current-task-done .todo-badge");var j=$("#current-task-important .todo-badge");if(l==="allList"){if(g===0){h.text("");return}if(g>9){h.css({padding:"2px 0px",height:"25px",width:"25px"})}else{if(g<=9){h.removeAttr("style")}}h.text(g)}else{if(l==="completedList"){if(a===0){i.text("");return}if(a>9){i.css({padding:"2px 0px",height:"25px",width:"25px"})}else{if(a<=9){i.removeAttr("style")}}i.text(a)}else{if(l==="importantList"){if(b===0){j.text("");return}if(b>9){j.css({padding:"2px 0px",height:"25px",width:"25px"})}else{if(b<=9){j.removeAttr("style")}}j.text(b)}}}}new dynamicNumberNotify("allList");new dynamicNumberNotify("completedList");new dynamicNumberNotify("importantList");var quill=new Quill("#taskdescription",{modules:{toolbar:[[{header:[1,2,false]}],["bold","italic","underline"],["image","code-block"]]},placeholder:"Add description here...",theme:"snow"});$("#addTaskModal").on("hidden.bs.modal",function(a){$(this).find("input,textarea,select").val("").end();quill.deleteText(0,2000)});$("#add-task").on("click",function(a){a.preventDefault();$(".add-tsk").show();$(".edit-tsk").hide();$("#addTaskModal").modal("show")});function donecheckCheckbox(){$('.todo-item input[type="checkbox"]').click(function(){if($(this).is(":checked")){$(this).parents(".todo-item").addClass("current-task-done")}else{if($(this).is(":not(:checked)")){$(this).parents(".todo-item").removeClass("current-task-done")}}new dynamicNumberNotify("completedList")})}function removeDropdown(){$(".dropdown-action .dropdown-menu .remove.dropdown-item").click(function(){if(!$(this).parents(".todo-item").hasClass("current-todo-delete")){var d=$(this).parents(".todo-item");var c=d.attr("class");var a=c.split(" ")[1];var b=c.split(" ")[2];var e=c.split(" ")[3];if(a==="all-todo-list"){d.removeClass(a)}if(b==="current-task-done"||b==="current-task-important"){d.removeClass(b)}if(e==="current-task-done"||e==="current-task-important"){d.removeClass(e)}$(this).parents(".todo-item").addClass("current-todo-delete")}else{if($(this).parents(".todo-item").hasClass("current-todo-delete")){$(this).parents(".todo-item").removeClass("current-todo-delete")}}new dynamicNumberNotify("allList");new dynamicNumberNotify("completedList");new dynamicNumberNotify("importantList")})}function deletePermanentlyDropdown(){$(".dropdown-action .dropdown-menu .permanent-delete.dropdown-item").on("click",function(a){a.preventDefault();if($(this).parents(".todo-item").hasClass("current-todo-delete")){$(this).parents(".todo-item").remove()}})}function reviveTaskDropdown(){$(".dropdown-action .dropdown-menu .revive.dropdown-item").on("click",function(a){a.preventDefault();if($(this).parents(".todo-item").hasClass("current-todo-delete")){var d=$(this).parents(".todo-item");var c=d.attr("class");var b=c.split(" ")[1];$(this).parents(".todo-item").removeClass(b);$(this).parents(".todo-item").addClass("all-todo-list");$(this).parents(".todo-item").hide()}new dynamicNumberNotify("allList");new dynamicNumberNotify("completedList");new dynamicNumberNotify("importantList")})}function importantTaskDropdown(){$(".important").click(function(){if(!$(this).parents(".todo-item").hasClass("current-task-important")){$(this).parents(".todo-item").addClass("current-task-important");$(this).html("Back to List")}else{if($(this).parents(".todo-item").hasClass("current-task-important")){$(this).parents(".todo-item").removeClass("current-task-important");$(this).html("Important");$(".list-group-item-action#all-todo-list").trigger("click")}}new dynamicNumberNotify("importantList")})}function editTaskDropdown(){$(".dropdown-action .dropdown-menu .edit.dropdown-item").click(function(){event.preventDefault();var a=$(this);$(".add-tsk").hide();$(".edit-tsk").show();var d=a.parents(".todo-item").children().find(".todo-header").attr("data-todo-header");var c=a.parents(".todo-item").children().find(".todo-subtext").attr("data-todosubtextText");var b=JSON.parse(c);$("#task").val(d);quill.setContents(b);$(".edit-tsk").off("click").on("click",function(q){var e=$(this);var f=document.getElementById("task").value;var g=document.getElementById("taskdescription").value;var u=new Date();var o=String(u.getDate()).padStart(2,"0");var s=String(u.getMonth());var w=u.getFullYear();var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];u=o+" "+t[s]+" "+w;var i=quill.getText();var h=quill.root.innerHTML;var p=quill.getContents();var n=JSON.stringify(p);var r=125;var v=i.length>r?i.substring(0,r-3)+"...":i;var l=a.parents(".todo-item").children().find(".todo-header").html(f);var j=a.parents(".todo-item").children().find(".todo-subtext").html(v);var j=a.parents(".todo-item").children().find(".todo-time").html(u);var m=a.parents(".todo-item").children().find(".todo-header").attr("data-todo-header",f);var k=a.parents(".todo-item").children().find(".todo-subtext").attr("data-todosubtextText",n);var k=a.parents(".todo-item").children().find(".todo-subtext").attr("data-todosubtext-html",h);$("#addTaskModal").modal("hide")});$("#addTaskModal").modal("show")})}function taskItem(){$(".todo-item .content-todo").on("click",function(c){c.preventDefault();var a=$(this).parents(".todo-item").children().find(".todo-header").attr("data-todo-header");var b=$(this).find(".todo-subtext").attr("data-todosubtext-html");$(".task-heading").text(a);$(".task-text").html(b);$("#todoShowListItem").modal("show")})}var $btns=$(".list-group-item-action").click(function(){if(this.id=="all-todo-list"){var a=$("."+this.id).fadeIn();$("#all-todo-container > div").not(a).hide()}else{if(this.id=="current-todo-delete"){var a=$("."+this.id).fadeIn();$("#all-todo-container > div").not(a).hide()}else{var a=$("."+this.id).fadeIn();$("#all-todo-container > div").not(a).hide()}}$btns.removeClass("active");$(this).addClass("active")});donecheckCheckbox();removeDropdown();deletePermanentlyDropdown();reviveTaskDropdown();importantTaskDropdown();editTaskDropdown();taskItem();$(".add-tsk").click(function(i){var m=new Date();var g=String(m.getDate()).padStart(2,"0");var j=String(m.getMonth());var l=String(m.getTime());var n=m.getFullYear();var k=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];m=g+" "+k[j]+" "+n;var f=g+j+l;var a=document.getElementById("task").value;var c=quill.getText();var b=quill.root.innerHTML;var h=quill.getContents();var d=JSON.stringify(h);$html='<div class="todo-item all-todo-listtodo-item all-todo-list p-3 border-bottom position-relative"><div class="inner-item d-flex align-items-start"><div class="w-100"><div class="checkbox checkbox-info d-flex align-items-start"><input type="checkbox" class="material-inputs" id="'+f+'"><label class="custom-control-label" for="'+f+'"></label><div><h5 class="font-medium font-16 todo-header mb-0" data-todo-header="'+a+'">'+a+"</h5><div class='todo-subtext text-muted' data-todosubtext-html='"+b+"' data-todosubtextText='"+d+"'> "+c+'</div><span class="todo-time font-12 text-muted"><i class="icon-calender mr-1"></i>'+m+'</span></div><div class="ml-auto"><div class="dropdown-action"><div class="dropdown todo-action-dropdown"><button class="btn btn-link text-dark p-1 dropdown-toggle text-decoration-none todo-action-dropdown" type="button" id="more-action-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="icon-options-vertical"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="more-action-1"><a class="edit dropdown-item" href="javascript:void(0);"><i class="fas fa-edit text-info mr-1"></i> Edit</a><a class="important dropdown-item" href="javascript:void(0);"><i class="fas fa-star text-warning mr-1"></i> Important</a><a class="remove dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt text-danger mr-1"></i>Remove</a><a class="permanent-delete dropdown-item" href="javascript:void(0);">Permanent Delete</a><a class="revive dropdown-item" href="javascript:void(0);">Revive Task</a></div></div></div></div></div></div></div></div>';$("#all-todo-container").prepend($html);$("#addTaskModal").modal("hide");donecheckCheckbox();removeDropdown();deletePermanentlyDropdown();reviveTaskDropdown();editTaskDropdown();taskItem();importantTaskDropdown();new dynamicNumberNotify("allList");$(".list-group-item-action#all-todo-list").trigger("click");$(".add-tsk").attr("disabled","disabled")});$("#task").keyup(function(){var a=false;$("#task").each(function(){if($(this).val()==""){a=true}});if(a){$(".add-tsk").attr("disabled","disabled")}else{$(".add-tsk").removeAttr("disabled")}});