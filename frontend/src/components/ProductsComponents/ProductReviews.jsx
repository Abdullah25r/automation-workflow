import React, { useState } from "react";

function ProductReviews({ productId }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Alice",
      text: "Absolutely love these airpods! Great sound and battery life.",
    },
    {
      id: 2,
      user: "Bob",
      text: "Comfortable fit, but the bass could be a bit stronger for my taste.",
    },
    {
      id: 3,
      user: "Charlie",
      text: "Worth every penny. The noise cancellation is impressive.",
    },
  ]);

  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentUser, setNewCommentUser] = useState("Anonymous");

  const handleAddComment = (e) => {
    e.preventDefault();

    if (newCommentText.trim() === "") {
      alert("Please enter a comment before submitting.");
      return;
    }

    const newComment = {
      id: comments.length + 1,
      user: newCommentUser.trim() || "Anonymous",
      text: newCommentText.trim(),
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, newComment]);
    setNewCommentText("");
  };

  return (
    <div className="comments-section text-white p-6 rounded-lg shadow-inner mt-8">
      <h3 className="text-2xl font-bold mb-6 text-white">
        Customer Reviews ({comments.length})
      </h3>
      <div className="comment-list mb-8 max-h-96 overflow-y-auto pr-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="comment-item bg-[#1a1a1a] text-white p-4 rounded-md shadow-sm mb-4 border border-gray-700"
            >
              <p className="font-semibold text-white">{comment.user}</p>
              <p className="text-gray-300 mt-1">{comment.text}</p>
              {comment.timestamp && (
                <p className="text-xs text-gray-400 mt-2">
                  Posted on: {comment.timestamp}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">
            Be the first to leave a review!
          </p>
        )}
      </div>

      <div className="add-comment-form border-t pt-6 mt-6 border-gray-700">
        <h4 className="text-xl font-semibold mb-4 text-white">
          Leave a Review
        </h4>
        <form onSubmit={handleAddComment} className="space-y-4">
          <div>
            <label
              htmlFor="commentUser"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="commentUser"
              className="w-full p-3 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
              value={newCommentUser}
              onChange={(e) => setNewCommentUser(e.target.value)}
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="commentText"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your Comment
            </label>
            <textarea
              id="commentText"
              className="w-full p-3 border border-gray-600 rounded-md resize-y min-h-[80px] focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
              rows="4"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Share your thoughts about this product..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full  text-white py-3 px-4 border border-[#64748b] rounded-md hover:bg-[#ffffff] hover:text-black transition duration-300 ease-in-out font-semibold"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductReviews;
