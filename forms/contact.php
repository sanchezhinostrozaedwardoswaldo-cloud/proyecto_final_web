<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php'; // Ajusta la ruta si es necesario

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $subject = htmlspecialchars($_POST['subject'] ?? 'Sin asunto');
    $message = htmlspecialchars($_POST['message'] ?? '');

    $mail = new PHPMailer(true);

    try {
        // 🔹 Configuración del servidor SMTP de Outlook / Senati
        $mail->isSMTP();
        $mail->Host = 'smtp.office365.com';
        $mail->SMTPAuth = true;
        $mail->Username = '1641845@senati.pe'; // Tu correo Senati
        $mail->Password = ''; // ⚠️ Contraseña o App password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // 🔹 Remitente y destinatario
        $mail->setFrom('1641845@senati.pe', 'Formulario Web');
        $mail->addAddress('1641845@senati.pe', 'Edward Hinostroza'); // Dónde recibes los mensajes
        $mail->addReplyTo($email, $name);

        // 🔹 Contenido del mensaje
        $mail->isHTML(true);
        $mail->Subject = "📩 Nuevo mensaje: $subject";
        $mail->Body = "
            <h2>Nuevo mensaje de contacto recibido</h2>
            <p><strong>Nombre:</strong> {$name}</p>
            <p><strong>Correo:</strong> {$email}</p>
            <p><strong>Asunto:</strong> {$subject}</p>
            <p><strong>Mensaje:</strong><br>{$message}</p>
        ";
        $mail->AltBody = "Nuevo mensaje de contacto\n\nNombre: $name\nCorreo: $email\nAsunto: $subject\nMensaje:\n$message";

        // 🔹 Enviar el mensaje
        $mail->send();

        // ✅ Devolver exactamente "OK" para que el JS muestre el mensaje correcto
        echo "OK";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Error: " . $mail->ErrorInfo;
    }
} else {
    // Si se accede directamente al archivo
    http_response_code(405);
    echo "Error: Método no permitido";
}
