$(function(){$("#config-table").DataTable({responsive:true})});$("#zero_config").DataTable();$("#default_order").DataTable({order:[[3,"desc"]]});$("#multi_col_order").DataTable({columnDefs:[{targets:[0],orderData:[0,1]},{targets:[1],orderData:[1,0]},{targets:[4],orderData:[4,0]}]});$("#complex_header").DataTable();$("#DOM_pos").DataTable({dom:'<"top"i>rt<"bottom"flp><"clear">'});$("#alt_pagination").DataTable({pagingType:"full_numbers"});$("#scroll_ver").DataTable({scrollY:"300px",scrollCollapse:true,paging:false});$("#scroll_ver_dynamic_hei").DataTable({scrollY:"50vh",scrollCollapse:true,paging:false});$("#scroll_hor").DataTable({scrollX:true});$("#scroll_ver_hor").DataTable({scrollY:300,scrollX:true});$("#lang_comma_deci").DataTable({language:{decimal:",",thousands:"."}});$("#lang_opt").DataTable({language:{lengthMenu:"Display _MENU_ records per page",zeroRecords:"Nothing found - sorry",info:"Showing page _PAGE_ of _PAGES_",infoEmpty:"No records available",infoFiltered:"(filtered from _MAX_ total records)"}});