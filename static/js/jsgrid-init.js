!function(b,d,a){var c=d.Site;a(b).ready(function(e){}),jsGrid.setDefaults({tableClass:"jsgrid-table table table-striped table-hover"}),jsGrid.setDefaults("text",{_createTextBox:function(){return a("<input>").attr("type","text").attr("class","form-control input-sm")}}),jsGrid.setDefaults("number",{_createTextBox:function(){return a("<input>").attr("type","number").attr("class","form-control input-sm")}}),jsGrid.setDefaults("textarea",{_createTextBox:function(){return a("<input>").attr("type","textarea").attr("class","form-control")}}),jsGrid.setDefaults("control",{_createGridButton:function(f,h,e){var g=this._grid;return a("<button>").addClass(this.buttonClass).addClass(f).attr({type:"button",title:h}).on("click",function(i){e(g,i)})}}),jsGrid.setDefaults("select",{_createSelect:function(){var e=a("<select>").attr("class","form-control input-sm"),h=this.valueField,g=this.textField,f=this.selectedIndex;return a.each(this.items,function(j,k){var m=h?k[h]:j,l=g?k[g]:k,i=a("<option>").attr("value",m).text(l).appendTo(e);i.prop("selected",f===j)}),e}}),function(){a("#basicgrid").jsGrid({height:"500px",width:"100%",filtering:!0,editing:!0,sorting:!0,paging:!0,autoload:!0,pageSize:15,pageButtonCount:5,deleteConfirm:"Do you really want to delete the client?",controller:db,fields:[{name:"Name",type:"text",width:150},{name:"Age",type:"number",width:70},{name:"Address",type:"text",width:200},{name:"Country",type:"select",items:db.countries,valueField:"Id",textField:"Name"},{name:"Married",type:"checkbox",title:"Is Married",sorting:!1},{type:"control"}]})}(),function(){a("#staticgrid").jsGrid({height:"500px",width:"100%",sorting:!0,paging:!0,data:db.clients,fields:[{name:"Name",type:"text",width:150},{name:"Age",type:"number",width:70},{name:"Address",type:"text",width:200},{name:"Country",type:"select",items:db.countries,valueField:"Id",textField:"Name"},{name:"Married",type:"checkbox",title:"Is Married"}]})}(),function(){a("#exampleSorting").jsGrid({height:"500px",width:"100%",autoload:!0,selecting:!1,controller:db,fields:[{name:"Name",type:"text",width:150},{name:"Age",type:"number",width:50},{name:"Address",type:"text",width:200},{name:"Country",type:"select",items:db.countries,valueField:"Id",textField:"Name"},{name:"Married",type:"checkbox",title:"Is Married"}]}),a("#sortingField").on("change",function(){var e=a(this).val();a("#exampleSorting").jsGrid("sort",e)})}(),function(){var e=function(f){jsGrid.Field.call(this,f)};e.prototype=new jsGrid.Field({sorter:function(f,g){return new Date(f)-new Date(g)},itemTemplate:function(f){return new Date(f).toDateString()},insertTemplate:function(){if(!this.inserting){return""}var f=this.insertControl=this._createTextBox();return f},editTemplate:function(g){if(!this.editing){return this.itemTemplate(g)}var f=this.editControl=this._createTextBox();return f.val(g),f},insertValue:function(){return this.insertControl.datepicker("getDate")},editValue:function(){return this.editControl.datepicker("getDate")},_createTextBox:function(){return a("<input>").attr("type","text").addClass("form-control input-sm").datepicker({autoclose:!0})}}),jsGrid.fields.myDateField=e,a("#exampleCustomGridField").jsGrid({height:"500px",width:"100%",inserting:!0,editing:!0,sorting:!0,paging:!0,data:db.users,fields:[{name:"Account",width:150,align:"center"},{name:"Name",type:"text"},{name:"RegisterDate",type:"myDateField",width:100,align:"center"},{type:"control",editButton:!1,modeSwitchButton:!1}]})}()}(document,window,jQuery);