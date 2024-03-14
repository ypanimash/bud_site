<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setForm('info@bud.ua', 'Лого');
//Кому отправить 
$mail->addAddress('ypanimash@gmail.com');
//Тема письма
$mail->Subject = 'Заказ!';

if(trim(!empty($_POST['name']))){
	$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['phone']))){
	$body.='<p><strong>Номер телефона:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['message']))){
	$body.='<p><strong>Описание услуги:</strong> '.$_POST['message'].'</p>';
}

if (!empty($_FILES['image']['tmp_name'])) {
	$filePath = _DIR_ . "/files/" . $_FILES['image']['name'];
	if (copy($_FILES['image']['tmp_name'], $filePath)) {
		$fileAttach = $filePath;
		$body.='<p><strong>Вложение</strong>';
		$mail->addAttachment($fileAttach);
	}
}

$mail->Body = $body;

if (!$mail->send()) {
	$message = 'Ошибка'
}else {
	
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);


?>