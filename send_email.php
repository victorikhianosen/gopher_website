<?php
use PHPMailer\PHPMailer\PHPMailer;

if(isset($_POST['name']) && isset($_POST['email'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    require_once "PHPMailer.php";
    require_once "SMTP.php";
    require_once "Exception.php";

    $mail = new PHPMailer();

    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.ipage.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'tech-support@archsolveltd.com';                     //SMTP username
    $mail->Password   = 'Support123';                               //SMTP password
    $mail->SMTPSecure = "ssl";          //Enable implicit TLS encryption
    $mail->Port       = 465;   

    $mail->isHTML(true);
    $mail->setFrom('tech-support@archsolve.com', 'Mailer');
    $mail->addAddress('tech-support@archsolve.com', 'Novaji Monitoring Solution');     //Add a recipient
    $mail->subject = ("$email ($subject)");
    $mail->message = $message;

    if($mail->send()){
        $status = "success";
        $response = "Email sent successfully!";
    }
    else
    {
        $status = "failed";
        $response = "something is wrong. try again later" . $mail->ErrorInfo;
    }
    exit(json_encode(array("status" => $status, "response" => $response)));
}