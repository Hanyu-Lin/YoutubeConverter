from flask import Flask, request, send_file,jsonify, make_response, Response
from pytube import YouTube
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/download_video', methods=['POST'])
def handleDownload():
  try:
    #Get the video URL from the request body
    video_url = request.get_json()['video_url']
    # Use the pytube library to download the video
    video = YouTube(video_url)
    download_path = video.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').first().download()
    filename = download_path.split("//")[-1]
    return send_file(download_path, as_attachment=True,download_name=filename,mimetype="video/mp4")
    
  except Exception as e:
    # Return a generic error status for all other exceptions
    return jsonify({'status': 'error', 'message': 'An unexpected error occurred', 'url': video_url}), 500

if __name__ == '__main__':
    app.run(debug=True)





