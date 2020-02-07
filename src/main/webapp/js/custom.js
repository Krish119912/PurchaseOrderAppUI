 function isNumeric(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function getBoolean(str) {
          if("true".startsWith(str)){
            return true;
          } else if("false".startsWith(str)){
            return false;
          } else {
            return null;
          }          
        }

                    function toolbar_click() {
                    			console.log("Toolbar command is clicked!");
										  return false;
										}
									var selectedLoginEmp=localStorage.getItem("SelectedLogin");
									var curentEmp =JSON.parse(selectedLoginEmp);
									$( "#currentEmployee" ).append(""+curentEmp.fullName+"-"+curentEmp.id);
									//console.log(curentEmp.fullName);
										//$("#currentEmployee").val=
									 var wnd,detailsTemplate;
									
										$("#grid").kendoGrid({
											dataSource: {
										      transport: {
										         read: function (options) {
										             readData(options);
										         //    window.location.replace("dashboard");
										             },
										        update: function (options) {
										        updateGrid(options);
										        readData(options);
										             },
										             destroy: function (options) {
										            	 deleteRow(options);
										            	 readData(options);
										            	    
											             },
											             create: function (options) {
											            createRow(options);
											            readData(options);
											            	  },
										          parameterMap: function (options, operation) {
										        		if (operation !== "read" && options.models) {
										              		return { models: kendo.stringify(options.models) };
										              		}
										            	}
										          },
										        schema: {
										        	 model: {
					                                     id: "id",
					                                     fields: {
					                                    	 username: { type: "string",validation: { required: true} },
					                                    	 password: { type: "string" ,validation: { required: true}},
					                                    	 role: {type:"string"},
					                                    	 fullName: { type: "string" ,validation: { required: true}},
					                                    	 mobileNumber:{ type: "string",validation: { required: true} },
					                                    	 email: { type: "string",validation: { required: true}}
					                                     }
					                                 }
										        },
										         pageSize: 10
										    },
										    pageable: true,
					                        sortable: true,
					                        filterable: true,
										    resizable:true,
//										    toolbar: [
//										        { name: "create", onclick:toolbar_click()},
//										        { name: "save" },
//										        { name: "cancel" }
//										      ],
// 										    toolbar: kendo.template($("#template").html()),
						                       toolbar: ["create"],
										    columns: [
										    	 { field:"username", title: "User Name", width: "140px",template:"<a href='javascript:showDetail(#=id#)' id='name-link'>#=username#</a>" },
										    	 //{ field: "id", title:"ID", width: "80px" },
					                             { field: "password", title:"Password", width: "120px" },
											   { field: "role", title:"Role", width: "120px"},
					                            // { field: "role", title:"Role", width: "120px" ,editor: categoryDropDownEditor, template: "#=role.text#"},
					                             { field: "fullName", title:"Full Name", width: "120px" },
					                             { field: "mobileNumber", title:"Mobile Number", width: "120px" },
					                             { field: "email", title:"Email", width: "120px",customBoolEditor },
					                             { command: ["edit", "destroy"], title: "&nbsp;", width: "200px" }
					                             ],
					                   editable: "popup"
									});
									function customBoolEditor(container, options) {
										 var guid = kendo.guid();
					                     $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
					                     $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
					                 }
									function showDetail(e) {
					                     localStorage.removeItem('currentValue');
					                     console.log(e);
					                     localStorage.setItem('currentValue',e);
					                     window.location.href='empInfo/'+ e;
					                 }


									 
									 function onSelect(e) {
							                if ("kendoConsole" in window) {
							                    if (e.dataItem) {
							                        var dataItem = e.dataItem;
							                        kendoConsole.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")");
							                    } else {
							                        kendoConsole.log("event :: select");
							                    }
							                }
							            };
									function categoryDropDownEditor(container, options) {
					                    $('<input required name="' + options.field + '"/>')
					                        .appendTo(container)
					                        .kendoDropDownList({
					                            autoBind: false,
					                            dataTextField: "text",
					                            dataValueField: "value",
					                            dataSource:[
					                                { text: "ADMIN", value: "1" },
					                                { text: "NUMBER", value: "2" }
					                              ],
					                            select: onSelect	
					                            });
					                       
					                }
