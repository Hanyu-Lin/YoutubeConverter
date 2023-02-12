from flask import Flask, request,jsonify
from pytube import YouTube
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/download_video', methods=['POST'])
def handleDownload():
  try:
    # Get the video URL from the request body
    video_url = request.get_json()['video_url']
    # Use the pytube library to download the video
    video = YouTube(video_url)
    download_path = video.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()
    filename = download_path.split("//")[-1]
    # Return a success status to the front-end
    return jsonify({'status': 'success','download_path': download_path,'file':filename})

  except Exception as e:
    # Return a generic error status for all other exceptions
    return jsonify({'status': 'error', 'message': 'An unexpected error occurred', 'url': video_url}), 500

if __name__ == '__main__':
    app.run(debug=True)





