$(function(){
	
	var methods = {
		studentList : [
		],
		edit_id : false,
		fields : ['fisrt_name', 'last_name', 'f_name', 'm_name', 'dob', 'address'],
		field_label : {'fisrt_name':"First Name", 'last_name': "Last Name", 'f_name' : "County", 'm_name' : "Acre", 'dob' : "Job Description", 'address': "Payment"},
		init : function(){
			var listHtml = methods.helpers.refreshList();
			$('.list').html(listHtml);
			$('.template').hide();
			$('.list_view').show();
		},
		helpers : {
			refreshList : function(){
				var list = methods.studentList;
				var listHtml = "";
				$.each(list, function(i, v){
					listHtml += `
						<tr>
							<td> ${i + 1} </td><td>${v.fisrt_name}</td><td>${v.dob}</td><td><span class="show action" data-id="${i}">View</span> <span class="edit action" data-id="${i}">.</span> <span class="delete action" data-id="${i}">.</span></td>
						</tr>
					`;
				});
				return listHtml;
			}
		},
		assignFieldValues : function(fields, fieldVal, form){
			var formData = document.forms[form];
			$.each(fields, function(i, v){
				fieldVal[v] = formData.elements[v].value; 
			});
			return fieldVal;
		},
		submitHandler : function(e){
			e.preventDefault();
			var fields = methods.fields;
			var singleStudent = methods.assignFieldValues(fields, {}, 'entry_form');
			methods.studentList.push(singleStudent);
			this.reset();
			$('.flasMsg').html('Added Successfully').fadeIn(function(){
				$('.flasMsg').fadeOut(2000);
			});
		},
		updateHandler : function(e){
			e.preventDefault();
			var id = methods.edit_id;
			var fields = methods.fields;
			var singleStudent = methods.assignFieldValues(fields, {}, 'edit_form');
			methods.studentList[id] = singleStudent;
			$('.flasMsg').html('Updated Successfully').fadeIn(function(){
				$('.flasMsg').fadeOut(2000);
				methods.goTo('list_view');
			});

		},
		navigations : function(e){
			e.preventDefault();
			var classes = $(this).attr('class');
			var tem = classes.split(' ')[0].split('-')[1];
			var listHtml = methods.helpers.refreshList();
			$('.list').html(listHtml);
			methods.goTo(tem);
		},
		goTo : function(go){
			var listHtml = methods.helpers.refreshList();
			$('.list').html(listHtml);
			var a = $('.template:not(.'+go+')').fadeOut('fast',function(){
				$('.'+go).fadeIn();
			});
		},
		actions : {
			edit : function(e){
				e.preventDefault();
				var id = parseInt($(this).data('id'));
				methods.edit_id = id;
				var student = methods.studentList[id];
				var fields = methods.fields;
				var edit_form = document.forms.edit_form;
				$.each(fields, function(i, v){
					edit_form.elements[v].value = student[v]; 
				}); 
				methods.goTo('edit_form');
			},
			show : function(e){
				e.preventDefault();
				var id = parseInt($(this).data('id'));
				methods.edit_id = id;
				var student = methods.studentList[id];
				var fields = methods.fields;
				var field_label = methods.field_label;
				var view_html = "";
				$.each(fields, function(i, v){
					view_html += `
						<tr>
							<td>${field_label[v]}</td><td>: ${student[v]}</td>
						</tr>
					`;
				});
				$('.show_single').html(view_html);
				var btm_action = `<span class="edit action" data-id="${id}">.</span> <span class="delete action" data-id="${id}">.</span>`;
				$('.btm_action').html(btm_action);
				methods.goTo('show_view');
			},
			remove : function(e){
				e.preventDefault();
				var id = parseInt($(this).data('id'));
				var cn = confirm('Are you sure');
				if(cn){
					methods.studentList.splice(id, 1);
				}
				var listHtml = methods.helpers.refreshList();
				$('.list').html(listHtml);
				methods.goTo('list_view');
			} 
		}
	};
	
	//init
	methods.init();
	
	//Listeners
	$('#entry_form').on('submit', methods.submitHandler);
	$("[class^='goTo']").on('click', methods.navigations);
	$('.list, .btm_action').on('click', '.edit', methods.actions.edit);
	$('.list, .btm_action').on('click', '.show', methods.actions.show);
	$('.list, .btm_action').on('click', '.delete', methods.actions.remove);
	$('#edit_form').on('submit', methods.updateHandler);
	
	
});