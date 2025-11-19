import json
from datetime import datetime

def lambda_handler(event, context):
    body = f"""
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Serverless test</title>
      </head>
      <body>
        <h1>Hej från AWS Lambda (Python)! ⚡</h1>
        <p>Path: {event.get('rawPath', '/')}</p>
        <p>Time (UTC): {datetime.utcnow().isoformat()}Z</p>
      </body>
    </html>
    """

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "text/html; charset=utf-8"
        },
        "body": body
    }
