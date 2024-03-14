"use strict"
	
 document.addEventListener('DOMContentLoaded', function () {
	 const form = document.getElementById('form');
	 form.addEventListener('submit', formSend);
	 
	 async function formSend(e) {
		 e.preventDefault();
		 
		 let error = formValidate(form); 
	 
		 let formData = new FormData(form);
		 
		 if (error === 0) {
			 form.classList.add('_sending');
			 
			 let response = await fetch('sendmail.php', {
				 method: 'POST',
				 body: formData
				 
			 });
			 if (response.ok){
				 let result = await response.json();
				 alert(result.message);
				 formPreview.innerHTML = '';
				 form.reset();
				 form.classList.remove('_sending');
			 }else{
				 alert("Ошибка");
				 form.classList.remove('_sending');
			 }
		 }else{
			 
		 }
		 
	 }
	 
	 function formValidate(form) {
		 let error = 0;
		 let formReq = document.querySelectorAll('._req');
		 
		 for (let index = 0; index < formReq.length; index++) {
			 const input = formReq[index];
			 formRemoveError(input);
			 
			 if(input.classList.contains('_email')) {
				 if (emailTest(input)) {
					 formAddError(input);
					 error++;
				 }
			 }else if (input.classList.contains('_phone')) {
				 if (phoneTest(input)) {
					 formAddError(input);
					 error++;
				 }
			 }else {
				 if (input.value === '') {
					 formAddError(input);
					 error++;
				 }
			 }
		 }
		 return error;
	 }
     
	 
	 function formAddError(input) {
		 input.parentElement.classList.add('_error');
		 input.classList.add('_error');
	 }
	 function formRemoveError(input) {
		 input.parentElement.classList.remove('_error');
		 input.classList.remove('_error');
	 }
	 
	 // Regular expression 
	 function emailTest(input) {
		 return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	 }
	 function phoneTest(input) {
		 return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
	 }
	 
	 // Add FileUpload
	 const formImage = document.getElementById('formImage');
	 const formPreview = document.getElementById('formPreview');
	 
	 formImage.addEventListener('change', ()=> {
		 uploadFile(formImage.files[0]);
	 });
	 
	 function uploadFile(file) {
		 if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
			 alert('Можно добавлять только изображения');
			 formImage.value = '';
			 return;
		 }
		 if (file.size > 2 * 1024 *1024) {
			 alert('Максимальный размер файла 2МБ');
			 return;
		 }
		 
	 }
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
 });
