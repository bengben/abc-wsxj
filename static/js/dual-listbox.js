$(".duallistbox").bootstrapDualListbox();$(".duallistbox-no-filter").bootstrapDualListbox({showFilterInputs:false});$(".duallistbox-multi-selection").bootstrapDualListbox({nonSelectedListLabel:"Non-selected Dual",selectedListLabel:"Selected",preserveSelectionOnMove:"moved",moveOnSelect:false});$(".duallistbox-with-filter").bootstrapDualListbox({nonSelectedListLabel:"Non-selected Dual",selectedListLabel:"Selected",preserveSelectionOnMove:"moved",moveOnSelect:false,nonSelectedFilter:"Berlin|Frankfurt"});$(function(){$(".moveall i").removeClass().addClass("fas fa-angle-right");$(".removeall i").removeClass().addClass("fas fa-angle-left");$(".move i").removeClass().addClass("fas fa-angle-right");$(".remove i").removeClass().addClass("fas fa-angle-left")});$(".duallistbox-custom-text").bootstrapDualListbox({moveOnSelect:false,filterTextClear:"Show All Options",filterPlaceHolder:"Filter Options",infoText:"Showing {0} Option(s)",infoTextFiltered:'<span class="badge badge-info">Filtered List</span> {0} from {1}',infoTextEmpty:"No Options Listed",});$(".duallistbox-custom-height").bootstrapDualListbox({moveOnSelect:false,selectorMinimalHeight:250});var duallistboxDynamic=$(".duallistbox-dynamic").bootstrapDualListbox({moveOnSelect:false});var numb=25;$(".duallistbox-add").on("click",function(){var a=numb+1;var b=numb+2;duallistboxDynamic.append('<option value="'+a+'">London</option><option value="'+b+'" selected>Rome</option>');duallistboxDynamic.bootstrapDualListbox("refresh")});$(".duallistbox-add-clear").on("click",function(){var a=numb+1;var b=numb+2;duallistboxDynamic.append('<option value="'+a+'">London</option><option value="'+b+'" selected>Rome</option>');duallistboxDynamic.bootstrapDualListbox("refresh",true)});