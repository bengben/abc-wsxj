!function(a){var b=function(){this.$body=a("body");this.$calendar=a("#calendar"),this.$event=("#calendar-events div.calendar-events"),this.$categoryForm=a("#add-new-event form"),this.$extEvents=a("#calendar-events"),this.$modal=a("#my-event"),this.$saveCategoryBtn=a(".save-category"),this.$calendarObj=null};b.prototype.onDrop=function(g,f){var d=this;var h=g.data("eventObject");var c=g.attr("data-class");var e=a.extend({},h);e.start=f;if(c){e.className=[c]}d.$calendar.fullCalendar("renderEvent",e,true);if(a("#drop-remove").is(":checked")){g.remove()}},b.prototype.onEventClick=function(d,f,g){var c=this;var e=a("<form></form>");e.append("<label>Change event name</label>");e.append("<div class='input-group'><input class='form-control' type=text value='"+d.title+"' /><span class='input-group-btn'><button type='submit' class='btn btn-success waves-effect waves-light'><i class='fa fa-check'></i> Save</button></span></div>");c.$modal.modal({backdrop:"static"});c.$modal.find(".delete-event").show().end().find(".save-event").hide().end().find(".modal-body").empty().prepend(e).end().find(".delete-event").unbind("click").click(function(){c.$calendarObj.fullCalendar("removeEvents",function(h){return(h._id==d._id)});c.$modal.modal("hide")});c.$modal.find("form").on("submit",function(){d.title=e.find("input[type=text]").val();c.$calendarObj.fullCalendar("updateEvent",d);c.$modal.modal("hide");return false})},b.prototype.onSelect=function(g,e,d){var c=this;c.$modal.modal({backdrop:"static"});var f=a("<form></form>");f.append("<div class='row'></div>");f.find(".row").append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Event Name</label><input class='form-control' placeholder='Insert Event Name' type='text' name='title'/></div></div>").append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Category</label><select class='form-control' name='category'></select></div></div>").find("select[name='category']").append("<option value='bg-danger'>Danger</option>").append("<option value='bg-success'>Success</option>").append("<option value='bg-primary'>Primary</option>").append("<option value='bg-info'>Info</option>").append("<option value='bg-warning'>Warning</option></div></div>");c.$modal.find(".delete-event").hide().end().find(".save-event").show().end().find(".modal-body").empty().prepend(f).end().find(".save-event").unbind("click").click(function(){f.submit()});c.$modal.find("form").on("submit",function(){var k=f.find("input[name='title']").val();var h=f.find("input[name='beginning']").val();var j=f.find("input[name='ending']").val();var i=f.find("select[name='category'] option:checked").val();if(k!==null&&k.length!=0){c.$calendarObj.fullCalendar("renderEvent",{title:k,start:g,end:e,allDay:false,className:i},true);c.$modal.modal("hide")}else{alert("You have to give a title to your event")}return false});c.$calendarObj.fullCalendar("unselect")},b.prototype.enableDrag=function(){a(this.$event).each(function(){var c={title:a.trim(a(this).text())};a(this).data("eventObject",c);a(this).draggable({zIndex:999,revert:true,revertDuration:0})})};b.prototype.init=function(){this.enableDrag();var f=new Date();var e=f.getDate();var i=f.getMonth();var k=f.getFullYear();var h="";var j=new Date(a.now());var g=[{title:"Meeting #3",start:new Date(a.now()+506800000),className:"bg-info"},{title:"Submission #1",start:j,end:j,className:"bg-danger"},{title:"Meetup #6",start:new Date(a.now()+848000000),className:"bg-info"},{title:"Seminar #4",start:new Date(a.now()-1099000000),end:new Date(a.now()-919000000),className:"bg-warning"},{title:"Event Conf.",start:new Date(a.now()-1199000000),end:new Date(a.now()-1199000000),className:"bg-purple"},{title:"Meeting #5",start:new Date(a.now()-399000000),end:new Date(a.now()-219000000),className:"bg-info"},{title:"Submission #2",start:new Date(a.now()+868000000),className:"bg-danger"},{title:"Seminar #5",start:new Date(a.now()+348000000),className:"bg-success"}];var c=this;c.$calendarObj=c.$calendar.fullCalendar({slotDuration:"00:15:00",minTime:"08:00:00",maxTime:"19:00:00",defaultView:"month",handleWindowResize:true,header:{left:"prev,next today",center:"title",right:"month,agendaWeek,agendaDay"},events:g,editable:true,droppable:true,eventLimit:true,selectable:true,drop:function(d){c.onDrop(a(this),d)},select:function(m,l,d){c.onSelect(m,l,d)},eventClick:function(d,l,m){c.onEventClick(d,l,m)}});this.$saveCategoryBtn.on("click",function(){var l=c.$categoryForm.find("input[name='category-name']").val();var d=c.$categoryForm.find("select[name='category-color']").val();if(l!==null&&l.length!=0){c.$extEvents.append('<div class="calendar-events m-b-20" data-class="bg-'+d+'" style="position: relative;"><i class="fa fa-circle text-'+d+' m-r-10" ></i>'+l+"</div>");c.enableDrag()}})},a.CalendarApp=new b,a.CalendarApp.Constructor=b}(window.jQuery),$(window).on("load",function(){$.CalendarApp.init()});