from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

def send_html_email(sender_email, app_password, recipient_email, subject, body):
    try:
        # Set up the SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  # Start TLS for security

        # Log in to your email account using the App Password
        server.login(sender_email, app_password)

        # Create a multipart email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject

        # Define HTML content with dynamic body
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }}
                .container {{
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }}
                h1 {{
                    color: #333;
                }}
                p {{
                    color: #555;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Hello!</h1>
                <p>{body}</p>  <!-- Dynamic body content here -->
                <div class="footer">This email was sent with ❤️ using Python.</div>
            </div>
        </body>
        </html>
        """

        # Attach the HTML content to the email
        msg.attach(MIMEText(html_content, 'html'))

        # Send the email
        server.sendmail(sender_email, recipient_email, msg.as_string())

        print('HTML mail sent successfully!')

    except Exception as e:
        print(f'Error: {e}')

    finally:
        # Terminate the SMTP session
        server.quit()

# Example usage
if __name__ == "__main__":
    sender_email = 'hariharans.cloud@gmail.com'  # Your email
    app_password = 'ofzc apjz zqmg yiwe'       # Your App Password
    recipient_email = 'dragondragous@gmail.com'  # Recipient's email
    subject = 'Hello World'                   # Email subject
    body = 'This is a test email sent using Python with an App Password!'  # Email body
    
    send_html_email(sender_email, app_password, recipient_email, subject, body)

