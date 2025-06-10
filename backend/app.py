# backend/app.py
from flask import Flask, request, Response, stream_with_context
from flask_cors import CORS
import time
import os
import io
import random

app = Flask(__name__)
# Enable CORS for all origins, allowing your frontend to make requests
CORS(app)

# Define chunk size for streaming downloads to avoid loading entire file into memory
CHUNK_SIZE = 1024 * 1024 * 5  # 5 MB chunks

@app.route('/')
def index():
    """Simple health check endpoint."""
    return "Speed Test Backend is running!"

@app.route('/ping')
def ping_test():
    """
    A simple endpoint to measure ping latency.
    It just returns a small response.
    """
    return "pong", 200

@app.route('/download')
def download_test():
    """
    Simulates a download by streaming random data.
    The client will request a certain amount of bytes.
    """
    try:
        # Get requested bytes from query parameter
        requested_bytes = int(request.args.get('bytes', 100 * 1024 * 1024)) # Default 100MB
        if requested_bytes <= 0:
            return "Invalid byte count", 400

        def generate_large_data():
            """Generates random data in chunks."""
            bytes_sent = 0
            while bytes_sent < requested_bytes:
                # Determine how much to send in this chunk
                remaining_bytes = requested_bytes - bytes_sent
                current_chunk_size = min(CHUNK_SIZE, remaining_bytes)

                # Generate random bytes for the chunk
                # Using os.urandom is cryptographically secure but might be slower for very large data.
                # For pure speed test, random.SystemRandom().randbytes is also good.
                # For simplicity and speed, a fixed pattern or less secure random can also be used if security is not the concern for the data itself.
                # Here, we'll just create a byte stream to simulate data.
                yield b'\0' * current_chunk_size # Sending null bytes to conserve memory and speed

                bytes_sent += current_chunk_size

        response = Response(stream_with_context(generate_large_data()), mimetype='application/octet-stream')
        # Add Content-Length header for accurate client-side measurement
        response.headers['Content-Length'] = requested_bytes
        return response
    except ValueError:
        return "Invalid bytes parameter", 400
    except Exception as e:
        app.logger.error(f"Download error: {e}")
        return "Internal server error during download", 500

@app.route('/upload', methods=['POST'])
def upload_test():
    """
    Receives uploaded data and responds.
    The client will send a Blob of data.
    """
    try:
        # Read the entire incoming stream.
        # This is crucial for the server to actually receive the data.
        # For very large uploads, consider processing in chunks or saving to disk.
        # For a speed test, just reading it into memory and discarding is fine.
        data_size = request.content_length # Get the size of the uploaded content

        # Read the stream to actually consume the data being sent by the client
        # This loop ensures the entire request body is processed.
        # Without consuming the body, the client might not get a proper response.
        buffer = bytearray(1024 * 1024) # Read in 1MB chunks
        total_read = 0
        with request.stream:
            while True:
                chunk = request.stream.read(len(buffer))
                if not chunk:
                    break
                total_read += len(chunk)

        app.logger.info(f"Received {total_read} bytes for upload test.")

        # Optionally, you can log the size or process the data.
        # For a speed test, just confirming receipt is enough.
        return f"Upload successful. Received {total_read} bytes.", 200
    except Exception as e:
        app.logger.error(f"Upload error: {e}")
        return "Internal server error during upload", 500

if __name__ == '__main__':
    # Use Gunicorn or Waitress for production deployment.
    # For local development, this runs Flask's built-in server.
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))
