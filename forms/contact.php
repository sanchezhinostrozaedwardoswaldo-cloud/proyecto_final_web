<?php
/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);*/

// Primero se carga el autoload de Composer
require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use SendGrid\Mail\Mail;

// Forzar la carga del archivo .env
$dotenv = Dotenv::createUnsafeImmutable(__DIR__);
$dotenv->load();

// Verificar que se haya leído
//var_dump($_ENV);
//exit;

// --- A partir de aquí sigue el código normal ---
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $subject = htmlspecialchars($_POST['subject'] ?? 'Sin asunto');
    $message = htmlspecialchars($_POST['message'] ?? '');

    $apiKey = $_ENV['SENDGRID_API_KEY'];

    $emailObj = new Mail();
    $emailObj->setFrom($_ENV['EMAIL_FROM'], "Formulario Web SENATI");
    $emailObj->setReplyTo($email, $name ?: "Usuario del formulario");
    $emailObj->setSubject("📩 Nuevo mensaje de contacto: {$subject}");
    $emailObj->addTo($_ENV['EMAIL_TO'], "Edward Hinostroza");

    $emailBody = "
        <div style='font-family: Arial, sans-serif; color: #333;'>
            <h2 style='color:#007bff;'>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> {$name}</p>
            <p><strong>Correo:</strong> {$email}</p>
            <p><strong>Asunto:</strong> {$subject}</p>
            <p><strong>Mensaje:</strong><br>{$message}</p>
            <hr>
            <p style='font-size: 12px; color: #777;'>Este mensaje fue enviado desde tu sitio web FlexBiz.</p>
        </div>
    ";

    $emailObj->addContent("text/html", $emailBody);
    $emailObj->addContent("text/plain", "Nuevo mensaje de {$name} ({$email})\nAsunto: {$subject}\n\n{$message}");

    $sendgrid = new \SendGrid($apiKey);

    try {
        $response = $sendgrid->send($emailObj);
        if ($response->statusCode() >= 200 && $response->statusCode() < 300) {
            echo "OK";
        } else {
            echo "Error al enviar. Código: " . $response->statusCode() . " → " . $response->body();
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Error: método no permitido";
}
