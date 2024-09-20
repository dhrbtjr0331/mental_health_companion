from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
analyzer = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    # Retrieves the JSON data from the incoming POST request (from Node.js)
    data = request.get_json()
    # Extract message out of data
    message = data.get("message", "")

    # Perform sentiment analysis on the message
    sentiment_scores = analyzer.polarity_scores(message)

    return jsonify(sentiment_scores)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