function updateGrid(options){
	$.ajax({
        url: "http://localhost:8080/updateSystemUser",
        dataType: "json",
        cache: false,
		type: "POST",
		 headers: {  
	            "accept": "application/json;odata=verbose", //It defines the Data format   
	            "content-type": "application/json;odata=verbose", //It defines the content type as JSON  
	               
	        }, 
		ContentType: "application/json",
        data:JSON.stringify({
            'id':  options.data.id,  
            'username':  options.data.username,  
            'password':  options.data.password,
            "role": options.data.role,
            'fullName':  options.data.fullName,  
            'mobileNumber':  options.data.mobileNumber,  
            'email':  options.data.email  
        }),
        success: function (result) {
        	var userList=result.systemUserInfo;
              options.success(userList);
            // window.location.replace("dashboard");
        	
        },
        error: function (result) {
        	options.error(result);
         }
       });
}

function readGrid(){
    $.ajax({
        url: "http://localhost:8080/getSystemUsersList",
        dataType: "json",
        cache: false,
        success: function (result) {
        	$(".k-window-title").empty();
			$(".k-window-title").append("New");
			var userList=result.systemUserInfo;
          options.success(userList);
          
        },
        error: function (result) {
        	var userList=result.systemUserInfo;
          options.error(userList);
         }
       });

}

function deleteRow(options){
	var tr = $(options.target).closest("tr"); // get the current table row (tr)
     var data = options.data;
 console.log("Details for: " + data.id);
 $.ajax({
    url: "http://localhost:8080/deleteSystemUser/"+data.id,
    dataType: "json",
    type: "DELETE",
    success: function (result) {
      options.success(result);
    },
    error: function (result) {
      options.error(result);
     }
   });
}
function createRow(options){
	$.ajax({
        url: "http://localhost:8080/saveSystemUser",
        cache: false,
        type: "POST",
        ContentType: "application/json",
        headers: {  
            "accept": "application/json;odata=verbose", //It defines the Data format   
            "content-type": "application/json;odata=verbose", //It defines the content type as JSON  
               
        }, 
        data:JSON.stringify({
                'username':  options.data.username,  
                'password':  options.data.password,
                "role": options.data.role,
                'fullName':  options.data.fullName,  
                'mobileNumber':  options.data.mobileNumber,  
                'email':  options.data.email  
            }),
            success: function (result) {
            	var userList=result.systemUserInfo;
                  options.success(userList);
            },
        error: function (result) {
         options.error(result);
         }
       });
    
}
function readData(options){
	$.ajax({
        url: "http://localhost:8080/getSystemUsersList",
        dataType: "json",
        cache: false,
        success: function (result) {
        	$(".k-window-title").empty();
			$(".k-window-title").append("New");
			var userList=result.systemUserInfo;
          options.success(userList);
          
        },
        error: function (result) {
        	var userList=result.systemUserInfo;
          options.error(userList);
         }
       });

}



$('#filter').on('input', function (e) {
    var grid = $('#grid').data('kendoGrid');
    var columns = grid.columns;

    var filter = { logic: 'or', filters: [] };
    columns.forEach(function (x) {
      if (x.field) {
        var type = grid.dataSource.options.schema.model.fields[x.field].type;
        if (type == 'string') {
          filter.filters.push({
            field: x.field,
            operator: 'contains',
            value: e.target.value
          })
        }
        else if (type == 'number') {
          if (isNumeric(e.target.value)) {
            filter.filters.push({
              field: x.field,
              operator: 'eq',
              value: e.target.value
            });
          }    

        } else if (type == 'date') {
          var data = grid.dataSource.data();
          for (var i=0;i<data.length ; i++){
            var dateStr = kendo.format(x.format, data[i][x.field]);
            // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
            if(dateStr.startsWith(e.target.value)){
              filter.filters.push({
                field: x.field,
                operator:'eq',
                value: data[i][x.field]
              })
            }
          }
        } else if (type == 'boolean' && getBoolean(e.target.value) !== null) {
          var bool = getBoolean(e.target.value);
          filter.filters.push({
            field: x.field,
            operator: 'eq',
            value: bool
          });
        }               
      }
    });
    grid.dataSource.filter(filter);
  });
